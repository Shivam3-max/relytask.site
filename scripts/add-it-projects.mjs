/**
 * One-off: inserts the ten client sites shared for the IT-projects showcase
 * into CaseStudy. Safe to re-run — skips anything already present by slug.
 *
 *   node scripts/add-it-projects.mjs
 */
import "dotenv/config";
import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";

function pool() {
  const url = process.env.DATABASE_URL;
  if (url) return mysql.createPool({ uri: url, connectionLimit: 1 });
  return mysql.createPool({
    host: process.env.DATABASE_HOST ?? "127.0.0.1",
    port: Number(process.env.DATABASE_PORT ?? 3306),
    user: process.env.DATABASE_USER ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "relytask_site",
    connectionLimit: 1,
  });
}

const PROJECTS = [
  {
    slug: "candron",
    client: "Candron Energy",
    title: "A specs-first site for a Canadian switchgear manufacturer",
    category: "Technology",
    industry: "Industrial manufacturing",
    year: "2026",
    timeline: "",
    liveUrl: "https://candron-next.vercel.app",
    summary:
      "A corporate site for Candron Energy Inc., a Canadian manufacturer of medium- and low-voltage switchgear, switchboards and control panels, built entirely in-house.",
    challenge:
      "Candron designs, manufactures and tests power distribution equipment for utilities, data centers, oil & gas, mining and 13 other sectors — but the range of products, standards (UL 508A, CSA, IEEE C37, IEC 62271) and a five-stage design-to-commissioning process is a lot to make legible to a buyer who lands on the site cold.",
    services: ["Web design", "Development", "Copywriting"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Lead with proof, not adjectives", body: "The hero states the in-house-built claim and backs it immediately with certifications and the industries served, instead of generic manufacturing copy." },
      { title: "Structure the catalogue by voltage and use case", body: "Products are grouped so utilities, data-center and industrial buyers can each find their relevant switchgear class in a couple of clicks." },
      { title: "Make the five-stage process visible", body: "Design → manufacture → test → commission → deliver is laid out as a single scannable sequence to build confidence before the quote request." },
    ],
    metrics: [],
    seed: 1,
    imageUrl: "/projects/candron.png",
    order: 0,
    confidential: false,
    featured: true,
    published: true,
  },
  {
    slug: "vitreon",
    client: "Vitreon Scientific Glassworks",
    title: "A verification-first catalogue for a laboratory glassware exporter",
    category: "Technology",
    industry: "Scientific & laboratory equipment manufacturing",
    year: "2026",
    timeline: "",
    liveUrl: "https://vitreon.vercel.app",
    summary:
      "A catalogue and trust site for Vitreon, a 1987-founded Class A borosilicate glassware manufacturer in Ambala exporting a 3,200-SKU range to 72 countries.",
    challenge:
      "Vitreon's differentiator is traceability — every Class A instrument ships with a laser-etched serial number tied to a real calibration record — but that only matters if a buyer can actually look the certificate up, alongside 3,200 SKUs across 12 categories and NABL/ISO/CE credentials.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Put the certificate lookup in the hero", body: "\"Verify a certificate\" sits next to \"Browse catalogue\" as an equal call to action, because it's the feature that makes the quality claims checkable." },
      { title: "Build the six utility tools buyers actually need", body: "RFQ builder, tolerance lookup, joint-size finder and compatibility checker turn spec-sheet lookups that used to mean a phone call into self-serve tools." },
      { title: "Keep 3,200 SKUs navigable", body: "Twelve product families with consistent card layouts and filtering keep the catalogue scannable instead of overwhelming." },
    ],
    metrics: [],
    seed: 2,
    imageUrl: "/projects/vitreon.png",
    order: 1,
    confidential: false,
    featured: false,
    published: true,
  },
  {
    slug: "wise369",
    client: "WISE369",
    title: "One site for a six-service integrated property & business firm",
    category: "Technology",
    industry: "Commercial real estate & business services",
    year: "2026",
    timeline: "",
    liveUrl: "https://wise369.vercel.app",
    summary:
      "A site for WISE369 Private Limited, a Chandigarh firm that bundles property & investment, brand tie-ups, architecture, turnkey execution, project management and security/technology into one accountable contract.",
    challenge:
      "\"One contract, one accountable team\" is a hard claim to make credible when the offer spans six genuinely different services across six market segments — banks, corporate offices, retail, showrooms, industrial and mixed-use — without the site itself turning into six disconnected micro-sites.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "One build, one system, six services", body: "A single isometric building visual anchors all six solutions as facets of one offer instead of a tabbed list of unrelated departments." },
      { title: "Show the nine-step methodology", body: "Idea → Analyse → Plan → Design → Budget → Execute → Manage → Deliver → Grow is laid out as a literal process bar, so \"integrated\" has a visible mechanism behind it." },
      { title: "Segment by where they build", body: "Industry-focus sections let a bank or a retail chain see their own use case without wading through construction-industry generalities." },
    ],
    metrics: [],
    seed: 3,
    imageUrl: "/projects/wise369.png",
    order: 2,
    confidential: false,
    featured: true,
    published: true,
  },
  {
    slug: "book-a-plot",
    client: "Book A Plot",
    title: "A deal network, not another listing portal, for Tricity real estate",
    category: "Technology",
    industry: "Real estate investment network",
    year: "2026",
    timeline: "",
    liveUrl: "https://bookaplot.vercel.app",
    summary:
      "A CP- and investor-first deal network for the Chandigarh Tricity region, live under the Mondato brand — exclusive mandates, territory rights and a Give & Ask desk instead of a public listings feed.",
    challenge:
      "The whole premise is that the public listing model is the wrong model — value comes from routing exclusive mandates to channel partners and matching investor requirements privately — so the site had to sell restricted access as the feature, not hide it as a limitation.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Separate the three audiences at the door", body: "Sellers, channel partners and investors get distinct application paths instead of one generic \"contact us,\" since each wants a different commitment." },
      { title: "Make the Tricity map do the selling", body: "An interactive map with growth-corridor overlays and per-zone price bands turns market knowledge into something a visitor can explore, not just read about." },
      { title: "Ship the calculators buyers actually open first", body: "EMI, stamp duty, ROI and rent-vs-buy tools sit next to the deals, so due diligence starts on-site instead of in a spreadsheet." },
    ],
    metrics: [],
    seed: 4,
    imageUrl: "/projects/book-a-plot.png",
    order: 3,
    confidential: false,
    featured: false,
    published: true,
  },
  {
    slug: "disha-clarity",
    client: "Disha Clarity",
    title: "Business frameworks you apply, not just read, in the browser",
    category: "Technology",
    industry: "Business education & tools",
    year: "2026",
    timeline: "",
    liveUrl: "https://dishaclarity.com",
    summary:
      "A business-clarity platform that turns proven frameworks into interactive tools — a five-vital-signs health checkup, 80 guided journeys, 18 calculators and 47 worksheets that save straight into a personal action plan.",
    challenge:
      "Business content sites are usually libraries you read and forget; Disha's premise — \"knowledge is useless until it's applied to yours\" — required the product to actually produce a saved, personal output for every lesson or tool used, entirely client-side with no account required.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Diagnose before prescribing", body: "The health checkup rates a business across five vital signs first, so the 80 guided journeys that follow are ranked by relevance instead of presented as a flat library." },
      { title: "Every tool ends in a saved decision", body: "Calculators and worksheets write into one running action plan in the browser, turning passive reading into a document the user actually keeps." },
      { title: "No cloud, no account, no friction", body: "Everything persists locally, so a founder can start using a framework in the first minute instead of signing up first." },
    ],
    metrics: [],
    seed: 5,
    imageUrl: "/projects/disha-clarity.png",
    order: 4,
    confidential: false,
    featured: false,
    published: true,
  },
  {
    slug: "trend-mein-hai",
    client: "Trend Mein Hai",
    title: "A discovery feed instead of a search box for lifestyle retail",
    category: "Technology",
    industry: "E-commerce — lifestyle & home goods",
    year: "2026",
    timeline: "",
    liveUrl: "https://trendmaihai.vercel.app",
    summary:
      "A shopping site built around browsing, not searching — mood-based collections, creator picks and live social proof for a curated lifestyle and home-goods catalogue priced ₹490–₹22,990.",
    challenge:
      "\"You don't search, you discover\" only works if the browsing surface is actually more compelling than a search bar — the site needed mood-based collections, trending badges and a sense of real-time activity to earn that positioning instead of just asserting it.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Organise by mood, not category", body: "Minimal Desk, Cozy Room, Gaming and Coffee Lover collections let a visitor shop a vibe instead of a taxonomy." },
      { title: "Layer in live social proof", body: "A running ticker of real-time activity — \"Aditi in Pune just grabbed…\" — and countdown-driven limited drops give the feed momentum." },
      { title: "Surface creator curation", body: "Creator-picked bundles sit alongside trending badges, borrowing the logic of social shopping without leaving the site." },
    ],
    metrics: [],
    seed: 6,
    imageUrl: "/projects/trend-mein-hai.png",
    order: 5,
    confidential: false,
    featured: true,
    published: true,
  },
  {
    slug: "paarth",
    client: "Paarth",
    title: "A capability platform for students who want more than a degree",
    category: "Technology",
    industry: "Business & career education",
    year: "2026",
    timeline: "",
    liveUrl: "https://joinpaarth.com",
    summary:
      "A cohort-based learning platform teaching marketing, AI and business leadership as one connected capability system, for students and early-career builders who want a portfolio and a career edge, not just a certificate.",
    challenge:
      "Marketing, AI and leadership are usually taught as three unrelated courses; Paarth's whole premise is that they're one operating advantage, so the site had to make three learning pillars feel like a single system instead of a bundle of electives.",
    services: ["Web design", "Development", "Copywriting"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Open with the tension, not the offer", body: "\"A degree makes you eligible. Capability makes you chosen.\" leads the page — the pitch is a worldview before it's a program." },
      { title: "Give the three pillars equal architecture", body: "Marketing, AI and Business Leadership get identical treatment — same grid, same depth — so the site itself demonstrates the \"connected disciplines\" claim." },
      { title: "Back the claims with structure, not adjectives", body: "50+ named frameworks, 23 study clusters and a named cohort (\"PA-2026-IN-001\") turn \"serious\" from an adjective into something a visitor can count." },
    ],
    metrics: [],
    seed: 7,
    imageUrl: "/projects/paarth.jpg",
    order: 6,
    confidential: false,
    featured: false,
    published: true,
  },
  {
    slug: "helbrede-healthcare",
    client: "Helbrede Healthcare",
    title: "Digitizing the pharma trade counter for bulk B2B ordering",
    category: "Technology",
    industry: "Pharmaceutical distribution",
    year: "2026",
    timeline: "",
    liveUrl: "https://helbrede.vercel.app",
    summary:
      "A B2B ordering platform for Helbrede Healthcare's ~360-SKU range of allopathic, Ayurvedic, nutraceutical and personal-care products, with role-based trade pricing for distributors, stockists, chemists and doctors.",
    challenge:
      "The trade this replaces runs on phone calls, PDF price lists and haggling; the site had to make role-based net rates, GST invoicing and franchise territory rights feel as fast and trustworthy as picking up the phone, for buyers used to doing exactly that.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Price by role, transparently", body: "Distributors, stockists, chemists and doctors each see their own net trade rate on the same catalogue instead of a single public price with hidden discounts." },
      { title: "Show live demand, not a static catalogue", body: "A map of bookings across India and a running order feed signal that the platform is already moving product, which matters for trade buyers evaluating a new channel." },
      { title: "Bundle the trade tools", body: "Margin, GST and ROI calculators plus a business-starter toolkit turn the site into a sales aid a distributor can use, not just an order form." },
    ],
    metrics: [],
    seed: 8,
    imageUrl: "/projects/helbrede-healthcare.png",
    order: 7,
    confidential: false,
    featured: false,
    published: true,
  },
  {
    slug: "zen-g",
    client: "Zen G",
    title: "A contemplative, narrative site for a soul-healing practice",
    category: "Technology",
    industry: "Spiritual healing & wellness",
    year: "2026",
    timeline: "",
    liveUrl: "https://zen-orpin-six.vercel.app",
    summary:
      "A site for Zen-G, Hardeep Kaur's past-life-regression and soul-healing practice, covering seven modalities from inner-child healing to Ho'oponopono with free diagnostic tools and session booking.",
    challenge:
      "Seven distinct healing modalities, delivered by one practitioner, needed to read as \"different doors, one deeper journey\" rather than a disconnected service menu — and the tone had to stay contemplative rather than clinical or salesy.",
    services: ["Web design", "Development", "Copywriting"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Let the visual language carry the mood", body: "A dark, star-field hero with an astrological motif sets the contemplative tone before a single word of copy is read." },
      { title: "Offer free diagnostics as the entry point", body: "A soul oracle, numerology and karmic-pattern tools give a curious visitor something to do immediately, ahead of booking a paid session." },
      { title: "Frame seven modalities as one journey", body: "Past life regression, chakra healing, EFT and the rest are presented as different doors into the same underlying work, not seven separate products." },
    ],
    metrics: [],
    seed: 9,
    imageUrl: "/projects/zen-g.png",
    order: 8,
    confidential: false,
    featured: true,
    published: true,
  },
  {
    slug: "nama-pharma",
    client: "Nama Pharma",
    title: "A premium D2C storefront for Ayurvedic men's wellness",
    category: "Technology",
    industry: "Ayurvedic / D2C wellness",
    year: "2026",
    timeline: "",
    liveUrl: "https://namapharma.in",
    summary:
      "A direct-to-consumer storefront for Nama Pharma's Ayurvedic men's wellness formulations, Goli Bull Night and Majoon Moosli, with COD available pan-India.",
    challenge:
      "Men's wellness in the Ayurvedic category has to balance two things that usually pull against each other — traditional credibility and a premium, modern shelf presence — while keeping the path from landing page to COD checkout as short as possible.",
    services: ["Web design", "Development"],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    approach: [
      { title: "Pair heritage cues with a modern layout", body: "Serif display type and a warm, editorial palette signal \"ancient wisdom\" while the layout itself — cards, ratings, sticky CTAs — reads as a contemporary D2C store." },
      { title: "Lead with trust markers", body: "AYUSH compliance, GMP certification and a 4.8-rating summary sit above the fold, next to the product, not buried in an about page." },
      { title: "Remove friction from checkout", body: "COD availability and free-shipping thresholds are surfaced repeatedly in the announcement bar and product card, since they're the deciding factor for first-time buyers in this category." },
    ],
    metrics: [],
    seed: 10,
    imageUrl: "/projects/nama-pharma.png",
    order: 9,
    confidential: false,
    featured: true,
    published: true,
  },
];

async function main() {
  const db = pool();
  let added = 0;
  let skipped = 0;

  for (const p of PROJECTS) {
    const [existing] = await db.query("SELECT id FROM CaseStudy WHERE slug = ?", [p.slug]);
    if (existing.length) {
      skipped++;
      continue;
    }
    await db.query(
      `INSERT INTO CaseStudy
        (id, slug, client, title, category, industry, year, timeline, liveUrl, summary, challenge, services, stack, approach, metrics, quoteText, quoteName, quoteRole, seed, imageUrl, confidential, featured, published, \`order\`)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        randomUUID(), p.slug, p.client, p.title, p.category, p.industry, p.year, p.timeline,
        p.liveUrl ?? null, p.summary, p.challenge, JSON.stringify(p.services ?? []),
        JSON.stringify(p.stack ?? []), JSON.stringify(p.approach ?? []), JSON.stringify(p.metrics ?? []),
        null, null, null,
        p.seed ?? 1, p.imageUrl ?? null, p.confidential ? 1 : 0, p.featured ? 1 : 0, p.published ? 1 : 0, p.order,
      ],
    );
    added++;
  }

  console.log(`Added ${added} project${added === 1 ? "" : "s"}, skipped ${skipped} already present.`);
  await db.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
