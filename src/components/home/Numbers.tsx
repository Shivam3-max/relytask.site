"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

/**
 * Counters that animate up when the row scrolls into view.
 *
 * The displayed values live in React state rather than being written onto the
 * DOM with textContent. Writing textContent replaces the text node React is
 * holding a reference to, and React then fails to remove it on the next
 * reconciliation — "The node to be removed is not a child of this node".
 */
export default function Numbers({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const settled = useRef(false);
  const [values, setValues] = useState<number[]>(() => stats.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finals = stats.map((s) => s.value);
    const settle = () => {
      settled.current = true;
      setValues(finals);
    };

    const isStatic =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("static");

    if (isStatic) {
      settle();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const progress = { t: 0 };
      gsap.to(progress, {
        t: 1,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onUpdate: () => setValues(finals.map((v) => v * progress.t)),
        onComplete: settle,
      });
    }, el);

    // Two layers, because either can fail independently.
    //
    // 1. The row is on screen but the frame loop stalled, so the tween never
    //    completes. Settle a little after the tween should have finished.
    // 2. IntersectionObserver itself never delivers — then nothing above ever
    //    runs. Observing always fires once, so no delivery at all means it is
    //    not working, and the numbers would sit at zero reporting the wrong
    //    figures. Settle rather than leave them wrong.
    let delivered = false;
    let timer = 0;

    const io = new IntersectionObserver((entries) => {
      delivered = true;
      if (!entries.some((e) => e.isIntersecting) || timer) return;
      timer = window.setTimeout(() => {
        // Keyed on completion, not on the tween having started: GSAP fires one
        // update at t=0, so a stalled ticker would otherwise look like progress.
        if (!settled.current) settle();
      }, 3000);
    });
    io.observe(el);

    const backstop = window.setTimeout(() => {
      if (!delivered && !settled.current) settle();
    }, 4000);

    return () => {
      ctx.revert();
      io.disconnect();
      clearTimeout(timer);
      clearTimeout(backstop);
    };
  }, [stats]);

  return (
    <section className="border-y border-line py-16 md:py-24">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {stats.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center">
            <p className="t-display text-[clamp(2.25rem,6vw,4rem)] text-ink">
              {s.prefix}
              <span>{(values[i] ?? 0).toFixed(s.decimals ?? 0)}</span>
              <span className="text-flame">{s.suffix}</span>
            </p>
            <p className="t-mono mt-2 max-w-[12rem] text-ink-3">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
