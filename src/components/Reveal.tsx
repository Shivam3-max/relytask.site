"use client";

import { useCallback, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger children matching this selector instead of the wrapper itself. */
  stagger?: string;
  delay?: number;
  y?: number;
};

/**
 * Scroll reveal that cannot leave content permanently invisible.
 *
 * Elements are hidden by JS and revealed by IntersectionObserver, with a
 * timeout behind it. If any step fails — no JS, no IntersectionObserver,
 * reduced motion, a stalled frame loop — the content simply stays visible.
 * Nothing here depends on requestAnimationFrame.
 *
 * Arming happens in the ref callback, which the browser runs during commit
 * and before paint, so there is no flash and no server/client hook branch.
 */
export default function Reveal({
  children,
  className = "",
  stagger,
  delay = 0,
  y = 26,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const shouldAnimate = () =>
    typeof IntersectionObserver !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !new URLSearchParams(window.location.search).has("static");

  const targetsOf = useCallback(
    (el: HTMLElement) =>
      stagger ? Array.from(el.querySelectorAll<HTMLElement>(stagger)) : [el],
    [stagger],
  );

  const attach = useCallback(
    (el: HTMLDivElement | null) => {
      ref.current = el;
      if (!el || !shouldAnimate()) return;

      for (const [i, t] of targetsOf(el).entries()) {
        t.style.setProperty("--reveal-d", `${delay + (stagger ? i * 0.08 : 0)}s`);
        t.style.setProperty("--reveal-y", `${y}px`);
        t.dataset.revealArmed = "";
      }
    },
    [targetsOf, stagger, delay, y],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = targetsOf(el);
    const show = () => {
      for (const t of targets) t.dataset.revealIn = "";
    };

    // Nothing was armed (reduced motion, ?static, no observer) — leave it be.
    if (!targets.some((t) => "revealArmed" in t.dataset)) return;

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
  }, [targetsOf]);

  return (
    <div ref={attach} className={className}>
      {children}
    </div>
  );
}
