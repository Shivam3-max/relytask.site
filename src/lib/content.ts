import "server-only";
import { listCaseStudies, listTestimonials, type CaseStudyRow } from "./db";
import { CASE_STUDIES, type CaseStudy } from "./case-studies";

/**
 * Case studies and testimonials come from the database so they can be added
 * from the admin panel. The arrays in lib/ are intentionally empty — they
 * exist only as a typed fallback for when the database is unreachable, not
 * as preinstalled content.
 */

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  posterUrl: string | null;
  aspect: string;
  featured: boolean;
  order: number;
};

/**
 * Intentionally empty — testimonials are added from the admin panel and
 * stored in the database. Kept as a self-contained literal because
 * scripts/seed.mjs reads this array straight out of the file, so it must not
 * reference anything defined elsewhere.
 */
export const FALLBACK_TESTIMONIALS: Testimonial[] = [];

const parse = <T,>(json: string | null, fallback: T): T => {
  if (!json) return fallback;
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

function toCaseStudy(row: CaseStudyRow): CaseStudy {
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
    imageUrl: row.imageUrl ?? undefined,
    confidential: row.confidential,
    featured: row.featured,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const rows = await listCaseStudies({ publishedOnly: true });
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
    const rows = await listTestimonials({ publishedOnly: true });
    if (!rows.length) return FALLBACK_TESTIMONIALS;
    return rows.map((r) => ({
      id: r.id,
      quote: r.quote,
      name: r.name,
      role: r.role,
      company: r.company,
      mediaUrl: r.mediaUrl,
      mediaType: r.mediaType,
      posterUrl: r.posterUrl,
      aspect: r.aspect,
      featured: r.featured,
      order: r.order,
    }));
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}
