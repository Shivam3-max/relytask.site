export type Service = {
  slug: string;
  name: string;
  short: string;
};

export type Pillar = {
  id: string;
  index: string;
  name: string;
  href: string;
  headline: string;
  blurb: string;
  services: Service[];
};

export const PILLARS: Pillar[] = [
  {
    id: "marketing",
    index: "01",
    name: "Marketing",
    href: "/services/marketing",
    headline: "Attention, engineered.",
    blurb:
      "Strategy, production and paid media that make the market notice you — and keep noticing.",
    services: [
      { slug: "content-strategy", name: "Content Strategy", short: "The plan behind every post." },
      { slug: "production", name: "Production & Shoots", short: "Studio, product, founder, event." },
      { slug: "social-media", name: "Social Media Management", short: "Daily ops, end to end." },
      { slug: "organic-growth", name: "Organic Growth", short: "Reach that compounds." },
      { slug: "performance-marketing", name: "Performance Marketing", short: "Meta & Google, ROAS-first." },
      { slug: "brand-identity", name: "Brand & Identity", short: "Name, mark, system, voice." },
      { slug: "seo", name: "SEO & Local SEO", short: "Found where it counts." },
      { slug: "ai-search", name: "AI Search (GEO)", short: "Cited by ChatGPT & Gemini." },
      { slug: "influencer-ugc", name: "Influencer & UGC", short: "Creators, briefed and managed." },
      { slug: "cro", name: "Conversion Optimisation", short: "We fix the page too." },
    ],
  },
  {
    id: "outreach",
    index: "02",
    name: "Outreach",
    href: "/services/outreach",
    headline: "When ads don't work, we go find them.",
    blurb:
      "Built lists, verified data, warmed inboxes. We put you in the room with the exact people who should buy.",
    services: [
      { slug: "icp-research", name: "ICP & Market Research", short: "Who actually buys, defined." },
      { slug: "database-building", name: "Database Building", short: "Apollo, Lusha, Fetcher." },
      { slug: "list-verification", name: "List Verification", short: "Clean data, low bounce." },
      { slug: "email-infrastructure", name: "Email Infrastructure", short: "Domains, warmup, deliverability." },
      { slug: "cold-email", name: "Cold Email Campaigns", short: "Sequenced, tested, tracked." },
      { slug: "whatsapp-outreach", name: "WhatsApp Outreach", short: "The channel India answers." },
      { slug: "linkedin-outreach", name: "LinkedIn Outreach", short: "Warm the decision maker." },
      { slug: "meeting-booking", name: "Meeting Booking", short: "SDR-as-a-service." },
      { slug: "pipeline-reporting", name: "Pipeline Reporting", short: "Every reply accounted for." },
    ],
  },
  {
    id: "technology",
    index: "03",
    name: "Technology",
    href: "/services/technology",
    headline: "The machine that catches it all.",
    blurb:
      "Software built around how your business actually runs — not the other way around.",
    services: [
      { slug: "websites", name: "Websites & Web Apps", short: "Fast, owned, built to convert." },
      { slug: "mobile-apps", name: "Mobile Apps", short: "iOS and Android." },
      { slug: "crm", name: "Custom CRM", short: "Your pipeline, your rules." },
      { slug: "erp", name: "Custom ERP", short: "Operations on one spine." },
      { slug: "ai-agents", name: "AI Agents & Chatbots", short: "Answer, qualify, route." },
      { slug: "automation", name: "Workflow Automation", short: "Kill the manual hours." },
      { slug: "dashboards", name: "Dashboards & BI", short: "Numbers you can act on." },
      { slug: "integrations", name: "Integrations", short: "Tally, Zoho, Shopify, payments." },
      { slug: "support", name: "AMC & Support", short: "We stay after launch." },
    ],
  },
];

export const GROWTH_SYSTEM = {
  index: "04",
  name: "Growth Systems",
  href: "/services/growth-systems",
  blurb: "All three pillars. One retainer. One dashboard.",
};

export const ALL_SERVICES = PILLARS.flatMap((p) =>
  p.services.map((s) => ({ ...s, pillar: p.id, href: `${p.href}#${s.slug}` })),
);

export const PROCESS = [
  { n: "01", label: "Discover" },
  { n: "02", label: "Define" },
  { n: "03", label: "Build" },
  { n: "04", label: "Distribute" },
  { n: "05", label: "Optimise" },
];
