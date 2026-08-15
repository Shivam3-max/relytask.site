"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import OrbitSystem from "./OrbitSystem";
import ServiceIndex from "./ServiceIndex";
import { ALL_SERVICES } from "@/lib/services";

export default function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);

  const onHover = useCallback((slug: string | null, pillar: string | null) => {
    setActive(slug);
    setActivePillar(pillar);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".line-mask > span", {
        y: 0,
        duration: 1.05,
        stagger: 0.075,
      })
        .to(
          ".fade-up",
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 },
          "-=0.6",
        )
        .from(
          ".orbit-in",
          { opacity: 0, scale: 0.9, duration: 1.3, ease: "power2.out" },
          "-=1.1",
        );
    }, root);
    return () => ctx.revert();
  }, []);

  const hovered = ALL_SERVICES.find((s) => s.slug === active);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between pt-[var(--nav-h)]"
    >
      <div
        className="grid flex-1 items-center gap-8 py-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:py-0"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {/* ── Claim ─────────────────────────────────────────── */}
        <div className="relative z-10 max-w-[41rem]">
          <p className="t-eyebrow fade-up">
            Mohali · Marketing × Outreach × Technology
          </p>

          <h1 className="t-display mt-4 text-[clamp(2.35rem,6.6vw,4.35rem)] text-ink">
            <span className="line-mask">
              <span>We build</span>
            </span>
            <span className="line-mask">
              <span className="grad-flame">demand.</span>
            </span>
            <span className="line-mask">
              <span>And the system</span>
            </span>
            <span className="line-mask">
              <span>that holds it.</span>
            </span>
          </h1>

          <p className="fade-up mt-6 max-w-md text-[0.9375rem] leading-relaxed text-ink-3 md:text-[1rem]">
            Content and campaigns that create attention. Outbound that puts you in
            the room. Software that catches every lead. One team — your delegation
            partners.
          </p>

          <div className="fade-up mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[0.875rem] font-medium text-paper transition-colors duration-300 hover:bg-flame"
            >
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/it-projects"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[0.875rem] font-medium text-ink-2 transition-colors duration-300 hover:border-ink"
            >
              See the work
            </Link>
          </div>

          {/* live readout of the hovered node */}
          <div className="fade-up mt-7 hidden h-8 items-center gap-3 lg:flex">
            <span
              className="block h-1.5 w-1.5 rounded-full transition-colors duration-300"
              style={{
                background: hovered ? "var(--color-flame)" : "var(--color-line)",
              }}
            />
            <span className="t-mono text-ink-3">
              {hovered ? hovered.name : "28 services · one system"}
            </span>
            <span className="text-[0.8125rem] text-mist">
              {hovered ? hovered.short : ""}
            </span>
          </div>
        </div>

        {/* ── The engine ────────────────────────────────────── */}
        <div className="orbit-in relative mx-auto w-full max-w-[min(64vw,22rem)] px-2 lg:max-w-[38rem] lg:px-12">
          <OrbitSystem
            active={active}
            activePillar={activePillar}
            onHover={onHover}
          />
        </div>
      </div>

      {/* ── Every service, visible and clickable ───────────── */}
      <ServiceIndex active={active} activePillar={activePillar} onHover={onHover} />
    </section>
  );
}
