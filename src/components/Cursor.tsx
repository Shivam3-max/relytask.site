"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(el ? (el.getAttribute("data-cursor") ?? "") : "");
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden md:block" aria-hidden="true">
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-flame"
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-ink/25 transition-[width,height,background-color,border-color] duration-300"
        style={{
          width: label ? 76 : 32,
          height: label ? 76 : 32,
          backgroundColor: label ? "var(--color-ink)" : "transparent",
          borderColor: label ? "var(--color-ink)" : "rgba(20,24,43,0.22)",
        }}
      >
        <span
          className="t-mono text-[0.5rem] text-paper transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
