/**
 * Copies the case studies and testimonials written into the codebase into the
 * database, so they can be edited from the admin panel. Safe to re-run: it
 * skips anything already present by slug.
 *
 *   npm run seed
 */
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

/** The lib files are TypeScript, so pull the data out with a tiny eval shim. */
async function loadModule(relPath, exportName) {
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

async function main() {
  const cases = await loadModule("src/lib/case-studies.ts", "CASE_STUDIES");
  const quotes = await loadModule("src/lib/content.ts", "FALLBACK_TESTIMONIALS");

  let added = 0;
  for (const [index, c] of cases.entries()) {
    const exists = await prisma.caseStudy.findUnique({ where: { slug: c.slug } });
    if (exists) continue;
    await prisma.caseStudy.create({
      data: {
        slug: c.slug,
        client: c.client,
        title: c.title,
        category: c.category,
        industry: c.industry,
        year: c.year,
        timeline: c.timeline,
        liveUrl: c.liveUrl ?? null,
        summary: c.summary,
        challenge: c.challenge,
        services: JSON.stringify(c.services ?? []),
        stack: JSON.stringify(c.stack ?? []),
        approach: JSON.stringify(c.approach ?? []),
        metrics: JSON.stringify(c.metrics ?? []),
        quoteText: c.testimonial?.quote ?? null,
        quoteName: c.testimonial?.name ?? null,
        quoteRole: c.testimonial?.role ?? null,
        seed: c.seed ?? 1,
        confidential: Boolean(c.confidential),
        featured: Boolean(c.featured),
        published: true,
        order: index,
      },
    });
    added++;
  }

  let quotesAdded = 0;
  const existingQuotes = await prisma.testimonial.count();
  if (existingQuotes === 0) {
    for (const [index, q] of quotes.entries()) {
      await prisma.testimonial.create({
        data: {
          quote: q.quote,
          name: q.name,
          role: q.role,
          order: index,
          published: true,
        },
      });
      quotesAdded++;
    }
  }

  console.log(
    `Seeded ${added} case stud${added === 1 ? "y" : "ies"} and ${quotesAdded} testimonial${
      quotesAdded === 1 ? "" : "s"
    }.`,
  );
  console.log(
    `Now holding ${await prisma.caseStudy.count()} case studies, ${await prisma.testimonial.count()} testimonials.`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
