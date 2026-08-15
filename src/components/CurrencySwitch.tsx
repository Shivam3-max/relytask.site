"use client";

import { useCurrency } from "./CurrencyProvider";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

/**
 * Compact currency picker. A native select on purpose — it is keyboard and
 * screen-reader correct for free, and behaves properly on mobile.
 */
export default function CurrencySwitch({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const { currency, setCode } = useCurrency();

  const colors =
    tone === "dark"
      ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
      : "border-line text-ink-3 hover:border-ink-3 hover:text-ink";

  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <span className="sr-only">Display currency</span>
      <select
        value={currency.code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
        className={`t-mono cursor-pointer appearance-none rounded-full border bg-transparent py-2 pl-3.5 pr-8 outline-none transition-colors duration-300 ${colors}`}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code} className="text-ink">
            {c.code}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 text-[0.5rem] opacity-60"
      >
        ▼
      </span>
    </label>
  );
}
