import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PILLARS, PROCESS } from "@/lib/services";
import { SITE, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Growth Systems",
  description:
    "All three pillars on one retainer and one dashboard. Marketing creates demand, outreach goes and finds it, technology makes sure none of it leaks — planned together instead of competing for budget.",
  alternates: { canonical: "/services/growth-systems" },
};

const LEAKS = [
  {
    title: "Three vendors, three versions of the truth",
    body:
      "The agency reports a great month, the SDR firm reports a great month, and revenue is flat. Nobody owns the number that matters because nobody can see the whole funnel.",
  },
  {
    title: "Budget arguments instead of budget decisions",
    body:
      "Paid wants more spend, content wants more headcount, engineering wants a rebuild. Without a shared model of where the constraint actually sits, the loudest case wins.",
  },
  {
    title: "The handoffs are where leads die",
    body:
      "An ad generates a lead, a form captures it badly, a CRM nobody trusts loses it, and a rep follows up two days late. Each vendor did their part correctly and the lead is still gone.",
  },
];

const SYSTEM = [
  {
    n: "01",
    title: "One diagnosis",
    body:
      "We audit all three layers before proposing anything: what the market sees, who is being contacted, and what happens to a lead after it arrives. The constraint is usually not where the last vendor said it was.",
  },
  {
    n: "02",
    title: "One plan, sequenced",
    body:
      "Fixes are ordered by what unblocks the most downstream value. Often that means fixing capture before spending more on traffic — which is the opposite of what a media agency would propose.",
  },
  {
    n: "03",
    title: "One team across the three",
    body:
      "The same people who run the ads specify the landing page and instrument the CRM. Nothing gets lost in a handoff because there is no handoff.",
  },
  {
    n: "04",
    title: "One dashboard",
    body:
      "Spend, replies, meetings, pipeline and closed revenue in a single view, in your systems. Every number defined in writing and agreed before it is reported.",
  },
  {
    n: "05",
    title: "One monthly decision meeting",
    body:
      "What worked, what didn't, what changes, and what we are stopping. Including the months where the honest answer is that a channel is not working.",
  },
];

export default function Page() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-10 md:pt-14 pb-14 md:pb-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <nav className="t-mono flex items-center gap-2 text-mist">
            <Link href="/services" className="link-underline hover:text-ink-2">
              Services
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-3">Growth Systems</span>
          </nav>

          <p className="t-mono mt-8 text-flame">Pillar 04</p>
          <h1 className="t-display mt-4 max-w-[13ch] text-[clamp(2.5rem,9vw,7rem)] text-ink">
            Growth <span className="grad-flame">Systems</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-[clamp(1.125rem,2.6vw,1.75rem)] font-semibold leading-tight tracking-tight text-ink-2">
            All three pillars. One retainer. One dashboard.
          </p>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-3">
            Most businesses buy marketing from one company, outbound from
            another and software from a third. Each does their job. The revenue
            still leaks, because the leaks live in the gaps between them — and
            nobody is paid to own a gap.
          </p>
        </Reveal>
      </section>

      {/* ── The gaps ──────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Why split vendors underperform</p>
          <h2 className="t-display mt-3 max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            Nobody is paid to own the gap.
          </h2>
        </Reveal>
        <Reveal stagger="[data-leak]" className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {LEAKS.map((l, i) => (
            <article key={l.title} data-leak className="bg-paper p-7 md:p-8">
              <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[1.1875rem] font-semibold leading-snug tracking-tight text-ink">
                {l.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-3">{l.body}</p>
            </article>
          ))}
        </Reveal>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="bg-paper-2 py-14 md:py-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">How a growth system runs</p>
          <h2 className="t-display mt-3 max-w-[16ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            One team, one number.
          </h2>
        </Reveal>
        <Reveal stagger="[data-step]" className="mt-10 flex flex-col">
          {SYSTEM.map((s) => (
            <div
              key={s.n}
              data-step
              className="grid gap-3 border-t border-line py-7 md:grid-cols-[5rem_1fr_1.4fr] md:gap-8 md:py-9"
            >
              <span className="t-mono text-flame">{s.n}</span>
              <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.375rem]">
                {s.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-ink-3">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── What's inside ─────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">What sits inside a retainer</p>
          <h2 className="t-display mt-3 max-w-[20ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            Built from the same 28 services.
          </h2>
          <p className="mt-5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-ink-3">
            A growth system is not a different product — it is a selection from
            the three pillars, weighted to where your constraint actually is,
            and reviewed every quarter as that changes.
          </p>
        </Reveal>

        <Reveal stagger="[data-pillar]" className="mt-10 grid gap-px bg-line md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.id} data-pillar className="bg-paper p-7 md:p-8">
              <span className="t-mono text-flame">{p.index}</span>
              <h3 className="t-display mt-4 text-[1.625rem] text-ink">{p.name}</h3>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">{p.blurb}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {p.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`${p.href}/${s.slug}`}
                      className="t-mono inline-block rounded-full border border-line px-2 py-1 text-[0.5625rem] text-ink-3 transition-colors duration-300 hover:border-flame hover:text-flame"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Process ───────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Every engagement</p>
          <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            The same five steps.
          </h2>
        </Reveal>
        <Reveal stagger="[data-p]" className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((s) => (
            <div key={s.n} data-p className="bg-paper p-6">
              <span className="t-mono text-flame">{s.n}</span>
              <p className="t-display mt-4 text-[1.375rem] text-ink">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Honest note ───────────────────────────────────────── */}
      <section className="pb-14 md:pb-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <div className="border-l-2 border-flame bg-paper-2 p-7 md:p-10">
            <p className="t-eyebrow">When this is the wrong thing to buy</p>
            <p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-ink-2">
              If one channel is clearly broken and the rest is fine, buy the fix,
              not the system. A growth-system retainer earns its keep when the
              problem spans more than one layer — demand, capture and follow-up —
              or when coordinating three vendors has become its own job. If that
              is not you, we will say so and quote the single service instead.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ paddingInline: "var(--gutter)" }} className="pb-16 md:pb-24">
        <Reveal>
          <div className="flex flex-col gap-8 bg-ink p-9 text-paper md:flex-row md:items-end md:justify-between md:p-14">
            <div>
              <h2 className="t-display max-w-[16ch] text-[clamp(1.75rem,4.5vw,3.25rem)]">
                Start with a diagnosis, not a retainer.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[1rem] leading-relaxed text-white/65">
                We audit all three layers first and show you where the constraint
                actually is. If that turns out to be one service rather than a
                system, that is what we will quote.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/contact"
                data-cursor="Talk"
                className="t-mono inline-flex items-center justify-center gap-3 bg-flame px-8 py-4 text-paper transition-colors duration-400 hover:bg-flame-2"
              >
                Book a diagnosis →
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
    </>
  );
}
