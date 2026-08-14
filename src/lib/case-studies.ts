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
  /** Placeholder art seed — swap for real photography later. */
  seed: number;
  confidential?: boolean;
  featured?: boolean;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "wise369",
    client: "WISE369",
    title: "A scroll-narrative site for a turnkey property builder",
    category: "Technology",
    industry: "Real estate & construction",
    year: "2026",
    timeline: "5 weeks",
    liveUrl: "https://wise369.vercel.app",
    services: ["Web design", "Motion design", "Development", "SEO"],
    stack: ["Next.js", "React Three Fiber", "GSAP", "Vercel"],
    summary:
      "Six service lines, one story. A 3D building assembles as you scroll, and every solution hangs off it.",
    challenge:
      "WISE369 sells six different services — property, brand, architecture, project management, turnkey execution and security. Their old site listed them. Nobody read past the second one, and enquiries never said which service they wanted.",
    approach: [
      {
        title: "Make the offer one object",
        body: "Instead of six sections, we built a single 3D structure that assembles floor by floor as you scroll. Each floor is a service. The offer stops being a list and becomes a building.",
      },
      {
        title: "Route the intent at the top",
        body: "Every service node in the hero links straight to its own page, so enquiries arrive pre-qualified rather than as generic 'tell me more' forms.",
      },
      {
        title: "Ship it fast on the edge",
        body: "Static generation with progressive enhancement — the 3D layer loads after the content is already readable, so mobile users never wait for it.",
      },
    ],
    metrics: [
      { value: "6", label: "services, one narrative" },
      { value: "2.1s", label: "LCP on 4G" },
      { value: "3.4×", label: "time on page vs old site" },
    ],
    seed: 7,
    featured: true,
  },
  {
    slug: "rely360",
    client: "RELY360",
    title: "Positioning a manufacturing consultancy around one promise",
    category: "Growth Systems",
    industry: "Manufacturing consulting",
    year: "2026",
    timeline: "6 weeks",
    liveUrl: "https://rely360.in",
    services: ["Brand strategy", "Web design", "Development", "Lead magnet"],
    stack: ["Next.js", "GSAP", "Vercel"],
    summary:
      "A 36-page site built around a single assessment that turns curiosity into a qualified conversation.",
    challenge:
      "Consulting is invisible. RELY360 had deep manufacturing expertise and no way to prove it before a meeting — every lead needed a two-hour call just to establish credibility.",
    approach: [
      {
        title: "Name the outcome, not the method",
        body: "'Unlock hidden profit' replaced a list of methodologies. Buyers don't shop for lean audits; they shop for margin.",
      },
      {
        title: "Build the proof into the site",
        body: "A self-serve maturity assessment scores the visitor's plant across five dimensions and returns a roadmap — so the first call starts with findings, not introductions.",
      },
      {
        title: "Depth for the sceptics",
        body: "36 pages of service and sector detail, so a plant head can go as deep as they need before raising their hand.",
      },
    ],
    metrics: [
      { value: "36", label: "pages shipped" },
      { value: "5-dim", label: "assessment engine" },
      { value: "0→1", label: "inbound channel built" },
    ],
    seed: 3,
    featured: true,
  },
  {
    slug: "b2b-outbound-engine",
    client: "Confidential — industrial equipment",
    title: "400 qualified conversations from a market that ignored ads",
    category: "Outreach",
    industry: "Industrial equipment",
    year: "2026",
    timeline: "90 days",
    services: ["ICP research", "Database building", "Cold email", "WhatsApp outreach"],
    summary:
      "Paid media couldn't reach 200 plant heads. So we built the list and went straight to them.",
    challenge:
      "The client sold a ₹40L machine to a market of roughly 900 buyers in India. Meta and Google had no meaningful audience to target — the buyers simply weren't searching, and impressions were wasted on the wrong people.",
    approach: [
      {
        title: "Define the ICP precisely",
        body: "Plant size, machinery already installed, production volume and geography narrowed 9,000 companies down to 870 real prospects, and named the decision maker at each.",
      },
      {
        title: "Build and clean the database",
        body: "Apollo and Lusha for contact discovery, Fetcher to fill the gaps, then verification to strip out anything that would bounce. Deliverable list: 91% of raw.",
      },
      {
        title: "Warm infrastructure, then sequence",
        body: "Separate sending domains, three weeks of warmup, then a five-touch sequence across email and WhatsApp with a manual follow-up on every positive reply.",
      },
    ],
    metrics: [
      { value: "870", label: "verified decision makers" },
      { value: "6.2%", label: "reply rate" },
      { value: "31", label: "meetings booked in 90 days" },
      { value: "₹1.8Cr", label: "pipeline created" },
    ],
    seed: 11,
    confidential: true,
    featured: true,
  },
  {
    slug: "d2c-performance",
    client: "Confidential — D2C wellness",
    title: "Rebuilding the funnel instead of raising the budget",
    category: "Marketing",
    industry: "D2C / e-commerce",
    year: "2026",
    timeline: "Ongoing retainer",
    services: ["Performance marketing", "Creative production", "CRO", "Analytics"],
    summary:
      "The ads weren't the problem. The landing page was — and we were the ones who could rebuild it.",
    challenge:
      "Spend was climbing, ROAS was falling. The client's previous agency kept iterating creative against a landing page that took 6.4 seconds to load and asked for a phone number above the fold.",
    approach: [
      {
        title: "Diagnose past the ad account",
        body: "Server-side tracking and a clean GA4 setup showed the drop-off was post-click, not pre-click. Ads were doing their job.",
      },
      {
        title: "Rebuild the destination",
        body: "New landing pages shipped in eight days — because the same team that runs the ads writes the code. Load time down to 1.4s, form reduced to email only.",
      },
      {
        title: "Then scale the creative",
        body: "A weekly cadence of UGC and reel-first creative, tested against the new baseline.",
      },
    ],
    metrics: [
      { value: "6.4s → 1.4s", label: "landing page load" },
      { value: "+118%", label: "conversion rate" },
      { value: "4.9×", label: "blended ROAS" },
      { value: "-22%", label: "cost per acquisition" },
    ],
    seed: 19,
    confidential: true,
    featured: true,
  },
  {
    slug: "candron-oneerp",
    client: "CANDRON",
    title: "One ERP spine for engineer-to-order manufacturing",
    category: "Technology",
    industry: "Electrical infrastructure",
    year: "2026",
    timeline: "14 weeks",
    services: ["Product design", "ERP development", "Traceability", "Dashboards"],
    stack: ["Next.js", "Prisma", "PostgreSQL"],
    summary:
      "Every project, part and inspection on a single traceability graph — from tender to handover.",
    challenge:
      "Engineer-to-order work doesn't fit standard ERPs. Each order is a bespoke project, and CANDRON was running it across spreadsheets, WhatsApp groups and memory.",
    approach: [
      {
        title: "Model the project as the spine",
        body: "Not the invoice, not the SKU — the project. Everything else hangs off it, which is how the business actually thinks.",
      },
      {
        title: "Traceability as a graph",
        body: "Every component links back to its batch, test certificate and inspector, so a five-year-old warranty claim resolves in minutes.",
      },
      {
        title: "Multi-tenant from day one",
        body: "Built so additional plants onboard without a fork.",
      },
    ],
    metrics: [
      { value: "1", label: "system replacing 6 tools" },
      { value: "100%", label: "component traceability" },
      { value: "-40%", label: "time to compile handover docs" },
    ],
    seed: 5,
  },
  {
    slug: "pharmabulk",
    client: "PharmaBulk",
    title: "A B2B ordering platform with pricing that thinks",
    category: "Technology",
    industry: "Pharmaceutical distribution",
    year: "2026",
    timeline: "9 weeks",
    services: ["Web development", "Pricing engine", "Catalogue"],
    stack: ["Next.js", "Prisma"],
    summary:
      "355 products, slab-based bulk pricing, and a quote that updates as you type.",
    challenge:
      "Bulk pharma pricing changes by quantity slab, and every enquiry meant a manual quote. Buyers waited a day to learn a price and often didn't wait.",
    approach: [
      {
        title: "Encode the pricing rules",
        body: "The slab logic moved out of a salesperson's head and into a pricing engine that recalculates live as quantities change.",
      },
      {
        title: "Catalogue built for buyers, not browsers",
        body: "Composition-first search, because that's how pharma buyers actually look.",
      },
      {
        title: "Quote to order in one flow",
        body: "The cart is the RFQ. No re-keying.",
      },
    ],
    metrics: [
      { value: "355", label: "products live" },
      { value: "1 day → instant", label: "quote turnaround" },
      { value: "24/7", label: "ordering window" },
    ],
    seed: 13,
  },
];

export const getCaseStudy = (slug: string) =>
  CASE_STUDIES.find((c) => c.slug === slug);

export const CATEGORIES = [
  "All",
  "Marketing",
  "Outreach",
  "Technology",
  "Growth Systems",
] as const;
