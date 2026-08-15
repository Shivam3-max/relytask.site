import "server-only";
import { prisma } from "./db";
import { CASE_STUDIES, type CaseStudy } from "./case-studies";

/**
 * Case studies and testimonials come from the database so they can be added
 * from the admin panel. The files in lib/ stay as the seed and as a fallback,
 * so an empty or unreachable database shows the original content rather than
 * an empty page.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  order: number;
};

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "seed-1",
    quote:
      "We'd been through two agencies. RelyTask was the first that asked to see our sales process before touching the ad account.",
    name: "Founder",
    role: "D2C wellness brand",
    order: 0,
  },
  {
    id: "seed-2",
    quote:
      "Thirty-one meetings with plant heads in ninety days, in a market where our ads had never worked. That changed the year.",
    name: "Director",
    role: "Industrial equipment",
    order: 1,
  },
  {
    id: "seed-3",
    quote:
      "They built the ERP and then ran the campaigns on top of it. One team, one number to call.",
    name: "Operations Head",
    role: "Manufacturing",
    order: 2,
  },
];

const parse = <T,>(json: string | null, fallback: T): T => {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

type Row = Awaited<ReturnType<typeof prisma.caseStudy.findMany>>[number];

function toCaseStudy(row: Row): CaseStudy {
  return {
    slug: row.slug,
    client: row.client,
    title: row.title,
    category: row.category as CaseStudy["category"],
    industry: row.industry,
    year: row.year,
    timeline: row.timeline,
    liveUrl: row.liveUrl ?? undefined,
    services: parse<string[]>(row.services, []),
    stack: parse<string[] | undefined>(row.stack, undefined),
    summary: row.summary,
    challenge: row.challenge,
    approach: parse<CaseStudy["approach"]>(row.approach, []),
    metrics: parse<CaseStudy["metrics"]>(row.metrics, []),
    testimonial: row.quoteText
      ? { quote: row.quoteText, name: row.quoteName ?? "", role: row.quoteRole ?? "" }
      : undefined,
    seed: row.seed,
    confidential: row.confidential,
    featured: row.featured,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (!rows.length) return CASE_STUDIES;
    return rows.map(toCaseStudy);
  } catch {
    return CASE_STUDIES;
  }
}

export async function getCaseStudyBySlug(slug: string) {
  const all = await getCaseStudies();
  return all.find((c) => c.slug === slug);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (!rows.length) return FALLBACK_TESTIMONIALS;
    return rows.map((r) => ({
      id: r.id,
      quote: r.quote,
      name: r.name,
      role: r.role,
      order: r.order,
    }));
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}
