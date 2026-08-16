/**
 * Entry point for Hostinger's Node.js App Manager (and similar Passenger-style
 * hosts), which expects a startup file that listens on the port it assigns
 * via process.env.PORT — `next start` alone doesn't read that.
 *
 * Requires `next build` to have already run (see DEPLOY.md).
 */
const { createServer } = require("http");
const next = require("next");
const mysql = require("mysql2/promise");
const { randomUUID, randomBytes, scryptSync } = require("node:crypto");

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

/**
 * If SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD are set, keep that admin account
 * in sync with them on every boot. This is what makes admin login work on
 * hosts with no shell access (e.g. Hostinger without SSH): set the two env
 * vars once and restart — no need to reach /admin/setup or run a script.
 * Mirrors scripts/seed-admin.mjs; duplicated (not imported) because that
 * script is ESM and this file is CommonJS.
 */
async function seedAdminFromEnv() {
  const email = (process.env.SEED_ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) return;

  const db = process.env.DATABASE_URL
    ? mysql.createPool({ uri: process.env.DATABASE_URL, connectionLimit: 1, connectTimeout: 10_000 })
    : mysql.createPool({
        host: process.env.DATABASE_HOST || "127.0.0.1",
        port: Number(process.env.DATABASE_PORT || 3306),
        user: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD || "",
        database: process.env.DATABASE_NAME || "relytask_site",
        connectionLimit: 1,
        connectTimeout: 10_000,
      });

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS AdminUser (
        id VARCHAR(191) PRIMARY KEY,
        email VARCHAR(320) NOT NULL UNIQUE,
        passwordHash VARCHAR(191) NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    const salt = randomBytes(16).toString("hex");
    const passwordHash = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
    const [existing] = await db.query("SELECT id FROM AdminUser WHERE email = ?", [email]);
    if (existing.length) {
      await db.query("UPDATE AdminUser SET passwordHash = ? WHERE email = ?", [passwordHash, email]);
    } else {
      await db.query("INSERT INTO AdminUser (id, email, passwordHash) VALUES (?, ?, ?)", [
        randomUUID(),
        email,
        passwordHash,
      ]);
    }
    console.log(`[seed-admin] Admin account for ${email} is in sync with SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD.`);
  } catch (err) {
    console.error("[seed-admin] Failed to seed admin from env:", err.message);
  } finally {
    try {
      await db.end();
    } catch {
      // Pool may already be broken (the failure we just logged) — nothing more to do.
    }
  }
}

app
  .prepare()
  .then(() => seedAdminFromEnv())
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`Ready on port ${port}`);
    });
  });
