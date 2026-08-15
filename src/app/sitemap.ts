import type { MetadataRoute } from "next";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";
import { SERVICE_ROUTES } from "@/lib/service-detail";
import { getCaseStudies } from "@/lib/content";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const CASE_STUDIES = await getCaseStudies();
  const now = new Date();
  const url = (path: string) => `${SITE.url}${path}`;

  const statics: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: url(GROWTH_SYSTEM.href), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/it-projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/tools"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/testimonials"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.9 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const pillars: MetadataRoute.Sitemap = PILLARS.map((p) => ({
    url: url(p.href),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const services: MetadataRoute.Sitemap = SERVICE_ROUTES.map((r) => ({
    url: url(`/services/${r.pillar}/${r.service}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const work: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: url(`/it-projects/${c.slug}`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const tools: MetadataRoute.Sitemap = TOOLS.map((t) => ({
    url: url(`/tools/${t.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...statics, ...pillars, ...services, ...work, ...tools].map((e) => ({
    ...e,
    lastModified: now,
  }));
}
