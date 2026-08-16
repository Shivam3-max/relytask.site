/**
 * Creates or updates the admin login stored in the AdminUser table. Safe to
 * re-run: an existing email just gets its password updated.
 *
 *   npm run seed:admin -- --email you@example.com --password "a strong password"
 *
 * (or set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD instead of flags — handy on
 * hosts where you can't pass extra args to an npm script.)
 */
import "dotenv/config";
import mysql from "mysql2/promise";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";

function pool() {
  const url = process.env.DATABASE_URL;
  if (url) return mysql.createPool({ uri: url, connectionLimit: 1 });
  return mysql.createPool({
    host: process.env.DATABASE_HOST ?? "127.0.0.1",
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user: process.env.DATABASE_USER ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "relytask_site",
    connectionLimit: 1,
  });
}

/** Mirrors src/lib/password.ts — kept in plain JS since this script runs outside Next/TS. */
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i === -1 ? undefined : process.argv[i + 1];
}

async function main() {
  const email = (arg("email") ?? process.env.SEED_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = arg("password") ?? process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error(
      'Usage: npm run seed:admin -- --email you@example.com --password "a strong password"\n' +
        "(or set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD)",
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const db = pool();
  await db.query(`
    CREATE TABLE IF NOT EXISTS AdminUser (
      id VARCHAR(191) PRIMARY KEY,
      email VARCHAR(320) NOT NULL UNIQUE,
      passwordHash VARCHAR(191) NOT NULL,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const passwordHash = hashPassword(password);
  const [existing] = await db.query("SELECT id FROM AdminUser WHERE email = ?", [email]);
  if (existing.length) {
    await db.query("UPDATE AdminUser SET passwordHash = ? WHERE email = ?", [passwordHash, email]);
    console.log(`Updated password for ${email}.`);
  } else {
    await db.query("INSERT INTO AdminUser (id, email, passwordHash) VALUES (?, ?, ?)", [
      randomUUID(),
      email,
      passwordHash,
    ]);
    console.log(`Created admin account for ${email}.`);
  }
  await db.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
