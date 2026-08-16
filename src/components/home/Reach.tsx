import Link from "next/link";
import Reveal from "../Reveal";
import Globe from "./Globe";
import { DESTINATIONS } from "@/lib/globe";

const COUNTRIES = [...new Set(DESTINATIONS.map((d) => d.region))];

const LEVERAGE = [
  {
    k: "Overlap",
    v: "A full working day with EMEA, half of one with the US East Coast. Your morning brief is our afternoon build.",
  },
  {
    k: "Cost base",
    v: "Senior operators at Indian cost of living, not London rent. The saving is arithmetic — it never comes out of the work.",
  },
  {
    k: "Depth",
    v: "Marketing, outreach and engineering under one roof. No three vendors blaming each other on a Thursday.",
  },
];

export default function Reach() {
  return (
    <section id="reach" className="relative overflow-hidden bg-ink text-paper">
      <div
        className="grid items-center gap-12 py-20 md:grid-cols-[1fr_1.05fr] md:gap-8 md:py-32"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {/* ── Copy ─────────────────────────────────────────────── */}
        <div className="relative z-10">
          <Reveal>
            <p className="t-eyebrow text-flame-2">Where we work from</p>
            <h2 className="t-display mt-4 max-w-[16ch] text-[clamp(2rem,5.5vw,3.9rem)]">
              Our location is our{" "}
              <span className="text-flame-2">leverage.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/65">
              We run out of Mohali, India — and ship to founders and operators
              on five continents. That is not a compromise you tolerate in order
              to save money. It is the reason the work can be genuinely good and
              genuinely affordable at once, which almost nowhere else manages.
            </p>
          </Reveal>

          <Reveal stagger="[data-lev]" className="mt-10 flex flex-col gap-px bg-white/10">
            {LEVERAGE.map((l) => (
              <div key={l.k} data-lev className="bg-ink py-5">
                <p className="t-mono text-flame-2">{l.k}</p>
                <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-white/60">
                  {l.v}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact"
                data-cursor="Talk"
                className="t-mono inline-flex items-center gap-3 bg-flame px-7 py-4 text-paper transition-colors duration-400 hover:bg-flame-2"
              >
                Start a conversation →
              </Link>
              <p className="t-mono text-white/40">
                {COUNTRIES.length} countries · 5 continents
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Globe ────────────────────────────────────────────── */}
        <div className="relative">
          <div className="relative aspect-square w-full overflow-hidden md:-mr-[var(--gutter)] md:aspect-[4/5]">
            <div className="absolute inset-0">
              <Globe className="h-full w-full" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 md:mt-0">
            {COUNTRIES.map((c) => (
              <span key={c} className="t-mono text-[0.5625rem] text-white/35">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
