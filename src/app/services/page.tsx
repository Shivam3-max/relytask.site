import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PILLARS, GROWTH_SYSTEM, PROCESS } from "@/lib/services";
import { SITE, whatsappHref } from "@/lib/site";
import { SERVICE_DETAILS } from "@/lib/service-detail";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Twenty-eight services across marketing, outreach and technology — content and paid media, cold email and WhatsApp outreach, CRM, ERP, apps and automation. One team in Mohali, delivering worldwide.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  const total = PILLARS.reduce((n, p) => n + p.services.length, 0);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-14 md:pb-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">What we do</p>
          <h1 className="t-display mt-5 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
            {total} services. <span className="grad-flame">One system.</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">
            Three pillars that only work properly together: marketing to create
            demand, outreach to go and find it, and technology to make sure none
            of it leaks. Every service below has its own page — what breaks, what
            we do, and what you end up holding.
          </p>
        </Reveal>
      </section>

      {/* ── Pillars ───────────────────────────────────────────── */}
      {PILLARS.map((p) => (
        <section
          key={p.id}
          id={p.id}
          className="border-t border-line py-14 md:py-20"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="t-mono text-flame">{p.index}</span>
              <h2 className="t-display mt-4 text-[clamp(2rem,6vw,4rem)] text-ink">
                {p.name}
              </h2>
              <p className="mt-4 max-w-[44ch] text-[1rem] leading-relaxed text-ink-2">
                {p.headline} {p.blurb}
              </p>
            </div>
            <Link
              href={p.href}
              data-cursor="View"
              className="t-mono inline-flex items-center gap-3 border border-line px-6 py-3 text-ink-2 transition-colors duration-400 hover:border-flame hover:text-flame"
            >
              All of {p.name.toLowerCase()} →
            </Link>
          </Reveal>

          <Reveal stagger="[data-svc]" className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {p.services.map((s) => {
              const d = SERVICE_DETAILS.find(
                (x) => x.pillar === p.id && x.slug === s.slug,
              );
              return (
                <Link
                  key={s.slug}
                  href={`${p.href}/${s.slug}`}
                  data-svc
                  data-cursor="Read"
                  className="group flex flex-col bg-paper p-6 transition-colors duration-400 hover:bg-paper-2"
                >
                  <h3 className="text-[1.125rem] font-semibold leading-snug tracking-tight text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-3">
                    {d?.summary ?? s.short}
                  </p>
                  <span className="t-mono mt-auto pt-6 text-mist group-hover:text-flame">
                    Read →
                  </span>
                </Link>
              );
            })}
            {/* Fillers keep the hairline grid square on the last row. */}
            {Array.from({ length: (3 - (p.services.length % 3)) % 3 }).map((_, i) => (
              <div key={`fill-${i}`} aria-hidden className="hidden bg-paper lg:block" />
            ))}
            {p.services.length % 2 === 1 && (
              <div aria-hidden className="hidden bg-paper sm:block lg:hidden" />
            )}
          </Reveal>
        </section>
      ))}

      {/* ── Process ───────────────────────────────────────────── */}
      <section
        className="border-t border-line bg-paper-2 py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">However you start</p>
          <h2 className="t-display mt-3 max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            The same five steps.
          </h2>
        </Reveal>
        <Reveal stagger="[data-step]" className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((s) => (
            <div key={s.n} data-step className="bg-paper-2 p-6">
              <span className="t-mono text-flame">{s.n}</span>
              <p className="t-display mt-4 text-[1.375rem] text-ink">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Growth systems ────────────────────────────────────── */}
      <section style={{ paddingInline: "var(--gutter)" }} className="py-14 md:py-20">
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
              {GROWTH_SYSTEM.blurb} The three pillars stop competing for budget
              and start compounding.
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
            <h2 className="t-display max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
              Start with the problem, not the service.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Tell us what is actually going wrong. We will point at the one or
              two things worth fixing first — and say so plainly if that is
              nothing we sell.
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
