import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import CurrencySwitch from "@/components/CurrencySwitch";
import CostEstimator from "@/components/tools/CostEstimator";
import OutreachROI from "@/components/tools/OutreachROI";
import RoasCalculator from "@/components/tools/RoasCalculator";
import AutomationROI from "@/components/tools/AutomationROI";
import CacLtv from "@/components/tools/CacLtv";
import DigitalMaturity from "@/components/tools/DigitalMaturity";
import { TOOLS, getTool } from "@/lib/tools";
import { RATES_UPDATED } from "@/lib/currency";
import { SITE } from "@/lib/site";

type Params = { slug: string };

/** Extra editorial per tool — what it answers and how to read the output. */
const NOTES: Record<
  string,
  { intro: string; reads: string[]; related: { label: string; href: string }[] }
> = {
  "cost-estimator": {
    intro:
      "Software quotes vary by a factor of ten for the same brief, which makes them impossible to compare. This runs our actual rate card so you can see what drives the number — and which choices are quietly expensive.",
    reads: [
      "The band matters more than the mid-point. Scope moves; a single figure pretends it doesn't.",
      "Design approach and feature count move the number more than page count does.",
      "Rush delivery buys about a 28% shorter timeline for a 35% higher cost — worth it occasionally, never routinely.",
    ],
    related: [
      { label: "Websites & Web Apps", href: "/services/technology/websites" },
      { label: "Mobile Apps", href: "/services/technology/mobile-apps" },
      { label: "Custom ERP", href: "/services/technology/erp" },
    ],
  },
  "outreach-roi": {
    intro:
      "Outbound either works arithmetically or it does not, and you can tell before spending anything. This models the whole funnel on published 2026 medians rather than the numbers in a pitch deck.",
    reads: [
      "If only the Strong column works for you, the programme is too tight — walk away or raise deal value first.",
      "Cost per meeting is the number to compare against hiring an SDR.",
      "Reply rate is the assumption people inflate most. The 2026 median is around 3.4%.",
    ],
    related: [
      { label: "Cold Email Campaigns", href: "/services/outreach/cold-email" },
      { label: "Meeting Booking", href: "/services/outreach/meeting-booking" },
      { label: "Database Building", href: "/services/outreach/database-building" },
    ],
  },
  "roas-calculator": {
    intro:
      "Almost every argument about ad performance is really an argument about margin. Work out the ROAS you need before you judge the ROAS you got.",
    reads: [
      "Break-even ROAS is 1 ÷ gross margin. At 40% margin you need 2.5x just to stand still.",
      "Landing page conversion rate is usually the cheapest lever on this page, and the one nobody touches.",
      "Platform-reported ROAS runs higher than this because it counts returning customers and view-through conversions.",
    ],
    related: [
      { label: "Performance Marketing", href: "/services/marketing/performance-marketing" },
      { label: "Conversion Optimisation", href: "/services/marketing/cro" },
      { label: "Websites & Web Apps", href: "/services/technology/websites" },
    ],
  },
  "automation-roi": {
    intro:
      "Automation is easy to justify emotionally and easy to get wrong financially. This puts a payback period on a specific task so you can rank it against everything else you could build.",
    reads: [
      "Under 12 months payback is comfortable. Over 24, automate something else first.",
      "Saved hours only count if they get reassigned — idle time is not a saving.",
      "The automatable share is the honest variable. Rule-based work sits high; anything needing judgement sits low.",
    ],
    related: [
      { label: "Workflow Automation", href: "/services/technology/automation" },
      { label: "Integrations", href: "/services/technology/integrations" },
      { label: "Custom CRM", href: "/services/technology/crm" },
    ],
  },
  "cac-ltv": {
    intro:
      "The two numbers that decide whether growth is worth funding. Most businesses know one of them and guess the other, which is how spend gets scaled into a loss.",
    reads: [
      "LTV here is gross profit, not revenue. Revenue-based LTV flatters everyone.",
      "3:1 is the healthy benchmark. Above 5:1 you are probably underinvesting, not winning.",
      "CAC payback under 12 months is what keeps cash flow survivable.",
    ],
    related: [
      { label: "Performance Marketing", href: "/services/marketing/performance-marketing" },
      { label: "Conversion Optimisation", href: "/services/marketing/cro" },
      { label: "Pipeline Reporting", href: "/services/outreach/pipeline-reporting" },
    ],
  },
  "digital-maturity": {
    intro:
      "Twenty questions across six areas. The total is not the point — the ranking is, because the weakest area is almost always what is capping the ones above it.",
    reads: [
      "Answer as things actually are, not as you intend them to be next quarter.",
      "Read the bottom two areas first. That is where the next rupee should go.",
      "A high score in one area and a low score in another is normal, and is exactly the imbalance that makes results feel inconsistent.",
    ],
    related: [
      { label: "Growth Systems", href: "/services/growth-systems" },
      { label: "All services", href: "/services" },
    ],
  },
};

function ToolBody({ slug }: { slug: string }) {
  switch (slug) {
    case "cost-estimator":
      return <CostEstimator />;
    case "outreach-roi":
      return <OutreachROI />;
    case "roas-calculator":
      return <RoasCalculator />;
    case "automation-roi":
      return <AutomationROI />;
    case "cac-ltv":
      return <CacLtv />;
    case "digital-maturity":
      return <DigitalMaturity />;
    default:
      return null;
  }
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return {};

  return {
    title: t.name,
    description: t.description,
    alternates: { canonical: `/tools/${slug}` },
    openGraph: {
      title: `${t.name} — ${SITE.name}`,
      description: t.description,
      url: `${SITE.url}/tools/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  const notes = NOTES[slug];
  if (!tool || !notes) notFound();

  const others = TOOLS.filter((t) => t.slug !== slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description: tool.description,
    url: `${SITE.url}/tools/${slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-10 md:pb-14"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <nav className="t-mono flex items-center gap-2 text-mist">
            <Link href="/tools" className="link-underline hover:text-ink-2">
              Tools
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-3">{tool.name}</span>
          </nav>

          <h1 className="t-display mt-7 max-w-[16ch] text-[clamp(2.25rem,6.5vw,4.75rem)] text-ink">
            {tool.name}
          </h1>
          <p className="mt-5 max-w-[40ch] text-[clamp(1.125rem,2.4vw,1.5rem)] font-semibold leading-tight tracking-tight text-flame">
            {tool.tagline}
          </p>
        </Reveal>

        <Reveal className="mt-9 grid gap-8 border-t border-line pt-8 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <p className="max-w-[58ch] text-[1rem] leading-[1.7] text-ink-3 md:text-[1.0625rem]">
            {notes.intro}
          </p>
          <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
            <div>
              <p className="t-eyebrow">Takes</p>
              <p className="mt-1.5 text-[0.9375rem] text-ink-2">{tool.time}</p>
            </div>
            {slug !== "digital-maturity" && (
              <div>
                <p className="t-eyebrow">Currency</p>
                <CurrencySwitch className="mt-2" />
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── The tool ──────────────────────────────────────────── */}
      <section className="pb-14 md:pb-20" style={{ paddingInline: "var(--gutter)" }}>
        <ToolBody slug={slug} />
      </section>

      {/* ── How to read it ────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal className="grid gap-10 md:grid-cols-[0.6fr_1.4fr] md:gap-16">
          <div>
            <p className="t-eyebrow">How to read it</p>
            {slug !== "digital-maturity" && (
              <p className="mt-4 max-w-[28ch] text-[0.8125rem] leading-relaxed text-mist">
                Figures are computed in INR and converted at indicative rates,
                {" "}{RATES_UPDATED}. Good for comparison, not for invoicing.
              </p>
            )}
          </div>
          <ul className="flex flex-col">
            {notes.reads.map((r, i) => (
              <li
                key={r}
                className="grid gap-4 border-t border-line py-5 md:grid-cols-[3rem_1fr]"
              >
                <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
                <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-2">{r}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── Related ───────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">If this is the problem, this is the work</p>
        </Reveal>
        <Reveal stagger="[data-rel]" className="mt-6 flex flex-wrap gap-2">
          {notes.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              data-rel
              data-cursor="Read"
              className="t-mono border border-line px-5 py-3 text-ink-2 transition-colors duration-300 hover:border-flame hover:text-flame"
            >
              {r.label} →
            </Link>
          ))}
        </Reveal>

        <Reveal>
          <div className="mt-12 border-t border-line pt-8">
            <p className="t-eyebrow">Other tools</p>
            <div className="mt-5 grid gap-px bg-line md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/tools/${o.slug}`}
                  data-cursor="Open"
                  className="group bg-paper p-6 transition-colors duration-400 hover:bg-paper-2"
                >
                  <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink">
                    {o.name}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">{o.tagline}</p>
                  <span className="t-mono mt-5 block text-mist group-hover:text-flame">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
