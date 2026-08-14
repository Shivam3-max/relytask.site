import Hero from "@/components/hero/Hero";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Temporary next-section anchor so scroll behaviour is testable while the
          rest of the home page is built out. */}
      <section
        className="py-24 md:py-36"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <p className="t-eyebrow">The pillars</p>
        <div className="mt-8 grid gap-px bg-line md:grid-cols-3">
          {PILLARS.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              data-cursor="View"
              className="group bg-paper p-7 transition-colors duration-400 hover:bg-paper-2 md:p-9"
            >
              <span className="t-mono text-flame">{p.index}</span>
              <h3 className="t-display mt-4 text-[1.75rem] text-ink md:text-[2.25rem]">
                {p.name}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">
                {p.blurb}
              </p>
              <span className="t-mono mt-6 inline-block text-ink-2">
                Explore →
              </span>
            </Link>
          ))}
        </div>
        <Link
          href={GROWTH_SYSTEM.href}
          className="mt-px flex flex-wrap items-center justify-between gap-4 bg-ink p-7 text-paper md:p-9"
        >
          <div>
            <span className="t-mono text-flame-2">{GROWTH_SYSTEM.index}</span>
            <h3 className="t-display mt-3 text-[1.75rem] md:text-[2.25rem]">
              {GROWTH_SYSTEM.name}
            </h3>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-white/65">
            {GROWTH_SYSTEM.blurb}
          </p>
        </Link>
      </section>
    </>
  );
}
