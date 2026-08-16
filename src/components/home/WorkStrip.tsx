"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASE_STUDIES } from "@/lib/case-studies";
import PlaceholderArt from "../PlaceholderArt";

export default function WorkStrip() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const featured = CASE_STUDIES.filter((c) => c.featured);

  useLayoutEffect(() => {
    const w = wrap.current;
    const t = track.current;
    if (!w || !t) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).has("static")) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const distance = () => t.scrollWidth - window.innerWidth + 64;
      gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: w,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, w);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="overflow-hidden py-16 lg:h-[100svh] lg:py-0">
      <div
        className="flex items-baseline justify-between pb-8 lg:pt-24"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <div>
          <p className="t-eyebrow">IT projects</p>
          <h2 className="t-display mt-3 text-[clamp(2rem,5.5vw,3.75rem)] text-ink">
            Software that <span className="grad-flame">went live.</span>
          </h2>
        </div>
        <Link href="/it-projects" className="t-mono hidden text-ink-2 link-underline md:block">
          All IT projects →
        </Link>
      </div>

      <div
        ref={track}
        className="flex gap-5 overflow-x-auto pb-4 lg:overflow-visible"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {featured.map((cs) => (
          <Link
            key={cs.slug}
            href={`/it-projects/${cs.slug}`}
            data-cursor="View"
            className="group w-[78vw] shrink-0 sm:w-[52vw] lg:w-[30rem]"
          >
            <div className="relative overflow-hidden">
              <PlaceholderArt seed={cs.seed} ratio="aspect-[4/3]" />
              <div className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]" />
              {cs.confidential && (
                <span className="t-mono absolute right-3 top-3 bg-paper/90 px-2 py-1 text-[0.5rem] text-ink-3">
                  NDA
                </span>
              )}
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="t-mono text-flame">{cs.category}</p>
                <h3 className="mt-1.5 text-[1.0625rem] font-medium text-ink">
                  {cs.client}
                </h3>
                <p className="mt-1 max-w-xs text-[0.875rem] leading-relaxed text-ink-3">
                  {cs.title}
                </p>
              </div>
              <span className="t-display shrink-0 text-[1.5rem] text-ink">
                {cs.metrics[0].value}
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/it-projects"
          className="flex w-[60vw] shrink-0 items-center justify-center border border-line sm:w-[30vw] lg:w-[18rem]"
        >
          <span className="t-mono text-ink-2">All IT projects →</span>
        </Link>
      </div>
    </section>
  );
}
