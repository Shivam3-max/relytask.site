"use client";

import { useEffect, useState } from "react";

/**
 * Motion is on unless the user asks for reduced motion, or the page is loaded
 * with ?static=1 (used for screenshots, OG capture and visual QA).
 */
export function useMotion() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isStatic = new URLSearchParams(window.location.search).has("static");
    setOn(!reduced && !isStatic);
  }, []);

  return on;
}
