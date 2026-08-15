"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { value: 42, suffix: "+", label: "Projects delivered" },
  { value: 28, suffix: "", label: "Services under one roof" },
  { value: 3.4, suffix: "Cr", prefix: "₹", label: "Ad spend managed", decimals: 1 },
  { value: 96, suffix: "%", label: "Clients who stay past year one" },
];

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>("[data-count]");
    const isStatic =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("static");

    if (isStatic) {
      nodes.forEach((n) => {
        const to = Number(n.dataset.count);
        const d = Number(n.dataset.decimals ?? 0);
        n.textContent = to.toFixed(d);
      });
      return;
    }

    const write = (n: HTMLElement) =>
      (n.textContent = Number(n.dataset.count).toFixed(
        Number(n.dataset.decimals ?? 0),
      ));

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      nodes.forEach((n) => {
        const to = Number(n.dataset.count);
        const d = Number(n.dataset.decimals ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: n, start: "top 88%", once: true },
          onUpdate: () => {
            n.textContent = obj.v.toFixed(d);
          },
        });
      });
    }, el);

    // If the frame loop never runs, the counters would sit at zero and quietly
    // report the wrong numbers. Once a stat has been on screen long enough for
    // the tween to have finished, fill in anything still showing the placeholder.
    const timers = new Map<HTMLElement, number>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const n = e.target as HTMLElement;
        if (e.isIntersecting) {
          if (timers.has(n)) continue;
          timers.set(
            n,
            window.setTimeout(() => {
              if (n.textContent === "0") write(n);
            }, 3000),
          );
        }
      }
    });
    nodes.forEach((n) => io.observe(n));

    return () => {
      ctx.revert();
      io.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <section className="border-y border-line py-16 md:py-24">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-y-10 md:grid-cols-4"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <p className="t-display text-[clamp(2.25rem,6vw,4rem)] text-ink">
              {s.prefix}
              <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                0
              </span>
              <span className="text-flame">{s.suffix}</span>
            </p>
            <p className="t-mono mt-2 max-w-[12rem] text-ink-3">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
