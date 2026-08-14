import Link from "next/link";
import Reveal from "../Reveal";
import { TOOLS } from "@/lib/tools";

export default function ToolsTeaser() {
  const flagship = TOOLS.filter((t) => t.flagship);

  return (
    <section
      className="border-t border-line py-20 md:py-32"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="t-eyebrow">Free tools</p>
          <h2 className="t-display mt-3 max-w-[18ch] text-[clamp(2rem,5.5vw,3.75rem)] text-ink">
            Try us before you <span className="grad-flame">talk to us.</span>
          </h2>
        </div>
        <Link href="/tools" className="t-mono text-ink-2 link-underline">
          All tools →
        </Link>
      </Reveal>

      <Reveal stagger="[data-tool]" className="mt-12 grid gap-px bg-line md:grid-cols-3">
        {flagship.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            data-tool
            data-cursor="Open"
            className="group bg-paper p-7 transition-colors duration-400 hover:bg-paper-2 md:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="t-mono text-flame">Free</span>
              <span className="t-mono text-mist">{t.time}</span>
            </div>
            <h3 className="t-display mt-6 text-[1.375rem] text-ink md:text-[1.625rem]">
              {t.tagline}
            </h3>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">
              {t.description}
            </p>
            <span className="t-mono mt-6 inline-block text-ink-2">
              {t.name} →
            </span>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}
