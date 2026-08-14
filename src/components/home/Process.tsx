import Reveal from "../Reveal";

const STEPS = [
  {
    n: "01",
    t: "Discover",
    d: "We audit what exists — traffic, funnel, systems, sales process. Usually the problem isn't where you think it is.",
  },
  {
    n: "02",
    t: "Define",
    d: "One goal, one set of numbers, one plan. Written down, agreed, and short enough to remember.",
  },
  {
    n: "03",
    t: "Build",
    d: "Creative, campaigns, lists and software — built in parallel by one team instead of three vendors.",
  },
  {
    n: "04",
    t: "Distribute",
    d: "Paid, organic and outbound go live together, so we can see which channel actually carries your market.",
  },
  {
    n: "05",
    t: "Optimise",
    d: "Weekly on the numbers, monthly on the strategy. What works gets more budget; what doesn't gets killed.",
  },
];

export default function Process() {
  return (
    <section className="py-20 md:py-32" style={{ paddingInline: "var(--gutter)" }}>
      <Reveal>
        <p className="t-eyebrow">How we work</p>
        <h2 className="t-display mt-3 max-w-[16ch] text-[clamp(2rem,5.5vw,3.75rem)] text-ink">
          Five steps. No mystery.
        </h2>
      </Reveal>

      <Reveal stagger="[data-row]" className="mt-12 border-t border-line">
        {STEPS.map((s) => (
          <div
            key={s.n}
            data-row
            className="group grid gap-3 border-b border-line py-7 transition-colors duration-400 hover:bg-paper-2 md:grid-cols-[5rem_14rem_1fr] md:items-baseline md:gap-8"
          >
            <span className="t-mono text-flame">{s.n}</span>
            <h3 className="t-display text-[1.5rem] text-ink md:text-[2rem]">
              {s.t}
            </h3>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-3">
              {s.d}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
