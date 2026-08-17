import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectImage from "@/components/ProjectImage";
import { getCaseStudies } from "@/lib/content";
import { SITE, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "IT Projects",
  description:
    "IT projects delivered by RelyTask — websites and web apps, custom CRM and ERP builds, automation and integrations, with what changed and by how much.",
  alternates: { canonical: "/it-projects" },
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const CASE_STUDIES = await getCaseStudies();
  const [lead, ...rest] = CASE_STUDIES;

  if (!lead) {
    return (
      <>
        <section
          className="pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <Reveal>
            <p className="t-eyebrow">IT projects</p>
            <h1 className="t-display mt-5 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
              Software we built, <span className="grad-flame">and what it changed.</span>
            </h1>
            <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">
              Projects are being added. Check back shortly, or tell us what you
              are looking to build.
            </p>
          </Reveal>
        </section>
        <section
          className="border-t border-line py-14 md:py-20"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <h2 className="t-display max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
                Got a build in mind?
              </h2>
              <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
                Tell us what is actually going wrong. We will tell you what we
                would do about it, and roughly what it costs, before you commit to
                anything.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                data-cursor="Talk"
                className="t-mono inline-flex items-center justify-center gap-3 bg-flame px-8 py-4 text-paper transition-colors duration-400 hover:bg-flame-2"
              >
                Start a project →
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

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">IT projects</p>
          <h1 className="t-display mt-5 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
            Software we built, <span className="grad-flame">and what it changed.</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">
            Every build below lists the problem we were handed, what we shipped,
            and the numbers we can share. Where a client is under NDA we say so
            rather than dressing the work up in vague adjectives.
          </p>
        </Reveal>
      </section>

      {/* ── Lead case ─────────────────────────────────────────── */}
      <section className="pb-12 md:pb-16" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <Link
            href={`/it-projects/${lead.slug}`}
            data-cursor="View"
            className="group grid gap-8 border-t border-line pt-8 md:grid-cols-[1.15fr_1fr] md:gap-12"
          >
            <ProjectImage
              src={lead.imageUrl}
              seed={lead.seed}
              ratio="aspect-[16/10]"
              label={lead.client}
              className="transition-opacity duration-500 group-hover:opacity-90"
            />
            <div className="flex flex-col">
              <div className="t-mono flex flex-wrap items-center gap-x-4 gap-y-2 text-mist">
                <span className="text-flame">{lead.category}</span>
                <span>{lead.industry}</span>
                <span>{lead.year}</span>
              </div>
              <h2 className="t-display mt-5 text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
                {lead.client}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2">
                {lead.title}
              </p>
              <p className="mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-ink-3">
                {lead.summary}
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
                {lead.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="t-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-ink">
                      {m.value}
                    </dd>
                    <p className="t-mono mt-1 max-w-[14rem] text-ink-3">{m.label}</p>
                  </div>
                ))}
              </dl>
              <span className="t-mono mt-auto pt-8 text-ink-2 group-hover:text-flame">
                Read the case →
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ── The rest ──────────────────────────────────────────── */}
      <section className="pb-14 md:pb-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal stagger="[data-case]" className="grid gap-px bg-line md:grid-cols-2">
          {rest.map((c) => (
            <Link
              key={c.slug}
              href={`/it-projects/${c.slug}`}
              data-case
              data-cursor="View"
              className="group flex flex-col bg-paper p-6 transition-colors duration-400 hover:bg-paper-2 md:p-8"
            >
              <ProjectImage src={c.imageUrl} seed={c.seed} ratio="aspect-[16/9]" label={c.client} />
              <div className="t-mono mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-mist">
                <span className="text-flame">{c.category}</span>
                <span>{c.industry}</span>
                {c.confidential && <span>Under NDA</span>}
              </div>
              <h2 className="t-display mt-4 text-[1.5rem] text-ink md:text-[1.875rem]">
                {c.client}
              </h2>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
                {c.summary}
              </p>
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {c.metrics.slice(0, 3).map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd className="t-display text-[1.25rem] text-ink">{m.value}</dd>
                    <p className="t-mono mt-1 max-w-[10rem] text-[0.5625rem] text-ink-3">
                      {m.label}
                    </p>
                  </div>
                ))}
              </dl>
              <span className="t-mono mt-auto pt-7 text-ink-2 group-hover:text-flame">
                Read the case →
              </span>
            </Link>
          ))}
          {CASE_STUDIES.length % 2 === 0 ? null : (
            <div aria-hidden className="hidden bg-paper md:block" />
          )}
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
              Got a build in mind?
            </h2>
            <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Tell us what is actually going wrong. We will tell you what we
              would do about it, and roughly what it costs, before you commit to
              anything.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/contact"
              data-cursor="Talk"
              className="t-mono inline-flex items-center justify-center gap-3 bg-flame px-8 py-4 text-paper transition-colors duration-400 hover:bg-flame-2"
            >
              Start a project →
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
