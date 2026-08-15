import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CurrencySwitch from "@/components/CurrencySwitch";
import { TOOLS } from "@/lib/tools";
import { RATES_UPDATED } from "@/lib/currency";
import { SITE, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Six free calculators: website and app cost estimator, outreach ROI, ROAS and ad budget, automation payback, CAC and LTV, and a 20-question digital maturity score. No signup, no email wall.",
  alternates: { canonical: "/tools" },
};

const PILLAR_LABEL: Record<string, string> = {
  marketing: "Marketing",
  outreach: "Outreach",
  technology: "Technology",
  all: "All three",
};

export default function Page() {
  const flagship = TOOLS.filter((t) => t.flagship);
  const rest = TOOLS.filter((t) => !t.flagship);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Free tools</p>
          <h1 className="t-display mt-5 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
            Do the maths <span className="grad-flame">before you call us.</span>
          </h1>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-2">
            Six calculators built on published 2026 benchmarks and our own rate
            card. No signup, no email wall, no result held hostage — you get the
            number, the working, and the assumptions behind it. Send it to
            yourself only if you want to talk.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
          <div>
            <p className="t-eyebrow">Show every figure in</p>
            <CurrencySwitch className="mt-3" />
          </div>
          <p className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-mist">
            Everything is priced in INR and converted at indicative rates,
            {" "}{RATES_UPDATED}. Useful for comparison, not for invoicing.
          </p>
        </Reveal>
      </section>

      {/* ── Flagship ──────────────────────────────────────────── */}
      <section className="pb-12 md:pb-16" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal stagger="[data-tool]" className="grid gap-px bg-line md:grid-cols-3">
          {flagship.map((t, i) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              data-tool
              data-cursor="Open"
              className="group flex flex-col bg-paper p-7 transition-colors duration-400 hover:bg-paper-2 md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-mono text-mist">{t.time}</span>
              </div>
              <h2 className="t-display mt-6 text-[1.5rem] text-ink md:text-[1.875rem]">
                {t.name}
              </h2>
              <p className="mt-3 text-[1rem] font-medium leading-snug tracking-tight text-flame">
                {t.tagline}
              </p>
              <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-3">
                {t.description}
              </p>
              <span className="t-mono mt-auto pt-8 text-ink-2 group-hover:text-flame">
                Open the tool →
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ── The rest ──────────────────────────────────────────── */}
      <section className="pb-14 md:pb-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">Quick calculators</p>
        </Reveal>
        <Reveal stagger="[data-tool]" className="mt-6 grid gap-px bg-line md:grid-cols-3">
          {rest.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              data-tool
              data-cursor="Open"
              className="group flex flex-col bg-paper p-6 transition-colors duration-400 hover:bg-paper-2"
            >
              <div className="flex items-center justify-between">
                <span className="t-mono text-mist">{PILLAR_LABEL[t.pillar]}</span>
                <span className="t-mono text-mist">{t.time}</span>
              </div>
              <h2 className="mt-5 text-[1.125rem] font-semibold tracking-tight text-ink">
                {t.name}
              </h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-3">{t.description}</p>
              <span className="t-mono mt-auto pt-6 text-mist group-hover:text-flame">Open →</span>
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ── Why free ──────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal className="grid gap-10 md:grid-cols-[0.6fr_1.4fr] md:gap-16">
          <p className="t-eyebrow">Why these are free</p>
          <div className="max-w-[58ch] text-[1.0625rem] leading-[1.75] text-ink-2">
            <p>
              Because the alternative is a discovery call where we spend forty
              minutes establishing numbers you could have worked out in four.
              If the maths says the thing you were considering does not pay
              back, you have saved money and we have saved a call neither of us
              wanted.
            </p>
            <p className="mt-5">
              Every figure is sourced or comes from our own rate card, and the
              assumptions are on the page rather than buried in a footnote. If
              you disagree with one, change it — the numbers move with you.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <h2 className="t-display max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
              Prefer to just ask someone?
            </h2>
            <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Entirely reasonable. Tell us what you are weighing up and we will
              do the arithmetic with you.
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
