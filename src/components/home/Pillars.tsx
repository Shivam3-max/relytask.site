import Link from "next/link";
import Reveal from "../Reveal";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";

export default function Pillars() {
  return (
    <section
      className="py-20 md:py-32"
      style={{ paddingInline: "var(--gutter)" }}
      id="pillars"
    >
      <Reveal>
        <p className="t-eyebrow">What we do</p>
        <h2 className="t-display mt-3 max-w-[20ch] text-[clamp(2rem,5.5vw,3.75rem)] text-ink">
          Three pillars that only work <span className="grad-flame">together.</span>
        </h2>
      </Reveal>

      <Reveal stagger="[data-pillar]" className="mt-14 grid gap-px bg-line md:mt-16 md:grid-cols-3">
        {PILLARS.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            data-pillar
            data-cursor="View"
            className="group flex flex-col bg-paper p-7 transition-colors duration-400 hover:bg-paper-2 md:p-9"
          >
            <span className="t-mono text-flame">{p.index}</span>
            <h3 className="t-display mt-5 text-[1.75rem] text-ink md:text-[2.25rem]">
              {p.name}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
              {p.headline}
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-3">
              {p.blurb}
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {p.services.slice(0, 5).map((s) => (
                <li
                  key={s.slug}
                  className="t-mono rounded-full border border-line px-2 py-1 text-[0.5625rem] text-ink-3"
                >
                  {s.name}
                </li>
              ))}
              <li className="t-mono px-1 py-1 text-[0.5625rem] text-mist">
                +{p.services.length - 5} more
              </li>
            </ul>
            <span className="t-mono mt-auto pt-7 text-ink-2">Explore →</span>
          </Link>
        ))}
      </Reveal>

      <Reveal>
        <Link
          href={GROWTH_SYSTEM.href}
          data-cursor="View"
          className="mt-px flex flex-wrap items-center justify-between gap-5 bg-ink p-7 text-paper transition-colors duration-400 hover:bg-ink-2 md:p-9"
        >
          <div>
            <span className="t-mono text-flame-2">{GROWTH_SYSTEM.index}</span>
            <h3 className="t-display mt-3 text-[1.75rem] md:text-[2.5rem]">
              {GROWTH_SYSTEM.name}
            </h3>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
            {GROWTH_SYSTEM.blurb} The three pillars stop competing for budget and
            start compounding.
          </p>
          <span className="t-mono text-flame-2">Explore →</span>
        </Link>
      </Reveal>
    </section>
  );
}
