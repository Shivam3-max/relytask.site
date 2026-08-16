/**
 * Copies the case studies and testimonials written into the codebase into the
 * database, so they can be edited from the admin panel. Safe to re-run: it
 * skips anything already present by slug.
 *
 *   npm run seed
 */
import "dotenv/config";
import mysql from "mysql2/promise";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));

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

/** The lib files are TypeScript, so pull the data out with a tiny eval shim. */
function loadModule(relPath, exportName) {
  const src = readFileSync(path.join(here, "..", relPath), "utf8");
  const start = src.indexOf(`export const ${exportName}`);
  if (start === -1) throw new Error(`${exportName} not found in ${relPath}`);

  const afterEq = src.indexOf("=", start) + 1;
  // Walk brackets to find the end of the literal.
  let depth = 0;
  let i = afterEq;
  let started = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (ch === "[" || ch === "{") {
      depth++;
      started = true;
    } else if (ch === "]" || ch === "}") {
      depth--;
      if (started && depth === 0) {
        i++;
        break;
      }
    }
  }
  const literal = src.slice(afterEq, i);
  return (0, eval)(`(${literal})`);
}

/** Mirrors the CREATE TABLE statements in src/lib/db.ts, so seeding works even before the app has run once. */
async function ensureSchema(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS CaseStudy (
      id VARCHAR(191) PRIMARY KEY, slug VARCHAR(191) NOT NULL UNIQUE, client VARCHAR(191) NOT NULL,
      title VARCHAR(255) NOT NULL, category VARCHAR(60) NOT NULL, industry VARCHAR(191) NOT NULL,
      year VARCHAR(10) NOT NULL, timeline VARCHAR(80) NOT NULL, liveUrl VARCHAR(400),
      summary VARCHAR(800) NOT NULL, challenge MEDIUMTEXT NOT NULL, services MEDIUMTEXT NOT NULL,
      stack MEDIUMTEXT, approach MEDIUMTEXT NOT NULL, metrics MEDIUMTEXT NOT NULL,
      quoteText VARCHAR(1000), quoteName VARCHAR(191), quoteRole VARCHAR(191),
      seed INT NOT NULL DEFAULT 1, confidential TINYINT(1) NOT NULL DEFAULT 0,
      featured TINYINT(1) NOT NULL DEFAULT 0, published TINYINT(1) NOT NULL DEFAULT 1,
      \`order\` INT NOT NULL DEFAULT 0,
      createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await db.query(`
    CREATE TABLE IF NOT EXISTS Testimonial (
      id VARCHAR(191) PRIMARY KEY, quote MEDIUMTEXT NOT NULL, name VARCHAR(191) NOT NULL,
      role VARCHAR(191) NOT NULL, company VARCHAR(191), mediaUrl VARCHAR(500), mediaType VARCHAR(20),
      posterUrl VARCHAR(500), aspect VARCHAR(12) NOT NULL DEFAULT '16/9',
      published TINYINT(1) NOT NULL DEFAULT 1, featured TINYINT(1) NOT NULL DEFAULT 0,
      \`order\` INT NOT NULL DEFAULT 0, createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function main() {
  const db = pool();
  await ensureSchema(db);
  const cases = loadModule("src/lib/case-studies.ts", "CASE_STUDIES");
  const quotes = loadModule("src/lib/content.ts", "FALLBACK_TESTIMONIALS");

  let added = 0;
  for (const [index, c] of cases.entries()) {
    const [existing] = await db.query("SELECT id FROM CaseStudy WHERE slug = ?", [c.slug]);
    if (existing.length) continue;
    await db.query(
      `INSERT INTO CaseStudy
        (id, slug, client, title, category, industry, year, timeline, liveUrl, summary, challenge, services, stack, approach, metrics, quoteText, quoteName, quoteRole, seed, confidential, featured, published, \`order\`)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        randomUUID(), c.slug, c.client, c.title, c.category, c.industry, c.year, c.timeline,
        c.liveUrl ?? null, c.summary, c.challenge, JSON.stringify(c.services ?? []),
        JSON.stringify(c.stack ?? []), JSON.stringify(c.approach ?? []), JSON.stringify(c.metrics ?? []),
        c.testimonial?.quote ?? null, c.testimonial?.name ?? null, c.testimonial?.role ?? null,
        c.seed ?? 1, c.confidential ? 1 : 0, c.featured ? 1 : 0, 1, index,
      ],
    );
    added++;
  }

  let quotesAdded = 0;
  const [[{ n: existingQuotes }]] = await db.query("SELECT COUNT(*) AS n FROM Testimonial");
  if (Number(existingQuotes) === 0) {
    for (const [index, q] of quotes.entries()) {
      await db.query(
        "INSERT INTO Testimonial (id, quote, name, role, `order`, published) VALUES (?,?,?,?,?,1)",
        [randomUUID(), q.quote, q.name, q.role, index],
      );
      quotesAdded++;
    }
  }

  const [[{ n: caseTotal }]] = await db.query("SELECT COUNT(*) AS n FROM CaseStudy");
  const [[{ n: quoteTotal }]] = await db.query("SELECT COUNT(*) AS n FROM Testimonial");

  console.log(
    `Seeded ${added} case stud${added === 1 ? "y" : "ies"} and ${quotesAdded} testimonial${
      quotesAdded === 1 ? "" : "s"
    }.`,
  );
  console.log(`Now holding ${caseTotal} case studies, ${quoteTotal} testimonials.`);
  await db.end();
}

if (!process.env.DATABASE_URL && !process.env.DATABASE_HOST) {
  console.log("No DATABASE_* env vars set — connecting to 127.0.0.1:3306 as root (local default).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
