import "server-only";
import mysql, { Pool } from "mysql2/promise";
import { randomUUID } from "node:crypto";

/**
 * Data layer backed by MySQL via `mysql2` — no ORM, no query-engine binary.
 * Prisma's driver-adapter binaries didn't run reliably on Hostinger's shared
 * hosting, so this talks to MySQL directly with parameterised queries and
 * hand-written SQL, the same pattern already proven there in other projects.
 *
 * Local dev: connects to 127.0.0.1:3306 as root with no password by default,
 * matching Laragon/XAMPP out of the box. Production: point DATABASE_URL, or
 * the discrete DATABASE_HOST/PORT/USER/PASSWORD/NAME vars, at the host's
 * MySQL — see .env.example and README.md.
 */

declare global {
  var __relytaskPool: Pool | undefined;
  var __relytaskDbReady: Promise<void> | undefined;
}

type SqlArg = string | number | boolean | null | Date;

interface QueryResult<T> {
  rows: T[];
}

// Shared hosting plans typically cap total concurrent MySQL connections
// (often 20-30) and every warm serverless instance opens its own pool, so
// this defaults small. Override with DATABASE_POOL_MAX if needed.
const CONNECTION_LIMIT = Number(process.env.DATABASE_POOL_MAX ?? 5);

// Some hosts require or prefer SSL for remote connections, often with a
// self-signed certificate. DATABASE_SSL=true enables it;
// DATABASE_SSL_REJECT_UNAUTHORIZED=false accepts a self-signed cert instead
// of demanding a CA-signed one.
function sslConfig(): mysql.PoolOptions["ssl"] {
  if (process.env.DATABASE_SSL !== "true") return undefined;
  return {
    rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
  };
}

function makePool(): Pool {
  const shared = {
    waitForConnections: true,
    connectionLimit: CONNECTION_LIMIT,
    connectTimeout: 10_000,
    ssl: sslConfig(),
  } as const;

  const url = process.env.DATABASE_URL;
  if (url) return mysql.createPool({ uri: url, ...shared });

  return mysql.createPool({
    host: process.env.DATABASE_HOST ?? "127.0.0.1",
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user: process.env.DATABASE_USER ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "relytask_site",
    ...shared,
  });
}

function pool(): Pool {
  if (!globalThis.__relytaskPool) globalThis.__relytaskPool = makePool();
  return globalThis.__relytaskPool;
}

async function execute<T>(sql: string, args: SqlArg[] = []): Promise<QueryResult<T>> {
  const [rows] = await pool().query(sql, args);
  return { rows: rows as T[] };
}

/* ---------- schema (idempotent, runs once per warm instance) ---------- */

async function doInit(): Promise<void> {
  const conn = await pool().getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS LeadEntry (
        id VARCHAR(191) PRIMARY KEY,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        name VARCHAR(191), email VARCHAR(320), phone VARCHAR(40), company VARCHAR(191), message TEXT,
        source VARCHAR(60) NOT NULL, service VARCHAR(191), budget VARCHAR(60), timeline VARCHAR(60),
        payload MEDIUMTEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        score INT NOT NULL DEFAULT 0,
        notes TEXT,
        INDEX idx_lead_createdAt (createdAt),
        INDEX idx_lead_status (status),
        INDEX idx_lead_source (source)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS CaseStudy (
        id VARCHAR(191) PRIMARY KEY,
        slug VARCHAR(191) NOT NULL UNIQUE,
        client VARCHAR(191) NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(60) NOT NULL,
        industry VARCHAR(191) NOT NULL,
        year VARCHAR(10) NOT NULL,
        timeline VARCHAR(80) NOT NULL,
        liveUrl VARCHAR(400),
        summary VARCHAR(800) NOT NULL,
        challenge MEDIUMTEXT NOT NULL,
        services MEDIUMTEXT NOT NULL,
        stack MEDIUMTEXT,
        approach MEDIUMTEXT NOT NULL,
        metrics MEDIUMTEXT NOT NULL,
        quoteText VARCHAR(1000),
        quoteName VARCHAR(191),
        quoteRole VARCHAR(191),
        seed INT NOT NULL DEFAULT 1,
        confidential TINYINT(1) NOT NULL DEFAULT 0,
        featured TINYINT(1) NOT NULL DEFAULT 0,
        published TINYINT(1) NOT NULL DEFAULT 1,
        \`order\` INT NOT NULL DEFAULT 0,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Testimonial (
        id VARCHAR(191) PRIMARY KEY,
        quote MEDIUMTEXT NOT NULL,
        name VARCHAR(191) NOT NULL,
        role VARCHAR(191) NOT NULL,
        company VARCHAR(191),
        mediaUrl VARCHAR(500),
        mediaType VARCHAR(20),
        posterUrl VARCHAR(500),
        aspect VARCHAR(12) NOT NULL DEFAULT '16/9',
        published TINYINT(1) NOT NULL DEFAULT 1,
        featured TINYINT(1) NOT NULL DEFAULT 0,
        \`order\` INT NOT NULL DEFAULT 0,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Setting (
        \`key\` VARCHAR(191) PRIMARY KEY,
        value MEDIUMTEXT NOT NULL,
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS AdminUser (
        id VARCHAR(191) PRIMARY KEY,
        email VARCHAR(320) NOT NULL UNIQUE,
        passwordHash VARCHAR(191) NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  } finally {
    conn.release();
  }
}

async function ready(): Promise<void> {
  if (!globalThis.__relytaskDbReady) globalThis.__relytaskDbReady = doInit();
  await globalThis.__relytaskDbReady;
}

/* ---------- leads ---------- */

export interface LeadInput {
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  payload: string | null;
  score: number;
}

export interface LeadRow {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  payload: string | null;
  status: string;
  score: number;
  notes: string | null;
}

export async function createLead(input: LeadInput): Promise<{ id: string }> {
  await ready();
  const id = randomUUID();
  await execute(
    `INSERT INTO LeadEntry (id, name, email, phone, company, message, source, service, budget, timeline, payload, score)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, input.name, input.email, input.phone, input.company, input.message,
      input.source, input.service, input.budget, input.timeline, input.payload, input.score,
    ],
  );
  return { id };
}

export async function listLeads(
  filter: { status?: string; source?: string; take?: number } = {},
): Promise<LeadRow[]> {
  await ready();
  const clauses: string[] = [];
  const args: SqlArg[] = [];
  if (filter.status) {
    clauses.push("status = ?");
    args.push(filter.status);
  }
  if (filter.source) {
    clauses.push("source = ?");
    args.push(filter.source);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const limit = filter.take && Number.isFinite(filter.take) ? `LIMIT ${Math.max(0, Math.floor(filter.take))}` : "";
  const res = await execute<LeadRow>(`SELECT * FROM LeadEntry ${where} ORDER BY createdAt DESC ${limit}`, args);
  return res.rows;
}

export async function countLeads(filter: { status?: string; since?: Date } = {}): Promise<number> {
  await ready();
  const clauses: string[] = [];
  const args: SqlArg[] = [];
  if (filter.status) {
    clauses.push("status = ?");
    args.push(filter.status);
  }
  if (filter.since) {
    clauses.push("createdAt >= ?");
    args.push(filter.since);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const res = await execute<{ n: number }>(`SELECT COUNT(*) AS n FROM LeadEntry ${where}`, args);
  return Number(res.rows[0].n);
}

export async function leadSourceCounts(): Promise<{ source: string; count: number }[]> {
  await ready();
  const res = await execute<{ source: string; count: number }>(
    "SELECT source, COUNT(*) AS count FROM LeadEntry GROUP BY source",
  );
  return res.rows.map((r) => ({ source: r.source, count: Number(r.count) }));
}

export async function updateLead(id: string, data: { status: string; notes: string | null }): Promise<void> {
  await ready();
  await execute("UPDATE LeadEntry SET status = ?, notes = ? WHERE id = ?", [data.status, data.notes, id]);
}

export async function deleteLead(id: string): Promise<void> {
  await ready();
  await execute("DELETE FROM LeadEntry WHERE id = ?", [id]);
}

/* ---------- case studies ---------- */

interface RawCaseStudyRow {
  id: string;
  slug: string;
  client: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  timeline: string;
  liveUrl: string | null;
  summary: string;
  challenge: string;
  services: string;
  stack: string | null;
  approach: string;
  metrics: string;
  quoteText: string | null;
  quoteName: string | null;
  quoteRole: string | null;
  seed: number;
  confidential: number;
  featured: number;
  published: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudyRow extends Omit<RawCaseStudyRow, "confidential" | "featured" | "published"> {
  confidential: boolean;
  featured: boolean;
  published: boolean;
}

function mapCaseStudyRow(r: RawCaseStudyRow): CaseStudyRow {
  return { ...r, confidential: !!r.confidential, featured: !!r.featured, published: !!r.published };
}

export interface CaseStudyInput {
  slug: string;
  client: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  timeline: string;
  liveUrl: string | null;
  summary: string;
  challenge: string;
  services: string;
  stack: string | null;
  approach: string;
  metrics: string;
  quoteText: string | null;
  quoteName: string | null;
  quoteRole: string | null;
  seed: number;
  order: number;
  confidential: boolean;
  featured: boolean;
  published: boolean;
}

export async function listCaseStudies(opts: { publishedOnly?: boolean } = {}): Promise<CaseStudyRow[]> {
  await ready();
  const where = opts.publishedOnly ? "WHERE published = 1" : "";
  const res = await execute<RawCaseStudyRow>(
    `SELECT * FROM CaseStudy ${where} ORDER BY \`order\` ASC, createdAt ASC`,
  );
  return res.rows.map(mapCaseStudyRow);
}

export async function getCaseStudyById(id: string): Promise<CaseStudyRow | null> {
  await ready();
  const res = await execute<RawCaseStudyRow>("SELECT * FROM CaseStudy WHERE id = ?", [id]);
  return res.rows[0] ? mapCaseStudyRow(res.rows[0]) : null;
}

export async function countCaseStudies(): Promise<number> {
  await ready();
  const res = await execute<{ n: number }>("SELECT COUNT(*) AS n FROM CaseStudy");
  return Number(res.rows[0].n);
}

export async function createCaseStudy(input: CaseStudyInput): Promise<void> {
  await ready();
  const id = randomUUID();
  await execute(
    `INSERT INTO CaseStudy
      (id, slug, client, title, category, industry, year, timeline, liveUrl, summary, challenge, services, stack, approach, metrics, quoteText, quoteName, quoteRole, seed, confidential, featured, published, \`order\`)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, input.slug, input.client, input.title, input.category, input.industry, input.year,
      input.timeline, input.liveUrl, input.summary, input.challenge, input.services, input.stack,
      input.approach, input.metrics, input.quoteText, input.quoteName, input.quoteRole, input.seed,
      input.confidential ? 1 : 0, input.featured ? 1 : 0, input.published ? 1 : 0, input.order,
    ],
  );
}

export async function updateCaseStudy(id: string, input: CaseStudyInput): Promise<void> {
  await ready();
  await execute(
    `UPDATE CaseStudy SET
      slug=?, client=?, title=?, category=?, industry=?, year=?, timeline=?, liveUrl=?, summary=?, challenge=?,
      services=?, stack=?, approach=?, metrics=?, quoteText=?, quoteName=?, quoteRole=?, seed=?,
      confidential=?, featured=?, published=?, \`order\`=?
     WHERE id=?`,
    [
      input.slug, input.client, input.title, input.category, input.industry, input.year, input.timeline,
      input.liveUrl, input.summary, input.challenge, input.services, input.stack, input.approach, input.metrics,
      input.quoteText, input.quoteName, input.quoteRole, input.seed,
      input.confidential ? 1 : 0, input.featured ? 1 : 0, input.published ? 1 : 0, input.order, id,
    ],
  );
}

/** Returns the slug that was deleted (so the caller can bust its cached page), or null if nothing matched. */
export async function deleteCaseStudy(id: string): Promise<{ slug: string } | null> {
  await ready();
  const res = await execute<{ slug: string }>("SELECT slug FROM CaseStudy WHERE id = ?", [id]);
  const slug = res.rows[0]?.slug;
  if (!slug) return null;
  await execute("DELETE FROM CaseStudy WHERE id = ?", [id]);
  return { slug };
}

/* ---------- testimonials ---------- */

interface RawTestimonialRow {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  posterUrl: string | null;
  aspect: string;
  published: number;
  featured: number;
  order: number;
  createdAt: Date;
}

export interface TestimonialRow extends Omit<RawTestimonialRow, "published" | "featured"> {
  published: boolean;
  featured: boolean;
}

function mapTestimonialRow(r: RawTestimonialRow): TestimonialRow {
  return { ...r, published: !!r.published, featured: !!r.featured };
}

export interface TestimonialInput {
  quote: string;
  name: string;
  role: string;
  company: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  posterUrl: string | null;
  aspect: string;
  order: number;
  featured: boolean;
  published: boolean;
}

export async function listTestimonials(opts: { publishedOnly?: boolean } = {}): Promise<TestimonialRow[]> {
  await ready();
  const where = opts.publishedOnly ? "WHERE published = 1" : "";
  const res = await execute<RawTestimonialRow>(
    `SELECT * FROM Testimonial ${where} ORDER BY \`order\` ASC, createdAt ASC`,
  );
  return res.rows.map(mapTestimonialRow);
}

export async function countTestimonials(): Promise<number> {
  await ready();
  const res = await execute<{ n: number }>("SELECT COUNT(*) AS n FROM Testimonial");
  return Number(res.rows[0].n);
}

export async function createTestimonial(input: TestimonialInput): Promise<void> {
  await ready();
  const id = randomUUID();
  await execute(
    `INSERT INTO Testimonial (id, quote, name, role, company, mediaUrl, mediaType, posterUrl, aspect, \`order\`, featured, published)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      id, input.quote, input.name, input.role, input.company, input.mediaUrl, input.mediaType,
      input.posterUrl, input.aspect, input.order, input.featured ? 1 : 0, input.published ? 1 : 0,
    ],
  );
}

export async function updateTestimonial(id: string, input: TestimonialInput): Promise<void> {
  await ready();
  await execute(
    `UPDATE Testimonial SET
      quote=?, name=?, role=?, company=?, mediaUrl=?, mediaType=?, posterUrl=?, aspect=?, \`order\`=?, featured=?, published=?
     WHERE id=?`,
    [
      input.quote, input.name, input.role, input.company, input.mediaUrl, input.mediaType,
      input.posterUrl, input.aspect, input.order, input.featured ? 1 : 0, input.published ? 1 : 0, id,
    ],
  );
}

export async function deleteTestimonial(id: string): Promise<void> {
  await ready();
  await execute("DELETE FROM Testimonial WHERE id = ?", [id]);
}

/* ---------- settings ---------- */

export async function getSetting(key: string): Promise<string | null> {
  await ready();
  const res = await execute<{ value: string }>("SELECT value FROM Setting WHERE `key` = ?", [key]);
  return res.rows[0]?.value ?? null;
}

export async function upsertSetting(key: string, value: string): Promise<void> {
  await ready();
  await execute(
    "INSERT INTO Setting (`key`, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)",
    [key, value],
  );
}

export async function deleteSetting(key: string): Promise<void> {
  await ready();
  await execute("DELETE FROM Setting WHERE `key` = ?", [key]);
}

/* ---------- admin users ---------- */

export interface AdminUserRow {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export async function getAdminByEmail(email: string): Promise<AdminUserRow | null> {
  await ready();
  const res = await execute<AdminUserRow>("SELECT * FROM AdminUser WHERE email = ?", [email]);
  return res.rows[0] ?? null;
}

export async function countAdminUsers(): Promise<number> {
  await ready();
  const res = await execute<{ n: number }>("SELECT COUNT(*) AS n FROM AdminUser");
  return Number(res.rows[0].n);
}

export async function createAdminUser(email: string, passwordHash: string): Promise<void> {
  await ready();
  await execute("INSERT INTO AdminUser (id, email, passwordHash) VALUES (?, ?, ?)", [
    randomUUID(),
    email,
    passwordHash,
  ]);
}
