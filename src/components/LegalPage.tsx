import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

export type Section = { heading: string; body: string[] };

/**
 * Shared shell for the legal pages — same rhythm as the rest of the site so
 * they don't read like a bolted-on afterthought.
 */
export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  return (
    <section
      className="pt-[calc(var(--nav-h)+3rem)] pb-16 md:pb-24"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <p className="t-eyebrow">{eyebrow}</p>
        <h1 className="t-display mt-5 max-w-[14ch] text-[clamp(2.5rem,8vw,5.5rem)] text-ink">
          {title}
        </h1>
        <p className="t-mono mt-6 text-mist">Last updated {updated}</p>
        <p className="mt-6 max-w-[60ch] text-[1.0625rem] leading-relaxed text-ink-2">
          {intro}
        </p>
      </Reveal>

      <Reveal stagger="[data-sec]" className="mt-12 flex flex-col border-t border-line">
        {sections.map((s, i) => (
          <div
            key={s.heading}
            data-sec
            className="grid gap-4 border-b border-line py-8 md:grid-cols-[4rem_1fr] md:gap-8"
          >
            <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="text-[1.1875rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.375rem]">
                {s.heading}
              </h2>
              {s.body.map((p, j) => (
                <p
                  key={j}
                  className="mt-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-ink-3"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      <Reveal>
        <div className="mt-12 border-l-2 border-flame bg-paper-2 p-7">
          <p className="t-eyebrow">Questions about this page</p>
          <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-2">
            Write to{" "}
            <a href={`mailto:${SITE.email}`} className="text-flame link-underline">
              {SITE.email}
            </a>{" "}
            or call {SITE.phone}. {SITE.legalName}, {SITE.address.line1},{" "}
            {SITE.address.line2}, {SITE.address.city}, {SITE.address.region},{" "}
            {SITE.address.country}.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
