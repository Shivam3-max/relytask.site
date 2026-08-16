import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PILLARS, PROCESS } from "@/lib/services";
import { DESTINATIONS } from "@/lib/globe";
import { SITE, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "RelyTask is a delegation partner in Mohali, India — marketing, outreach and software under one roof, delivered to clients across nine countries.",
  alternates: { canonical: "/about" },
};

const BELIEFS = [
  {
    title: "The gap between vendors is where money dies",
    body:
      "Agencies optimise the ad. SDR firms optimise the reply. Developers optimise the build. Nobody optimises the handoff — which is exactly where most leads are lost. We took all three in-house so there is no handoff to lose them in.",
  },
  {
    title: "Say the number, even when it's bad",
    body:
      "Every report we send names what underperformed and what we changed because of it. An agency that only ever shows you winners is either not measuring or not telling you.",
  },
  {
    title: "Own what you paid for",
    body:
      "Code, accounts, domains, data, creative files. Everything we build for you is handed over outright. Nothing important sits in an account you would have to negotiate for.",
  },
  {
    title: "Cheap and good are not opposites here",
    body:
      "We are in Mohali, not Mayfair. The saving comes out of the cost base, not out of the seniority of the people doing your work — which is the difference between affordable and cheap.",
  },
];

export default function Page() {
  const countries = [...new Set(DESTINATIONS.map((d) => d.region))];
  const totalServices = PILLARS.reduce((n, p) => n + p.services.length, 0);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-14 md:pb-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">About</p>
          <h1 className="t-display mt-5 max-w-[15ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
            Your delegation <span className="grad-flame">partners.</span>
          </h1>
          <p className="mt-7 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ink-2">
            RelyTask exists because most businesses do not need another vendor.
            They need someone to take a whole area off their desk and be
            accountable for what happens to it — including the parts that sit
            between the specialists they have already hired.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: `${totalServices}`, l: "services under one roof" },
            { v: `${countries.length}`, l: "countries served" },
            { v: "3", l: "pillars, one team" },
            { v: "Mohali", l: "where it all runs from" },
          ].map((s) => (
            <div key={s.l}>
              <p className="t-display text-[clamp(1.75rem,4.5vw,3rem)] text-ink">{s.v}</p>
              <p className="t-mono mt-2 max-w-[12rem] text-ink-3">{s.l}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Founder ───────────────────────────────────────────── */}
      <section
        className="border-t border-line py-14 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">The founder</p>
        </Reveal>

        <div className="mt-8 grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
              <Image
                src="/Founder.jpeg"
                alt="Shivam Bhandari, founder of RelyTask"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { k: "Started at", v: "15" },
                { k: "Today", v: "21" },
                { k: "Based in", v: "Mohali" },
              ].map((s) => (
                <div key={s.k}>
                  <p className="t-mono text-mist">{s.k}</p>
                  <p className="t-display mt-1 text-[1.5rem] text-ink">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h2 className="t-display max-w-[16ch] text-[clamp(2rem,5.5vw,3.75rem)] text-ink">
              Shivam <span className="grad-flame">Bhandari</span>
            </h2>
            <p className="t-mono mt-4 text-ink-3">Founder</p>

            <div className="mt-7 max-w-[60ch] text-[1.0625rem] leading-[1.75] text-ink-2">
              <p>
                I started at fifteen. Not with a plan, and not with the route
                most people around me were taking — the one where you finish the
                degree first and think about the work later. I went the other
                way round, and I have been building ever since.
              </p>
              <p className="mt-5">
                Six years on I am twenty-one, and the thing that started as
                curiosity turned into a business with a specific obsession:
                that a team sitting in Mohali can do work that stands up
                anywhere in the world. Not cheaper work with the corners
                sanded off. The same standard, at a cost base the market has
                not caught up to yet.
              </p>
              <p className="mt-5">
                That is the whole reason RelyTask exists and the reason we
                built it to go global from day one. If you have ever been
                quoted an agency price in London or New York and wondered what
                exactly you were paying for, we are the answer to that
                question.
              </p>
            </div>

            <blockquote className="mt-9 border-l-2 border-flame pl-6">
              <p className="t-display text-[clamp(1.25rem,3vw,1.875rem)] leading-[1.2] text-ink">
                &ldquo;Starting young taught me the only thing that actually
                compounds is doing the work and telling the truth about it.&rdquo;
              </p>
            </blockquote>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/contact"
                data-cursor="Talk"
                className="t-mono inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-paper transition-colors duration-400 hover:bg-flame"
              >
                Talk to me directly →
              </Link>
              <a
                href={`mailto:${SITE.email}`}
                className="t-mono text-ink-3 link-underline"
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The story ─────────────────────────────────────────── */}
      <section
        className="grid gap-10 border-t border-line py-14 md:grid-cols-[0.6fr_1.4fr] md:gap-16 md:py-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Why we exist</p>
        </Reveal>
        <Reveal>
          <div className="max-w-[62ch] text-[1.0625rem] leading-[1.75] text-ink-2 md:text-[1.125rem]">
            <p>
              We kept meeting the same business. It had an agency producing
              content, someone running ads, a freelancer who built the website
              two years ago, and a spreadsheet where the leads went to die. Every
              individual piece was defensible. The whole thing leaked.
            </p>
            <p className="mt-6">
              The problem was never talent. It was that no single party could see
              the full path from a stranger noticing the brand to money arriving
              in the bank — so no single party could fix it. Each vendor
              optimised their own slice and pointed at the next one when the
              numbers disappointed.
            </p>
            <p className="mt-6">
              So we built the three capabilities that path needs — marketing,
              outreach and software — in one team, reporting one number. That is
              the whole idea. Everything else is execution.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Beliefs ───────────────────────────────────────────── */}
      <section className="bg-paper-2 py-14 md:py-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">How we work</p>
          <h2 className="t-display mt-3 max-w-[18ch] text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            Four things we won&rsquo;t bend on.
          </h2>
        </Reveal>
        <Reveal stagger="[data-belief]" className="mt-10 grid gap-px bg-line sm:grid-cols-2">
          {BELIEFS.map((b, i) => (
            <article key={b.title} data-belief className="bg-paper-2 p-7 md:p-9">
              <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[1.1875rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.375rem]">
                {b.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-3">
                {b.body}
              </p>
            </article>
          ))}
        </Reveal>
      </section>

      {/* ── Process ───────────────────────────────────────────── */}
      <section className="py-14 md:py-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal>
          <p className="t-eyebrow">Every engagement</p>
          <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,3rem)] text-ink">
            Discover, define, build, distribute, optimise.
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

      {/* ── Where ─────────────────────────────────────────────── */}
      <section className="bg-ink py-14 text-paper md:py-20" style={{ paddingInline: "var(--gutter)" }}>
        <Reveal className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
          <div>
            <p className="t-eyebrow text-flame-2">Where we are</p>
            <h2 className="t-display mt-3 text-[clamp(1.75rem,4.5vw,3rem)]">
              Mohali, working worldwide.
            </h2>
            <address className="mt-6 text-[0.9375rem] not-italic leading-relaxed text-white/60">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.city}, {SITE.address.region}, {SITE.address.country}
            </address>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href={`tel:${SITE.phoneRaw}`}
                className="t-mono text-white/80 link-underline"
              >
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="t-mono text-white/80 link-underline"
              >
                {SITE.email}
              </a>
            </div>
          </div>
          <div>
            <p className="t-eyebrow text-flame-2">Clients in</p>
            <ul className="mt-5 flex flex-col">
              {countries.map((c) => (
                <li
                  key={c}
                  className="t-mono border-t border-white/10 py-3 text-white/60"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[40ch] text-[0.875rem] leading-relaxed text-white/50">
              Our timezone overlaps a full working day with EMEA and half of one
              with the US East Coast. See{" "}
              <Link href="/#reach" className="text-flame-2 link-underline">
                why our location is our leverage
              </Link>
              .
            </p>
          </div>
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
              Hand us something.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
              Start with the thing that is annoying you most this month. We will
              tell you what we would do about it and what it would cost.
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
