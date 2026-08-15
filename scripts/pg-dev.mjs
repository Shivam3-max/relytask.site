/**
 * A real Postgres on localhost with nothing to install.
 *
 * PGlite is Postgres compiled to WASM; pglite-socket puts it behind the normal
 * wire protocol, so `pg`, Prisma and psql all talk to it as if it were a
 * server. Handy for local development and for CI, where standing up a
 * container is more trouble than it is worth.
 *
 *   node scripts/pg-dev.mjs
 *   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
 */
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import path from "node:path";

const dataDir = process.env.PGLITE_DIR ?? path.join(process.cwd(), ".pglite");
const port = Number(process.env.PGLITE_PORT ?? 5432);

const db = await PGlite.create({ dataDir });
const server = new PGLiteSocketServer({ db, port, host: "127.0.0.1" });

await server.start();
console.log(`Postgres (PGlite) listening on 127.0.0.1:${port}`);
console.log(`Data directory: ${dataDir}`);

const stop = async () => {
  await server.stop();
  await db.close();
  process.exit(0);
};
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
