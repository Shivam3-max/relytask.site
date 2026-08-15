import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonials } from "@/lib/content";
import { SITE, whatsappHref } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about working with RelyTask — in their own words, and where they were willing, on camera.",
  alternates: { canonical: "/testimonials" },
};

export default async function Page() {
  const all = await getTestimonials();
  const videos = all.filter((t) => t.mediaType === "video");
  const featured = all.find((t) => t.featured && t.mediaUrl) ?? videos[0];
  const rest = all.filter((t) => t.id !== featured?.id);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Testimonials</p>
          <h1 className="t-display mt-5 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
            In their words, <span className="grad-flame">not ours.</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-2">
            We would rather show you the client saying it than write a line of
            copy claiming it. Where a client was happy to go on camera, that is
            what you get below.
          </p>
        </Reveal>

        {all.length > 0 && (
          <Reveal className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-8">
            {[
              { v: String(all.length), l: "Clients quoted" },
              { v: String(videos.length), l: "On camera" },
            ].map((s) => (
              <div key={s.l}>
                <p className="t-display text-[clamp(1.75rem,4vw,2.75rem)] text-ink">{s.v}</p>
                <p className="t-mono mt-1 text-ink-3">{s.l}</p>
              </div>
            ))}
          </Reveal>
        )}
      </section>

      {/* ── Featured ──────────────────────────────────────────── */}
      {featured?.mediaUrl && (
        <section className="pb-12 md:pb-16" style={{ paddingInline: "var(--gutter)" }}>
          <Reveal>
            <div className="border border-line">
              <TestimonialCard item={featured} large />
            </div>
          </Reveal>
        </section>
      )}

      {/* ── The rest ──────────────────────────────────────────── */}
      <section className="pb-14 md:pb-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal stagger="[data-t]" className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t) => (
            <div key={t.id} data-t>
              <TestimonialCard item={t} />
            </div>
          ))}
          {rest.length % 3 !== 0 &&
            Array.from({ length: (3 - (rest.length % 3)) % 3 }).map((_, i) => (
              <div key={`fill-${i}`} aria-hidden className="hidden bg-paper lg:block" />
            ))}
        </Reveal>

        <Reveal>
          <p className="t-mono mt-8 text-mist">
            Named references available on request. We will put you on a call with
            a client in your sector rather than send a logo.
          </p>
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
              Want to be one of these?
            </h2>
            <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Tell us what is going wrong. If we can fix it we will say how, and
              if we cannot we will say that instead.
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
