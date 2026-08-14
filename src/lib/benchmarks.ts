/**
 * Published benchmarks used by the calculators. Every figure here is sourced —
 * the tools surface the source alongside the result so a prospect can check the
 * assumptions (and forward them internally without getting shot down).
 *
 * Researched August 2026. Review roughly every 6 months.
 */

export type Source = { label: string; url: string };

export const SOURCES = {
  webCost: {
    label: "Website development cost in India 2026 — Zethic / Apricorn / Claritus",
    url: "https://zethic.com/website-development-cost-in-india-2026-full-price-breakdown/",
  },
  appCost: {
    label: "Mobile app & custom software cost in India 2026 — Akoode / Rannlab",
    url: "https://www.akoode.com/blog/mobile-app-development-cost-india",
  },
  erpCost: {
    label: "ERP development cost in India 2026 — Secuodsoft",
    url: "https://www.secuodsoft.com/blog/software-development/erp-software-development-cost-in-india.php",
  },
  coldEmail: {
    label: "B2B cold email benchmarks 2026 — Cleanlist / LeadHaste / Instantly",
    url: "https://www.cleanlist.ai/blog/2026-02-18-cold-email-response-rate-statistics",
  },
  whatsapp: {
    label: "WhatsApp marketing benchmarks India 2026 — RichAutomate / HillTeck",
    url: "https://richautomate.in/blog/whatsapp-marketing-benchmarks-india-2026",
  },
  metaAds: {
    label: "Meta Ads India CPM/CPC benchmarks 2026 — productgrowth.in / VGraple",
    url: "https://productgrowth.in/tools/marketing/meta-ads/",
  },
  googleAds: {
    label: "Google Ads India CPC benchmarks 2026 — OwlClaw / upGrowth",
    url: "https://owlclaw.com/benchmarks/ppc-benchmarks-india/",
  },
  smm: {
    label: "Social media management pricing India 2026 — upGrowth",
    url: "https://upgrowth.in/social-media-management-pricing/",
  },
} satisfies Record<string, Source>;

/* ── Outbound ─────────────────────────────────────────────────────────────── */

export const OUTREACH = {
  /** Share of a raw scraped list that survives verification. */
  deliverableRate: { low: 0.82, mid: 0.9, high: 0.95 },
  /** Replies as a share of emails delivered. 3.1% average, 8–12% top quartile. */
  replyRate: { low: 0.015, mid: 0.031, high: 0.08 },
  /** Share of replies that are positive rather than "no thanks". */
  positiveShare: { low: 0.2, mid: 0.32, high: 0.45 },
  /** Meetings booked as a share of emails sent — 0.8–1.5% is "good". */
  meetingRate: { low: 0.005, mid: 0.011, high: 0.025 },
  /** WhatsApp on an opted-in list. Read rates cluster 65–90%, not the myth 98%. */
  whatsappRead: { low: 0.65, mid: 0.82, high: 0.9 },
  whatsappReply: { low: 0.18, mid: 0.35, high: 0.45 },
  /** Typical close rate from a booked meeting, SMB/mid-market services. */
  closeRate: { low: 0.1, mid: 0.2, high: 0.3 },
  /** Safe sending volume per inbox per day before deliverability suffers. */
  emailsPerInboxPerDay: 40,
  source: SOURCES.coldEmail,
} as const;

/* ── Paid media (India) ───────────────────────────────────────────────────── */

export const PAID = {
  meta: {
    cpm: { low: 50, mid: 110, high: 250 },
    cpc: { low: 2, mid: 12, high: 25 },
    ctr: { low: 0.008, mid: 0.014, high: 0.025 },
    note: "Reels typically run 25–40% below feed CPM. Tier-2/3 geos cut CPM 30–50%.",
    source: SOURCES.metaAds,
  },
  google: {
    cpc: { low: 15, mid: 35, high: 80 },
    ctr: { low: 0.02, mid: 0.04, high: 0.07 },
    note: "Real estate ₹40–120, education ₹15–45, finance/legal far higher.",
    source: SOURCES.googleAds,
  },
  landingCvr: { low: 0.01, mid: 0.025, high: 0.05 },
} as const;

/* ── Retainers ────────────────────────────────────────────────────────────── */

export const RETAINERS = {
  socialMedia: { low: 25000, mid: 45000, high: 100000 },
  note: "Ad spend is billed separately by the platform. GST at 18% is extra.",
  source: SOURCES.smm,
} as const;

/* ── Automation ───────────────────────────────────────────────────────────── */

export const AUTOMATION = {
  /** Fully-loaded cost per hour by role band, INR. */
  hourlyCost: {
    junior: 180,
    executive: 320,
    manager: 650,
    senior: 1200,
  },
  workingHoursPerMonth: 176,
  /** Share of a manual task that automation realistically removes. */
  automatableShare: { low: 0.5, mid: 0.75, high: 0.92 },
} as const;

export const GST_RATE = 0.18;

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export const formatCompactINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return formatINR(n);
};
