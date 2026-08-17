export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: "Marketing" | "Outreach" | "Technology" | "Growth Systems";
  industry: string;
  year: string;
  timeline: string;
  liveUrl?: string;
  services: string[];
  stack?: string[];
  summary: string;
  challenge: string;
  approach: { title: string; body: string }[];
  metrics: Metric[];
  testimonial?: { quote: string; name: string; role: string };
  /** Placeholder art seed, used only when no real image has been uploaded. */
  seed: number;
  /** Uploaded cover image — takes priority over the generated placeholder art. */
  imageUrl?: string;
  confidential?: boolean;
  featured?: boolean;
};

/**
 * Intentionally empty — projects are added from the admin panel and stored in
 * the database (see src/lib/db.ts and src/app/admin/work). Kept as a
 * self-contained literal because scripts/seed.mjs reads it straight out of
 * this file, so it must not reference anything defined elsewhere.
 */
export const CASE_STUDIES: CaseStudy[] = [];

export const getCaseStudy = (slug: string) =>
  CASE_STUDIES.find((c) => c.slug === slug);

export const CATEGORIES = [
  "All",
  "Marketing",
  "Outreach",
  "Technology",
  "Growth Systems",
] as const;
