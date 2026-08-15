/**
 * Long-form content for every service page.
 *
 * Each entry is written to answer the same four questions in the same order:
 * what hurts, what we actually do about it, what you end up holding, and why
 * us. Numbers quoted in `pain` and `signals` are sourced — see SOURCES — so
 * the pages can be fact-checked rather than taken on faith.
 */

import { PILLARS } from "./services";

export type Source = { id: string; label: string; url: string };

export type Pain = {
  title: string;
  body: string;
  /** A sourced number that makes the problem concrete. */
  stat?: { value: string; note: string; source: string };
};

export type ServiceDetail = {
  slug: string;
  pillar: string;
  /** Page headline. Short, declarative, no fluff. */
  title: string;
  /** One-line summary used in metadata and cards. */
  summary: string;
  lede: string;
  pain: Pain[];
  approach: { title: string; body: string }[];
  deliverables: string[];
  different: { title: string; body: string }[];
  signals: { label: string; value: string; source?: string }[];
  faqs: { q: string; a: string }[];
  cta: { headline: string; body: string };
  related: string[];
  sources: string[];
};

export const SOURCES: Record<string, Source> = {
  amplemarket: {
    id: "amplemarket",
    label: "Amplemarket — 2026 cold email benchmarks",
    url: "https://www.amplemarket.com/blog/cold-email-benchmarks",
  },
  instantly: {
    id: "instantly",
    label: "Instantly — Cold Email Benchmark Report 2026",
    url: "https://instantly.ai/cold-email-benchmark-report-2026",
  },
  lacleo: {
    id: "lacleo",
    label: "Lacleo — Cold email benchmarks & the new sender rules, 2026",
    url: "https://www.lacleo.ai/blog/cold-email-benchmarks-deliverability-2026",
  },
  powerdmarc: {
    id: "powerdmarc",
    label: "PowerDMARC — Bulk sender rules for Google, Yahoo, Microsoft & Apple (2026)",
    url: "https://powerdmarc.com/bulk-email-sender-requirements/",
  },
  redsift: {
    id: "redsift",
    label: "Red Sift — 2026 bulk email sender requirements checklist",
    url: "https://redsift.com/guides/bulk-email-sender-requirements",
  },
  cleanlist: {
    id: "cleanlist",
    label: "Cleanlist — B2B data decay statistics, 2026",
    url: "https://www.cleanlist.ai/blog/2026-01-22-b2b-data-decay-statistics",
  },
  landbase: {
    id: "landbase",
    label: "Landbase — Data decay rate statistics, 2026",
    url: "https://www.landbase.com/blog/data-decay-rate-statistics",
  },
  emailaddress: {
    id: "emailaddress",
    label: "EmailAddress.ai — Bounce rate benchmarks by industry, 2026",
    url: "https://www.emailaddress.ai/blog/email-bounce-rate-benchmarks-2026",
  },
  wittelsbach: {
    id: "wittelsbach",
    label: "Wittelsbach — Meta Ads benchmarks for Indian e-commerce brands (2026)",
    url: "https://www.wittelsbach.ai/post/meta-ads-benchmarks-for-indian-e-commerce-brands-2026",
  },
  adamigo: {
    id: "adamigo",
    label: "Adamigo — Meta Ads CPM & CPC benchmarks by country, 2026",
    url: "https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026",
  },
  searchengineland: {
    id: "searchengineland",
    label: "Search Engine Land — Google zero-click searches reach 68% in early 2026",
    url: "https://searchengineland.com/google-zero-click-searches-2026-study-479717",
  },
  dataslayer: {
    id: "dataslayer",
    label: "Dataslayer, on Seer Interactive's AI Overviews CTR study",
    url: "https://www.dataslayer.ai/blog/google-ai-overviews-the-end-of-traditional-ctr-and-how-to-adapt-in-2025",
  },
  superlines: {
    id: "superlines",
    label: "Superlines — AI search statistics 2026",
    url: "https://www.superlines.io/articles/ai-search-statistics/",
  },
  demandlocal: {
    id: "demandlocal",
    label: "Demand Local — ChatGPT & Perplexity citation ROI statistics, 2026",
    url: "https://www.demandlocal.com/blog/chatgpt-and-perplexity-citation-roi-statistics/",
  },
  thestaccLocal: {
    id: "thestaccLocal",
    label: "The Stacc — Local SEO statistics 2026",
    url: "https://thestacc.com/blog/local-seo-statistics/",
  },
  digitalappliedLocal: {
    id: "digitalappliedLocal",
    label: "Digital Applied — Local SEO statistics 2026",
    url: "https://www.digitalapplied.com/blog/local-seo-statistics-2026-data-points",
  },
  socialinsider: {
    id: "socialinsider",
    label: "Socialinsider — 2026 Instagram organic engagement benchmarks",
    url: "https://www.socialinsider.io/social-media-benchmarks/instagram",
  },
  outfame: {
    id: "outfame",
    label: "Outfame — Instagram organic reach statistics, 2026",
    url: "https://www.outfame.com/blog/instagram-organic-reach-statistics",
  },
  cleverly: {
    id: "cleverly",
    label: "Cleverly — LinkedIn benchmarks 2026",
    url: "https://www.cleverly.co/blog/linkedin-benchmarks",
  },
  expandi: {
    id: "expandi",
    label: "Expandi — LinkedIn outreach benchmarks 2026 (13.2M data points)",
    url: "https://expandi.io/blog/linkedin-outreach-benchmarks-2026/",
  },
  aisensy: {
    id: "aisensy",
    label: "AiSensy — WhatsApp Business API pricing in India, 2026",
    url: "https://aisensy.com/pricing",
  },
  chati: {
    id: "chati",
    label: "Chati — WhatsApp Business API pricing update, India, January 2026",
    url: "https://chati.ai/blog/whatsapp-business-api-pricing-update-for-2026",
  },
  johnnygrow: {
    id: "johnnygrow",
    label: "Johnny Grow — CRM failure rate research",
    url: "https://johnnygrow.com/crm/the-crm-failure-rate-is-55-percent/",
  },
  askelephant: {
    id: "askelephant",
    label: "AskElephant — Why reps spend 25% of their time on CRM",
    url: "https://www.askelephant.ai/blog/why-reps-spend-25-percent-of-time-on-crm",
  },
  pintel: {
    id: "pintel",
    label: "Pintel — Sales teams waste 8+ hours a week on manual work (2026)",
    url: "https://pintel.ai/blogs/sales-teams-waste-8-hours-a-week-on-manual-work/",
  },
  godlan: {
    id: "godlan",
    label: "Godlan — ERP implementation failure statistics, 2026",
    url: "https://godlan.com/erp-implementation-failure-statistics/",
  },
  jobinandjismi: {
    id: "jobinandjismi",
    label: "Jobin & Jismi — ERP implementation failure statistics",
    url: "https://www.jobinandjismi.com/blog/erp-implementation-failure-statistics",
  },
  digitalappliedSpeed: {
    id: "digitalappliedSpeed",
    label: "Digital Applied — Page speed statistics 2026: performance and revenue impact",
    url: "https://www.digitalapplied.com/blog/page-speed-statistics-2026-revenue-impact",
  },
  digitalappliedLanding: {
    id: "digitalappliedLanding",
    label: "Digital Applied — Landing page statistics 2026",
    url: "https://www.digitalapplied.com/blog/landing-page-statistics-2026-conversion-data-points",
  },
  solve: {
    id: "solve",
    label: "Solve — Site speed impact on conversion rates, 2026",
    url: "https://solve.co.uk/digital-strategy/site-speed-impact-on-conversion-rate/",
  },
  clarityarc: {
    id: "clarityarc",
    label: "ClarityArc — AI support ticket deflection, 2026 production benchmarks",
    url: "https://www.clarityarc.com/insights/ai-support-ticket-deflection",
  },
  insidesales: {
    id: "insidesales",
    label: "InsideSales — Lead response time research (with HBR / MIT)",
    url: "https://www.insidesales.com/response-time-matters/",
  },
  ustech: {
    id: "ustech",
    label: "US Tech Automations — Small business automation ROI, 2026",
    url: "https://ustechautomations.com/resources/blog/small-business-automation-roi-2026",
  },
  techvaria: {
    id: "techvaria",
    label: "Techvaria — Measuring Zoho implementation ROI",
    url: "https://www.techvaria.com/blog/zoho-implementation-roi-measurement-guide.html",
  },
  pragyantra: {
    id: "pragyantra",
    label: "Pragyantra — Tally & Zoho integration guide for Indian SMEs (2026)",
    url: "https://pragyantra.com/blog/tally-zoho-integration-guide-india",
  },
  nprdesign: {
    id: "nprdesign",
    label: "NPR Design — UGC ads & nano influencers in India: the 2026 playbook",
    url: "https://www.nprdesign.com/blog-ugc-nano-influencers.html",
  },
  influentials: {
    id: "influentials",
    label: "Influentials — UGC and influencer marketing trends for 2026",
    url: "https://www.influentials.com/en-us/blog/the-top-10-ugc-and-influencer-marketing-trends-every-brand-must-prepare-for-in-2026",
  },
  storika: {
    id: "storika",
    label: "Storika — The 2026 creator economy playbook",
    url: "https://www.storika.ai/guides/creator-economy-playbook-2026",
  },
};

import { MARKETING_DETAILS } from "./details/marketing";
import { OUTREACH_DETAILS } from "./details/outreach";
import { TECHNOLOGY_DETAILS } from "./details/technology";

export const SERVICE_DETAILS: ServiceDetail[] = [
  ...MARKETING_DETAILS,
  ...OUTREACH_DETAILS,
  ...TECHNOLOGY_DETAILS,
];

export function getDetail(pillar: string, slug: string) {
  return SERVICE_DETAILS.find((d) => d.pillar === pillar && d.slug === slug);
}

export function getPillar(id: string) {
  return PILLARS.find((p) => p.id === id);
}

/** Every (pillar, service) pair that has a written page. */
export const SERVICE_ROUTES = PILLARS.flatMap((p) =>
  p.services
    .filter((s) => SERVICE_DETAILS.some((d) => d.pillar === p.id && d.slug === s.slug))
    .map((s) => ({ pillar: p.id, service: s.slug })),
);
