import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PlaceholderArt from "@/components/PlaceholderArt";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { SITE, whatsappHref } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};

  return {
    title: `${c.client} — ${c.title}`,
    description: c.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${c.client} — ${SITE.name}`,
      description: c.summary,
      type: "article",
      url: `${SITE.url}/work/${slug}`,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <nav className="t-mono flex items-center gap-2 text-mist">
            <Link href="/work" className="link-underline hover:text-ink-2">
              Work
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-3">{c.client}</span>
          </nav>

          <p className="t-mono mt-8 text-flame">{c.category}</p>
          <h1 className="t-display mt-4 max-w-[13ch] text-[clamp(2.5rem,9vw,6.5rem)] text-ink">
            {c.client}
          </h1>
          <p className="mt-6 max-w-[42ch] text-[clamp(1.125rem,2.4vw,1.625rem)] font-semibold leading-tight tracking-tight text-ink-2">
            {c.title}
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <PlaceholderArt seed={c.seed} ratio="aspect-[21/9]" label={c.client} />
        </Reveal>

        <Reveal className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-4">
          <div>
            <p className="t-eyebrow">Industry</p>
            <p className="mt-2 text-[0.9375rem] text-ink-2">{c.industry}</p>
          </div>
          <div>
            <p className="t-eyebrow">Timeline</p>
            <p className="mt-2 text-[0.9375rem] text-ink-2">{c.timeline}</p>
          </div>
          <div>
            <p className="t-eyebrow">Services</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
              {c.services.join(", ")}
            </p>
          </div>
          <div>
            <p className="t-eyebrow">{c.stack ? "Stack" : "Year"}</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
              {c.stack ? c.stack.join(", ") : c.year}
            </p>
            {c.liveUrl && (
              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-mono mt-3 inline-block text-flame link-underline"
              >
                Visit site ↗
              </a>
            )}
          </div>
        </Reveal>
      </section>

      {/* ── Metrics ───────────────────────────────────────────── */}
      <section
        className="border-y border-line py-12 md:py-16"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal stagger="[data-metric]" className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {c.metrics.map((m) => (
            <div key={m.label} data-metric>
              <p className="t-display text-[clamp(2rem,5.5vw,3.5rem)] text-ink">{m.value}</p>
              <p className="t-mono mt-2 max-w-[12rem] text-ink-3">{m.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Challenge ─────────────────────────────────────────── */}
      <section
        className="grid gap-10 py-14 md:grid-cols-[0.6fr_1.4fr] md:gap-16 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">The challenge</p>
        </Reveal>
        <Reveal>
          <p className="max-w-[58ch] text-[1.125rem] leading-[1.7] text-ink md:text-[1.375rem]">
            {c.challenge}
          </p>
        </Reveal>
      </section>

      {/* ── Approach ──────────────────────────────────────────── */}
      <section className="bg-paper-2 py-14 md:py-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">What we did</p>
          <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            The approach.
          </h2>
        </Reveal>
        <Reveal stagger="[data-step]" className="mt-10 flex flex-col">
          {c.approach.map((a, i) => (
            <div
              key={a.title}
              data-step
              className="grid gap-3 border-t border-line py-7 md:grid-cols-[5rem_1fr_1.4fr] md:gap-8 md:py-9"
            >
              <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.375rem]">
                {a.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-3">{a.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Testimonial ───────────────────────────────────────── */}
      {c.testimonial && (
        <section className="py-14 md:py-20" style={{ paddingInline: "var(--gutter)" }}>
          <Reveal>
            <blockquote className="max-w-[54ch]">
              <p className="t-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.15] text-ink">
                &ldquo;{c.testimonial.quote}&rdquo;
              </p>
              <footer className="t-mono mt-7 text-ink-3">
                {c.testimonial.name} · {c.testimonial.role}
              </footer>
            </blockquote>
          </Reveal>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ paddingInline: "var(--gutter)" }} className="pb-14 md:pb-20">
        <Reveal>
          <div className="flex flex-col gap-8 bg-ink p-9 text-paper md:flex-row md:items-end md:justify-between md:p-14">
            <div>
              <h2 className="t-display max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)]">
                Got a version of this problem?
              </h2>
              <p className="mt-5 max-w-[44ch] text-[1rem] leading-relaxed text-white/65">
                Tell us where it hurts. We will tell you what we would do and
                what it would cost, before you commit to anything.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
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
                className="t-mono text-center text-white/60 link-underline"
              >
                or WhatsApp {SITE.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── More work ─────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">More work</p>
        </Reveal>
        <Reveal stagger="[data-other]" className="mt-6 grid gap-px bg-line md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/work/${o.slug}`}
              data-other
              data-cursor="View"
              className="group bg-paper p-6 transition-colors duration-400 hover:bg-paper-2"
            >
              <span className="t-mono text-flame">{o.category}</span>
              <h3 className="t-display mt-4 text-[1.375rem] text-ink">{o.client}</h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{o.summary}</p>
              <span className="t-mono mt-6 block text-mist group-hover:text-flame">
                Read →
              </span>
            </Link>
          ))}
        </Reveal>
      </section>
    </>
  );
}
