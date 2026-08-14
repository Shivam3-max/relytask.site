import Link from "next/link";
import Reveal from "../Reveal";

const STEPS = [
  { n: "01", t: "Define the ICP", d: "Firmographics, geography, buying signals. 9,000 companies become 800 real prospects." },
  { n: "02", t: "Build the database", d: "Apollo, Lusha and Fetcher for discovery — then verification, so it doesn't bounce." },
  { n: "03", t: "Warm the infrastructure", d: "Separate domains, three weeks of warmup. Skip this and you land in spam." },
  { n: "04", t: "Sequence and follow up", d: "Email and WhatsApp, five touches, every positive reply handled by a human." },
  { n: "05", t: "Book the meeting", d: "Straight into your calendar, with the context attached." },
];

export default function OutreachSpotlight() {
  return (
    <section className="bg-ink py-20 text-paper md:py-32">
      <div style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow text-flame-2">Pillar 02 · Outreach</p>
          <h2 className="t-display mt-5 max-w-[22ch] text-[clamp(2rem,6vw,4.5rem)]">
            When ads don&apos;t work, we go find them.
          </h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-white/60">
            Some businesses will never be found by search or served by an
            algorithm. Their buyers are a list of 400 named people. So we build
            that list, verify it, and get you into the room — the service almost
            nobody else in the region actually runs properly.
          </p>
        </Reveal>

        <Reveal stagger="[data-step]" className="mt-14 grid gap-px bg-white/12 md:grid-cols-5">
          {STEPS.map((s) => (
            <div key={s.n} data-step className="bg-ink p-5 md:p-6">
              <span className="t-mono text-flame-2">{s.n}</span>
              <h3 className="mt-3 text-[1rem] font-medium">{s.t}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/50">
                {s.d}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/services/outreach"
            className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-[0.875rem] font-medium text-ink transition-colors duration-300 hover:bg-flame hover:text-paper"
          >
            How outreach works <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/tools/outreach-roi"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[0.875rem] font-medium text-paper transition-colors duration-300 hover:border-paper"
          >
            Model the numbers
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
