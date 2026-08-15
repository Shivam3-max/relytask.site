"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger children matching this selector instead of the wrapper itself. */
  stagger?: string;
  delay?: number;
  y?: number;
};

/** useLayoutEffect arms the elements before paint, so nothing flashes. */
const useArmEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scroll reveal that cannot leave content permanently invisible.
 *
 * Elements are hidden by JS and revealed by IntersectionObserver, with a
 * timeout that reveals anything still hidden. If any step fails — no JS, no
 * IntersectionObserver, reduced motion, a stalled frame loop — the content
 * simply stays visible. Nothing here depends on requestAnimationFrame.
 */
export default function Reveal({
  children,
  className = "",
  stagger,
  delay = 0,
  y = 26,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useArmEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).has("static")) return;
    if (typeof IntersectionObserver === "undefined") return;

    const targets = stagger
      ? Array.from(el.querySelectorAll<HTMLElement>(stagger))
      : [el];
    if (!targets.length) return;

    for (const [i, t] of targets.entries()) {
      t.style.setProperty("--reveal-d", `${delay + (stagger ? i * 0.08 : 0)}s`);
      t.style.setProperty("--reveal-y", `${y}px`);
      t.dataset.revealArmed = "";
    }

    const show = () => {
      for (const t of targets) t.dataset.revealIn = "";
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        show();
        io.disconnect();
        clearTimeout(failsafe);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);

    // Belt and braces: never let a missed observation hide content for good.
    const failsafe = window.setTimeout(() => {
      show();
      io.disconnect();
    }, 2500);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      for (const t of targets) {
        delete t.dataset.revealArmed;
        delete t.dataset.revealIn;
      }
    };
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
