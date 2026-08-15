import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { SITE, whatsappHref } from "@/lib/site";
import {
  SERVICE_DETAILS,
  SERVICE_ROUTES,
  SOURCES,
  getDetail,
  getPillar,
} from "@/lib/service-detail";

type Params = { pillar: string; service: string };

export function generateStaticParams() {
  return SERVICE_ROUTES;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar, service } = await params;
  const detail = getDetail(pillar, service);
  if (!detail) return {};

  const p = getPillar(pillar);
  return {
    title: detail.title,
    description: detail.summary,
    alternates: { canonical: `/services/${pillar}/${service}` },
    openGraph: {
      title: `${detail.title} — ${SITE.name}`,
      description: detail.summary,
      type: "article",
      url: `${SITE.url}/services/${pillar}/${service}`,
    },
    keywords: [detail.title, p?.name ?? "", "Mohali", "India", SITE.name],
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { pillar, service } = await params;
  const detail = getDetail(pillar, service);
  const p = getPillar(pillar);
  if (!detail || !p) notFound();

  const related = detail.related
    .map((slug) => SERVICE_DETAILS.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const siblings = p.services.filter((s) => s.slug !== detail.slug);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: detail.title,
    description: detail.summary,
    serviceType: detail.title,
    provider: {
      "@type": "Organization",
      name: SITE.legalName,
      url: SITE.url,
      telephone: SITE.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        addressCountry: "IN",
      },
    },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-10 md:pt-14 pb-16 md:pb-24"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <nav className="t-mono flex flex-wrap items-center gap-2 text-mist">
            <Link href="/services" className="link-underline hover:text-ink-2">
              Services
            </Link>
            <span aria-hidden>/</span>
            <Link href={p.href} className="link-underline hover:text-ink-2">
              {p.name}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-3">{detail.title}</span>
          </nav>

          <h1 className="t-display mt-7 max-w-[16ch] text-[clamp(2.4rem,7vw,5.5rem)] text-ink">
            {detail.title}
          </h1>
          <p className="mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-2">
            {detail.summary}
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <p className="text-[1.0625rem] leading-[1.75] text-ink-3 md:text-[1.125rem]">
            {detail.lede}
          </p>
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/contact"
              data-cursor="Talk"
              className="t-mono inline-flex items-center gap-3 bg-ink px-7 py-4 text-paper transition-colors duration-400 hover:bg-flame"
            >
              Start a conversation →
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="t-mono text-ink-3 link-underline"
            >
              or message us on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── The problem ───────────────────────────────────────── */}
      <section
        className="border-t border-line py-16 md:py-24"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">The problem</p>
          <h2 className="t-display mt-3 max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            What this normally looks like <span className="grad-flame">before we start.</span>
          </h2>
        </Reveal>

        <Reveal stagger="[data-pain]" className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {detail.pain.map((item, i) => (
            <article key={item.title} data-pain className="flex flex-col bg-paper p-7 md:p-8">
              <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[1.25rem] font-semibold leading-snug tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">
                {item.body}
              </p>
              {item.stat && (
                <div className="mt-auto pt-7">
                  <p className="t-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink">
                    {item.stat.value}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">
                    {item.stat.note}
                    {SOURCES[item.stat.source] && (
                      <a
                        href={SOURCES[item.stat.source].url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="t-mono ml-2 align-middle text-[0.5rem] text-mist hover:text-flame"
                      >
                        source ↗
                      </a>
                    )}
                  </p>
                </div>
              )}
            </article>
          ))}
        </Reveal>
      </section>

      {/* ── What we do ────────────────────────────────────────── */}
      <section className="bg-paper-2 py-16 md:py-24" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">What we do</p>
          <h2 className="t-display mt-3 max-w-[16ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            The actual work.
          </h2>
        </Reveal>

        <Reveal stagger="[data-step]" className="mt-12 flex flex-col">
          {detail.approach.map((step, i) => (
            <div
              key={step.title}
              data-step
              className="grid gap-3 border-t border-line py-7 md:grid-cols-[5rem_1fr_1.4fr] md:gap-8 md:py-9"
            >
              <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.375rem]">
                {step.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-3">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Deliverables + signals ────────────────────────────── */}
      <section
        className="grid gap-14 py-16 md:grid-cols-[1.25fr_1fr] md:gap-20 md:py-24"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">What you get</p>
          <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,2.75rem)] text-ink">
            Deliverables.
          </h2>
          <ul className="mt-8 flex flex-col">
            {detail.deliverables.map((d) => (
              <li
                key={d}
                className="flex gap-4 border-t border-line py-4 text-[0.9375rem] leading-relaxed text-ink-2"
              >
                <span className="t-mono mt-1 shrink-0 text-flame">✦</span>
                {d}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <p className="t-eyebrow">What good looks like</p>
          <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,2.75rem)] text-ink">
            Benchmarks.
          </h2>
          <dl className="mt-8 flex flex-col">
            {detail.signals.map((s) => (
              <div key={s.label} className="border-t border-line py-5">
                <dt className="t-mono text-ink-3">{s.label}</dt>
                <dd className="mt-2 text-[1.0625rem] font-semibold tracking-tight text-ink">
                  {s.value}
                  {s.source && SOURCES[s.source] && (
                    <a
                      href={SOURCES[s.source].url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="t-mono ml-2 align-middle text-[0.5rem] font-normal text-mist hover:text-flame"
                    >
                      ↗
                    </a>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ── How we're different ───────────────────────────────── */}
      <section className="bg-ink py-16 text-paper md:py-24" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow text-flame-2">How we&rsquo;re different</p>
          <h2 className="t-display mt-3 max-w-[20ch] text-[clamp(1.75rem,4.5vw,3rem)]">
            Why this is worth handing to us.
          </h2>
        </Reveal>

        <Reveal stagger="[data-diff]" className="mt-12 grid gap-px bg-white/10 md:grid-cols-3">
          {detail.different.map((d) => (
            <article key={d.title} data-diff className="bg-ink p-7 md:p-8">
              <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-tight text-flame-2">
                {d.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{d.body}</p>
            </article>
          ))}
        </Reveal>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">Questions we get</p>
          <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            Straight answers.
          </h2>
        </Reveal>

        <Reveal stagger="[data-faq]" className="mt-10 flex flex-col">
          {detail.faqs.map((f) => (
            <details
              key={f.q}
              data-faq
              className="group border-t border-line py-6 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8 text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.25rem]">
                {f.q}
                <span className="t-mono mt-1 shrink-0 text-flame transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-3">
                {f.a}
              </p>
            </details>
          ))}
        </Reveal>

        {detail.sources.length > 0 && (
          <Reveal>
            <div className="mt-14 border-t border-line pt-8">
              <p className="t-eyebrow">Where the numbers come from</p>
              <ul className="mt-4 flex flex-col gap-2">
                {detail.sources.map((id) =>
                  SOURCES[id] ? (
                    <li key={id}>
                      <a
                        href={SOURCES[id].url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-[0.8125rem] leading-relaxed text-mist link-underline hover:text-ink-3"
                      >
                        {SOURCES[id].label} ↗
                      </a>
                    </li>
                  ) : null,
                )}
              </ul>
              <p className="mt-5 max-w-[62ch] text-[0.75rem] leading-relaxed text-mist">
                Figures are industry benchmarks published by third parties, cited so you
                can check them. They describe the market, not a promise about your
                results.
              </p>
            </div>
          </Reveal>
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ paddingInline: "var(--gutter)" }} className="pb-16 md:pb-24">
        <Reveal>
          <div className="flex flex-col gap-8 bg-flame p-9 text-paper md:flex-row md:items-end md:justify-between md:p-14">
            <div>
              <h2 className="t-display max-w-[18ch] text-[clamp(1.75rem,4.5vw,3.25rem)]">
                {detail.cta.headline}
              </h2>
              <p className="mt-5 max-w-[46ch] text-[1rem] leading-relaxed text-white/85">
                {detail.cta.body}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/contact"
                data-cursor="Talk"
                className="t-mono inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-paper transition-colors duration-400 hover:bg-ink-2"
              >
                Get in touch →
              </Link>
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="t-mono text-center text-white/80 link-underline"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Related + siblings ────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Usually paired with</p>
        </Reveal>
        <Reveal stagger="[data-rel]" className="mt-6 grid gap-px bg-line md:grid-cols-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/services/${r.pillar}/${r.slug}`}
              data-rel
              data-cursor="View"
              className="group bg-paper p-6 transition-colors duration-400 hover:bg-paper-2"
            >
              <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink">
                {r.title}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">{r.summary}</p>
              <span className="t-mono mt-5 block text-mist group-hover:text-flame">Read →</span>
            </Link>
          ))}
        </Reveal>

        <Reveal>
          <div className="mt-12 border-t border-line pt-8">
            <p className="t-eyebrow">More in {p.name}</p>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${p.href}/${s.slug}`}
                    className="t-mono inline-block rounded-full border border-line px-3 py-2 text-[0.5625rem] text-ink-3 transition-colors duration-300 hover:border-flame hover:text-flame"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
