"use client";

import { useSyncExternalStore } from "react";

const noSubscription = () => () => {};

function computeOn() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isStatic = new URLSearchParams(window.location.search).has("static");
  return !reduced && !isStatic;
}

const serverSnapshot = () => false;

/**
 * Motion is on unless the user asks for reduced motion, or the page is loaded
 * with ?static=1 (used for screenshots, OG capture and visual QA). Read via
 * useSyncExternalStore instead of an effect + setState: correct on the first
 * client render with no extra re-render, and `false` during SSR so there is
 * no hydration mismatch.
 */
export function useMotion() {
  return useSyncExternalStore(noSubscription, computeOn, serverSnapshot);
}
