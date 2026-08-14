/**
 * Rate card behind the Website / App Cost Estimator.
 * These are the DEFAULTS — the admin panel overrides them at runtime, so
 * pricing can be tuned without a deploy.
 */

export type Option = {
  id: string;
  label: string;
  note?: string;
  /** Flat cost in INR. */
  cost: number;
  /** Working days added to the timeline. */
  days: number;
};

export type RateCard = {
  buildTypes: Option[];
  pages: { perPage: number; daysPerPage: number; included: number };
  features: Option[];
  design: Option[];
  cms: Option[];
  integrations: { perIntegration: number; daysPer: number };
  support: Option[];
  /** Band applied around the point estimate, e.g. 0.15 = ±15%. */
  bandWidth: number;
  rushMultiplier: number;
};

export const DEFAULT_RATE_CARD: RateCard = {
  buildTypes: [
    {
      id: "landing",
      label: "Landing page",
      note: "One high-converting page",
      cost: 35000,
      days: 7,
    },
    {
      id: "business",
      label: "Business website",
      note: "Brochure site, 5–15 pages",
      cost: 90000,
      days: 18,
    },
    {
      id: "premium",
      label: "Premium / animated site",
      note: "Custom motion, the kind you're looking at",
      cost: 225000,
      days: 32,
    },
    {
      id: "ecommerce",
      label: "E-commerce store",
      note: "Shopify or custom, catalogue + checkout",
      cost: 280000,
      days: 38,
    },
    {
      id: "webapp",
      label: "Web application",
      note: "Dashboards, portals, logged-in product",
      cost: 550000,
      days: 60,
    },
    {
      id: "crm",
      label: "Custom CRM",
      note: "Pipeline, roles, reporting",
      cost: 650000,
      days: 70,
    },
    {
      id: "erp",
      label: "Custom ERP",
      note: "Multi-module operations spine",
      cost: 1200000,
      days: 110,
    },
    {
      id: "mobile",
      label: "Mobile app",
      note: "iOS + Android",
      cost: 850000,
      days: 85,
    },
  ],
  pages: { perPage: 9000, daysPerPage: 1.1, included: 5 },
  features: [
    { id: "auth", label: "User accounts & login", cost: 55000, days: 6 },
    { id: "payments", label: "Payments (Razorpay / Stripe)", cost: 45000, days: 5 },
    { id: "booking", label: "Bookings & scheduling", cost: 60000, days: 7 },
    { id: "dashboard", label: "Admin dashboard", cost: 85000, days: 9 },
    { id: "multilingual", label: "Multi-language", cost: 40000, days: 5 },
    { id: "chat", label: "AI chatbot / assistant", cost: 95000, days: 10 },
    { id: "analytics", label: "Analytics & tracking setup", cost: 25000, days: 3 },
    { id: "whatsapp", label: "WhatsApp API integration", cost: 45000, days: 5 },
    { id: "blog", label: "Blog / insights module", cost: 30000, days: 4 },
    { id: "seo", label: "Technical SEO & schema", cost: 28000, days: 3 },
  ],
  design: [
    { id: "template", label: "Template-based", note: "Fast, proven layouts", cost: 0, days: 0 },
    { id: "custom", label: "Custom design", note: "Designed for you from scratch", cost: 75000, days: 12 },
    { id: "signature", label: "Signature motion build", note: "WebGL, GSAP, the full experience", cost: 185000, days: 22 },
  ],
  cms: [
    { id: "none", label: "No CMS", note: "We edit it for you", cost: 0, days: 0 },
    { id: "headless", label: "Headless CMS", note: "You edit everything", cost: 55000, days: 7 },
    { id: "wordpress", label: "WordPress", cost: 25000, days: 4 },
  ],
  integrations: { perIntegration: 38000, daysPer: 4 },
  support: [
    { id: "none", label: "No AMC", cost: 0, days: 0 },
    { id: "basic", label: "Basic AMC", note: "₹6,000/mo — hosting, backups, fixes", cost: 72000, days: 0 },
    { id: "growth", label: "Growth AMC", note: "₹15,000/mo — plus changes & reporting", cost: 180000, days: 0 },
  ],
  bandWidth: 0.15,
  rushMultiplier: 1.35,
};

export type EstimatorInput = {
  buildType: string;
  pages: number;
  features: string[];
  design: string;
  cms: string;
  integrations: number;
  support: string;
  rush: boolean;
};

export type EstimatorResult = {
  low: number;
  high: number;
  point: number;
  days: number;
  weeks: number;
  lines: { label: string; cost: number }[];
};

export function estimate(input: EstimatorInput, card: RateCard): EstimatorResult {
  const lines: { label: string; cost: number }[] = [];
  let cost = 0;
  let days = 0;

  const build = card.buildTypes.find((b) => b.id === input.buildType);
  if (build) {
    cost += build.cost;
    days += build.days;
    lines.push({ label: build.label, cost: build.cost });
  }

  const extraPages = Math.max(0, input.pages - card.pages.included);
  if (extraPages > 0) {
    const c = extraPages * card.pages.perPage;
    cost += c;
    days += extraPages * card.pages.daysPerPage;
    lines.push({ label: `${extraPages} extra page${extraPages > 1 ? "s" : ""}`, cost: c });
  }

  const design = card.design.find((d) => d.id === input.design);
  if (design && design.cost > 0) {
    cost += design.cost;
    days += design.days;
    lines.push({ label: design.label, cost: design.cost });
  }

  const cms = card.cms.find((c) => c.id === input.cms);
  if (cms && cms.cost > 0) {
    cost += cms.cost;
    days += cms.days;
    lines.push({ label: cms.label, cost: cms.cost });
  }

  for (const id of input.features) {
    const f = card.features.find((x) => x.id === id);
    if (!f) continue;
    cost += f.cost;
    days += f.days;
    lines.push({ label: f.label, cost: f.cost });
  }

  if (input.integrations > 0) {
    const c = input.integrations * card.integrations.perIntegration;
    cost += c;
    days += input.integrations * card.integrations.daysPer;
    lines.push({
      label: `${input.integrations} integration${input.integrations > 1 ? "s" : ""}`,
      cost: c,
    });
  }

  const support = card.support.find((s) => s.id === input.support);
  if (support && support.cost > 0) {
    cost += support.cost;
    lines.push({ label: `${support.label} (12 months)`, cost: support.cost });
  }

  if (input.rush) {
    const uplift = cost * (card.rushMultiplier - 1);
    cost += uplift;
    days = days * 0.72;
    lines.push({ label: "Rush delivery", cost: uplift });
  }

  return {
    point: cost,
    low: cost * (1 - card.bandWidth),
    high: cost * (1 + card.bandWidth),
    days: Math.round(days),
    weeks: Math.max(1, Math.round(days / 5)),
    lines,
  };
}
