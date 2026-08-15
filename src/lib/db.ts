import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

/**
 * Prisma 7 requires a driver adapter. Postgres, because the app is deployed to
 * a platform with a read-only filesystem — SQLite has nowhere to live there.
 *
 * Any Postgres works: Neon, Vercel Postgres, Supabase, RDS, or the PGlite
 * server in scripts/pg-dev.mjs for local development.
 *
 * The client is built on first use rather than at import. A missing
 * DATABASE_URL during a build would otherwise throw while the module loads,
 * before any caller could handle it — and the public pages are written to fall
 * back to their code-defined content when the database is unreachable.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function create(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env for local work, or set it in your host's environment variables.",
    );
  }

  // Pool size matters in two directions: serverless wants it small so a burst
  // of lambdas does not exhaust the database's connection limit, and the local
  // PGlite server in scripts/pg-dev.mjs serves one connection at a time.
  const max = Number(process.env.DATABASE_POOL_MAX);
  const client = new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      ...(Number.isFinite(max) && max > 0 ? { max } : {}),
    }),
  });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = globalForPrisma.prisma ?? create();
    // No receiver: Prisma's own proxies rely on `this` being the real client.
    return Reflect.get(client, property);
  },
});
