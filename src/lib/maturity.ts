/**
 * Digital Maturity Score — 20 questions across six areas.
 *
 * Each answer scores 0–4. The point of the tool is not the total; it is the
 * ranking, because the lowest-scoring area is almost always where the next
 * rupee should go. Every area maps to the service page that fixes it.
 */

export type Area = {
  id: string;
  name: string;
  /** Why this area matters, shown with the result. */
  why: string;
  /** Service page that addresses a weak score here. */
  fix: { label: string; href: string };
};

export const AREAS: Area[] = [
  {
    id: "brand",
    name: "Brand & positioning",
    why: "If a stranger cannot tell what you do and who it is for in five seconds, every rupee spent on attention works harder than it should have to.",
    fix: { label: "Brand & Identity", href: "/services/marketing/brand-identity" },
  },
  {
    id: "content",
    name: "Content & organic",
    why: "Content is the only channel that keeps working after you stop paying. Without it, acquisition cost only ever goes up.",
    fix: { label: "Content Strategy", href: "/services/marketing/content-strategy" },
  },
  {
    id: "paid",
    name: "Paid media",
    why: "Most underperforming accounts fail on creative volume and measurement, not on bidding. Both are fixable.",
    fix: { label: "Performance Marketing", href: "/services/marketing/performance-marketing" },
  },
  {
    id: "outbound",
    name: "Outbound",
    why: "Some buyers will never search for you. Outbound is how you reach them — but only if the list and infrastructure are right.",
    fix: { label: "Cold Email Campaigns", href: "/services/outreach/cold-email" },
  },
  {
    id: "conversion",
    name: "Website & conversion",
    why: "Doubling conversion has the same effect as doubling traffic, and usually costs a fraction as much.",
    fix: { label: "Conversion Optimisation", href: "/services/marketing/cro" },
  },
  {
    id: "systems",
    name: "Systems & data",
    why: "Demand you cannot capture, route and measure is demand you paid for twice.",
    fix: { label: "Custom CRM", href: "/services/technology/crm" },
  },
];

export type Question = {
  id: string;
  area: string;
  text: string;
  /** Index 0–4, worst to best. */
  answers: string[];
};

export const QUESTIONS: Question[] = [
  // ── Brand ──────────────────────────────────────────────────
  {
    id: "brand-clarity",
    area: "brand",
    text: "Could a stranger explain what you sell after five seconds on your homepage?",
    answers: [
      "No — we're not sure ourselves",
      "Roughly, if they read carefully",
      "Yes, but it sounds like everyone else",
      "Yes, and it's specific",
      "Yes, and it names who it's not for",
    ],
  },
  {
    id: "brand-consistency",
    area: "brand",
    text: "How consistent are your visuals across ads, site, decks and social?",
    answers: [
      "Every asset looks different",
      "Loosely similar",
      "Consistent colours, little else",
      "A documented system most people follow",
      "A system with templates the team actually uses",
    ],
  },
  {
    id: "brand-proof",
    area: "brand",
    text: "How much proof does a first-time visitor see?",
    answers: [
      "None",
      "A logo strip",
      "A few testimonials",
      "Case studies with real numbers",
      "Case studies, numbers and named references",
    ],
  },

  // ── Content ────────────────────────────────────────────────
  {
    id: "content-cadence",
    area: "content",
    text: "How reliably do you publish?",
    answers: [
      "Nothing for months at a time",
      "In bursts when someone remembers",
      "Roughly monthly",
      "Weekly, planned ahead",
      "Weekly, batched a quarter in advance",
    ],
  },
  {
    id: "content-strategy",
    area: "content",
    text: "Is there a written plan behind what gets published?",
    answers: [
      "No",
      "A rough list of ideas",
      "A calendar, no strategy",
      "Pillars with a stated purpose each",
      "Pillars, purpose and a measurement plan",
    ],
  },
  {
    id: "content-search",
    area: "content",
    text: "Do you rank or get cited for the searches your buyers actually run?",
    answers: [
      "We've never checked",
      "We rank for our brand name only",
      "A few long-tail terms",
      "Several commercial terms",
      "Commercial terms, plus we get cited in AI answers",
    ],
  },
  {
    id: "content-owned",
    area: "content",
    text: "How big is the audience you can contact directly — email or WhatsApp list?",
    answers: [
      "We don't have one",
      "A list nobody has used in a year",
      "A small list, mailed occasionally",
      "A healthy list, mailed regularly",
      "A segmented list with measured revenue attached",
    ],
  },

  // ── Paid ───────────────────────────────────────────────────
  {
    id: "paid-tracking",
    area: "paid",
    text: "How much do you trust your conversion tracking?",
    answers: [
      "We don't have any",
      "The pixel is installed, that's it",
      "Basic events, some duplication",
      "Server-side events, deduplicated",
      "Server-side, deduplicated, reconciled against sales",
    ],
  },
  {
    id: "paid-creative",
    area: "paid",
    text: "How many genuinely new ad concepts do you test each month?",
    answers: [
      "None — same ads for months",
      "One or two variations",
      "Three to five variations",
      "Five or more, different angles",
      "A standing pipeline with a documented win rate",
    ],
  },
  {
    id: "paid-margin",
    area: "paid",
    text: "Do you know your break-even ROAS?",
    answers: [
      "No",
      "We have a target someone gave us",
      "Roughly, from revenue",
      "Yes, calculated from gross margin",
      "Yes, and we scale on contribution margin",
    ],
  },

  // ── Outbound ───────────────────────────────────────────────
  {
    id: "out-icp",
    area: "outbound",
    text: "How precisely is your ideal customer defined?",
    answers: [
      "Anyone who'll buy",
      "An industry and a size",
      "A written profile",
      "Filters we can run a search on",
      "Filters, buying committee and trigger events",
    ],
  },
  {
    id: "out-infra",
    area: "outbound",
    text: "How is outbound email set up?",
    answers: [
      "We don't do outbound",
      "From our main domain",
      "Separate domains, no warmup",
      "Separate domains, warmed, SPF/DKIM/DMARC",
      "All of that, plus placement monitoring and rotation",
    ],
  },
  {
    id: "out-data",
    area: "outbound",
    text: "Where do your contact lists come from?",
    answers: [
      "Bought lists",
      "One tool, unverified",
      "One tool, verified",
      "Multiple sources, verified",
      "Multi-source, verified, human-checked, refreshed",
    ],
  },
  {
    id: "out-speed",
    area: "outbound",
    text: "How fast does someone respond to an inbound reply or enquiry?",
    answers: [
      "Days, sometimes never",
      "Within a day or two",
      "Same day",
      "Within an hour, working hours",
      "Within minutes, with routing rules",
    ],
  },

  // ── Conversion ─────────────────────────────────────────────
  {
    id: "conv-speed",
    area: "conversion",
    text: "How fast is your site on a mid-range Android phone?",
    answers: [
      "Slow, and we know it",
      "No idea",
      "Fine on desktop, slow on mobile",
      "Passes Core Web Vitals on most pages",
      "Passes everywhere, monitored continuously",
    ],
  },
  {
    id: "conv-testing",
    area: "conversion",
    text: "When did you last test a change to your main landing page?",
    answers: [
      "Never",
      "Over a year ago",
      "In the last six months",
      "In the last month",
      "Continuously, with a logged experiment history",
    ],
  },
  {
    id: "conv-clarity",
    area: "conversion",
    text: "Is pricing visible or clearly explained on your site?",
    answers: [
      "No mention at all",
      "'Contact us for pricing'",
      "A vague range",
      "Clear ranges or starting prices",
      "Clear pricing plus a calculator or estimator",
    ],
  },

  // ── Systems ────────────────────────────────────────────────
  {
    id: "sys-crm",
    area: "systems",
    text: "Where do leads live?",
    answers: [
      "Inbox and WhatsApp",
      "A spreadsheet",
      "A CRM nobody updates",
      "A CRM the team actually uses",
      "A CRM with automatic capture and routing",
    ],
  },
  {
    id: "sys-automation",
    area: "systems",
    text: "How much manual re-typing happens between your systems?",
    answers: [
      "Constant — everything is retyped",
      "A lot, and it causes errors",
      "Some, in a few places",
      "Little — the main flows are connected",
      "Almost none, with monitoring on the integrations",
    ],
  },
  {
    id: "sys-reporting",
    area: "systems",
    text: "Can you see spend, pipeline and closed revenue in one place?",
    answers: [
      "No",
      "Separate reports, assembled by hand",
      "A dashboard people distrust",
      "One dashboard, agreed definitions",
      "One dashboard, automated, reviewed monthly",
    ],
  },
];

export const MAX_PER_QUESTION = 4;

export type AreaScore = {
  area: Area;
  score: number;
  max: number;
  percent: number;
};

export function scoreByArea(answers: Record<string, number>): AreaScore[] {
  return AREAS.map((area) => {
    const qs = QUESTIONS.filter((q) => q.area === area.id);
    const max = qs.length * MAX_PER_QUESTION;
    const score = qs.reduce((n, q) => n + (answers[q.id] ?? 0), 0);
    return { area, score, max, percent: max > 0 ? score / max : 0 };
  });
}

export function overall(answers: Record<string, number>) {
  const max = QUESTIONS.length * MAX_PER_QUESTION;
  const score = QUESTIONS.reduce((n, q) => n + (answers[q.id] ?? 0), 0);
  return { score, max, percent: max > 0 ? score / max : 0 };
}

export const BANDS = [
  { min: 0.8, label: "Compounding", body: "You are past the point where basics are the constraint. The gains now come from concentration — doubling down on what already works and cutting what doesn't." },
  { min: 0.6, label: "Operating", body: "The machine runs. The remaining upside is in the two weakest areas below, which are almost certainly holding back everything else." },
  { min: 0.4, label: "Patchy", body: "Some parts work well and others are missing entirely. That imbalance is why results feel inconsistent month to month." },
  { min: 0.2, label: "Fragmented", body: "There is activity but not a system. Most of what you spend is leaking somewhere between the channels." },
  { min: 0, label: "Starting", body: "Almost everything is upside. Start with one area rather than trying to fix all six — the order below is the one we would use." },
];

export const bandFor = (percent: number) =>
  BANDS.find((b) => percent >= b.min) ?? BANDS[BANDS.length - 1];
