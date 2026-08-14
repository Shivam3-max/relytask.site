export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  pillar: "marketing" | "outreach" | "technology" | "all";
  time: string;
  flagship?: boolean;
};

export const TOOLS: Tool[] = [
  {
    slug: "cost-estimator",
    name: "Website & App Cost Estimator",
    tagline: "What should this actually cost?",
    description:
      "Build your spec — type, pages, features, integrations — and get a real price band and timeline, with the line items shown.",
    pillar: "technology",
    time: "2 min",
    flagship: true,
  },
  {
    slug: "outreach-roi",
    name: "Outreach ROI Calculator",
    tagline: "Is outbound worth it for you?",
    description:
      "Model a cold outbound programme end to end: list size, deliverability, replies, meetings, closes — and the cost per meeting.",
    pillar: "outreach",
    time: "2 min",
    flagship: true,
  },
  {
    slug: "digital-maturity",
    name: "Digital Maturity Score",
    tagline: "Where are you actually losing growth?",
    description:
      "Twenty questions across brand, content, paid, outbound, data and systems. Scored, ranked, with the fix order.",
    pillar: "all",
    time: "4 min",
    flagship: true,
  },
  {
    slug: "roas-calculator",
    name: "ROAS & Ad Budget Calculator",
    tagline: "Break-even before you spend.",
    description:
      "Work out the ROAS you need to be profitable, and what a given budget should return at Indian CPM and CPC rates.",
    pillar: "marketing",
    time: "1 min",
  },
  {
    slug: "automation-roi",
    name: "Automation ROI Calculator",
    tagline: "What are those manual hours costing?",
    description:
      "Hours, headcount and salary band in — annual savings, payback period and the build cost that makes sense out.",
    pillar: "technology",
    time: "1 min",
  },
  {
    slug: "cac-ltv",
    name: "CAC & LTV Calculator",
    tagline: "Can you afford to grow?",
    description:
      "Acquisition cost against lifetime value, with the payback period and the LTV:CAC ratio investors ask about.",
    pillar: "marketing",
    time: "1 min",
  },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
