import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";
import { SITE, whatsappHref } from "@/lib/site";
import { SERVICE_DETAILS, getPillar } from "@/lib/service-detail";

type Params = { pillar: string };

/** How each pillar earns its place, in the client's language. */
const PILLAR_CASE: Record<
  string,
  { promise: string; body: string; proof: { label: string; value: string }[] }
> = {
  marketing: {
    promise: "Attention is the cheapest it will ever be today.",
    body:
      "Every year the auction gets more expensive and organic reach gets thinner. The brands that win are the ones building an audience they own while everyone else rents one — and producing enough genuinely new creative to keep the paid channels honest.",
    proof: [
      { label: "Zero-click Google searches", value: "68%" },
      { label: "Meta CPM rise in India, YoY", value: "+23%" },
      { label: "Average Instagram reach", value: "~3.5% of followers" },
    ],
  },
  outreach: {
    promise: "The list is the campaign.",
    body:
      "Some buyers are not searching, not scrolling, and not clicking. They are reachable — by email, by WhatsApp, by LinkedIn — but only if the list is built properly, the infrastructure is warmed, and someone answers the reply within the hour.",
    proof: [
      { label: "Average cold email reply rate", value: "3.4%" },
      { label: "Annual B2B data decay", value: "22.5%" },
      { label: "Faster lead response advantage", value: "21x" },
    ],
  },
  technology: {
    promise: "Demand you can't hold onto is demand you paid for twice.",
    body:
      "Leads arrive and land in a spreadsheet. Orders get typed into four systems. The dashboard nobody trusts gets rebuilt every quarter. The software layer is what turns a marketing result into an operating business.",
    proof: [
      { label: "CRM projects missing objectives", value: "~55%" },
      { label: "Rep week lost to manual work", value: "8–13 hrs" },
      { label: "Conversions lost per 100ms", value: "~1%" },
    ],
  },
};

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar } = await params;
  const p = getPillar(pillar);
  if (!p) return {};

  return {
    title: `${p.name} — ${p.headline}`,
    description: p.blurb,
    alternates: { canonical: p.href },
    openGraph: {
      title: `${p.name} — ${SITE.name}`,
      description: p.blurb,
      url: `${SITE.url}${p.href}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { pillar } = await params;
  const p = getPillar(pillar);
  if (!p) notFound();

  const story = PILLAR_CASE[p.id];
  const others = PILLARS.filter((x) => x.id !== p.id);

  const detailFor = (slug: string) =>
    SERVICE_DETAILS.find((d) => d.pillar === p.id && d.slug === slug);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-14 md:pb-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <nav className="t-mono flex items-center gap-2 text-mist">
            <Link href="/services" className="link-underline hover:text-ink-2">
              Services
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-3">{p.name}</span>
          </nav>

          <p className="t-mono mt-8 text-flame">Pillar {p.index}</p>
          <h1 className="t-display mt-4 max-w-[14ch] text-[clamp(2.75rem,10vw,7.5rem)] text-ink">
            {p.name}
          </h1>
          <p className="mt-7 max-w-[34ch] text-[clamp(1.25rem,3vw,2rem)] font-semibold leading-tight tracking-tight text-ink-2">
            {p.headline}
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <div>
            <p className="text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.25rem]">
              {story.promise}
            </p>
            <p className="mt-5 text-[1rem] leading-[1.75] text-ink-3 md:text-[1.0625rem]">
              {story.body}
            </p>
          </div>
          <dl className="flex flex-col">
            {story.proof.map((s) => (
              <div key={s.label} className="border-t border-line py-4 first:border-t-0 first:pt-0">
                <dt className="t-mono text-ink-3">{s.label}</dt>
                <dd className="t-display mt-1 text-[clamp(1.5rem,3.5vw,2.25rem)] text-ink">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ── Services ──────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">{p.services.length} services</p>
          <h2 className="t-display mt-3 max-w-[20ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            Every part of it, <span className="grad-flame">one team.</span>
          </h2>
          <p className="mt-5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-3">
            {p.blurb} Take one, take the lot — each page below explains what
            actually happens, what it costs you not to fix, and what you end up
            holding.
          </p>
        </Reveal>

        <Reveal stagger="[data-svc]" className="mt-12 grid gap-px bg-line md:grid-cols-2">
          {p.services.map((s, i) => {
            const d = detailFor(s.slug);
            return (
              <Link
                key={s.slug}
                href={`${p.href}/${s.slug}`}
                data-svc
                data-cursor="Read"
                className="group flex flex-col bg-paper p-7 transition-colors duration-400 hover:bg-paper-2 md:p-9"
              >
                <span className="t-mono text-mist group-hover:text-flame">
                  {p.index}.{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-display mt-5 text-[1.5rem] text-ink md:text-[1.875rem]">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-3">
                  {d?.summary ?? s.short}
                </p>
                <span className="t-mono mt-auto pt-8 text-ink-2 group-hover:text-flame">
                  Read the page →
                </span>
              </Link>
            );
          })}
          {/* Keeps the hairline grid square when the count is odd. */}
          {p.services.length % 2 === 1 && (
            <div aria-hidden className="hidden bg-paper md:block" />
          )}
        </Reveal>
      </section>

      {/* ── Growth systems ────────────────────────────────────── */}
      <section style={{ paddingInline: "var(--gutter)" }} className="pb-14 md:pb-20">
        <Reveal>
          <Link
            href={GROWTH_SYSTEM.href}
            data-cursor="View"
            className="flex flex-wrap items-center justify-between gap-6 bg-ink p-8 text-paper transition-colors duration-400 hover:bg-ink-2 md:p-12"
          >
            <div>
              <span className="t-mono text-flame-2">{GROWTH_SYSTEM.index}</span>
              <h2 className="t-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)]">
                {GROWTH_SYSTEM.name}
              </h2>
            </div>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-white/60">
              {p.name} on its own works. {p.name} plus{" "}
              {others.map((o) => o.name.toLowerCase()).join(" and ")} compounds —
              one retainer, one dashboard, no vendors blaming each other.
            </p>
            <span className="t-mono text-flame-2">Explore →</span>
          </Link>
        </Reveal>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="t-display max-w-[16ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
              Not sure which of these you need?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-3">
              That is a normal place to start. Tell us what is actually going
              wrong and we will tell you which one of these fixes it — including
              when the answer is none of them.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              data-cursor="Talk"
              className="t-mono inline-flex items-center justify-center gap-3 bg-flame px-8 py-4 text-paper transition-colors duration-400 hover:bg-flame-2"
            >
              Start a conversation →
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-center text-ink-3 link-underline"
            >
              or WhatsApp {SITE.phone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
