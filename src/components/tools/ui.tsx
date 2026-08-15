"use client";

import { useId } from "react";
import { useCurrency } from "../CurrencyProvider";

/* ── Layout ──────────────────────────────────────────────────── */

export function Panel({
  title,
  note,
  children,
  className = "",
}: {
  title?: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border border-line bg-paper p-6 md:p-8 ${className}`}>
      {title && (
        <header className="mb-6">
          <h3 className="t-mono text-flame">{title}</h3>
          {note && <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">{note}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export function Row({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 | 3 }) {
  const map = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" } as const;
  return <div className={`grid gap-5 ${map[cols]}`}>{children}</div>;
}

/* ── Inputs ──────────────────────────────────────────────────── */

const inputBase =
  "w-full border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-300 focus:border-ink";

export function Field({
  label,
  hint,
  suffix,
  children,
}: {
  label: string;
  hint?: string;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="t-mono block text-ink-3">{label}</span>
      <div className="relative mt-2">
        {children}
        {suffix && (
          <span className="t-mono pointer-events-none absolute inset-y-0 right-4 flex items-center text-mist">
            {suffix}
          </span>
        )}
      </div>
      {hint && <span className="mt-1.5 block text-[0.75rem] leading-relaxed text-mist">{hint}</span>}
    </label>
  );
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="t-mono pointer-events-none absolute inset-y-0 left-4 flex items-center text-mist">
          {prefix}
        </span>
      )}
      <input
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const n = e.target.value === "" ? 0 : Number(e.target.value);
          if (Number.isNaN(n)) return;
          onChange(Math.min(max ?? Infinity, Math.max(min, n)));
        }}
        className={`${inputBase} ${prefix ? "pl-10" : ""}`}
      />
    </div>
  );
}

/**
 * Money field that shows and accepts the visitor's chosen currency while the
 * model underneath stays in INR. Typing "5000" with USD selected means five
 * thousand dollars, which is the only behaviour that isn't confusing.
 */
export function MoneyInput({
  valueINR,
  onChangeINR,
  stepINR = 1000,
  min = 0,
}: {
  valueINR: number;
  onChangeINR: (inr: number) => void;
  stepINR?: number;
  min?: number;
}) {
  const { currency } = useCurrency();
  const shown = Math.round(valueINR / currency.perINR);
  const step = Math.max(1, Math.round(stepINR / currency.perINR));

  return (
    <NumberInput
      value={shown}
      onChange={(n) => onChangeINR(Math.round(n * currency.perINR))}
      min={Math.round(min / currency.perINR)}
      step={step}
      prefix={currency.symbol.trim()}
    />
  );
}

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const btn =
    "flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-line";
  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - step))}
        className={btn}
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (Number.isNaN(n)) return;
          onChange(Math.min(max, Math.max(min, n)));
        }}
        className={`${inputBase} text-center`}
      />
      <button
        type="button"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + step))}
        className={btn}
      >
        +
      </button>
    </div>
  );
}

export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  format?: (n: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[1.125rem] font-semibold tracking-tight text-ink">
          {format ? format(value) : value}
        </span>
        <span className="t-mono text-mist">
          {format ? format(min) : min} – {format ? format(max) : max}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-flame mt-3 w-full"
      />
    </div>
  );
}

export function Choice<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
}: {
  options: { id: T; label: string; note?: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3;
}) {
  const name = useId();
  const map = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" } as const;

  return (
    <div role="radiogroup" className={`grid gap-2 ${map[columns]}`}>
      {options.map((o) => {
        const active = o.id === value;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            name={name}
            onClick={() => onChange(o.id)}
            className={`flex flex-col items-start border p-4 text-left transition-colors duration-300 ${
              active
                ? "border-ink bg-ink text-paper"
                : "border-line bg-paper text-ink hover:border-ink-3"
            }`}
          >
            <span className="text-[0.9375rem] font-semibold leading-snug tracking-tight">
              {o.label}
            </span>
            {o.note && (
              <span
                className={`mt-1 text-[0.75rem] leading-relaxed ${
                  active ? "text-white/60" : "text-ink-3"
                }`}
              >
                {o.note}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function CheckGrid<T extends string>({
  options,
  value,
  onToggle,
}: {
  options: { id: T; label: string; note?: string }[];
  value: T[];
  onToggle: (id: T) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => {
        const active = value.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() => onToggle(o.id)}
            className={`flex items-start gap-3 border p-4 text-left transition-colors duration-300 ${
              active ? "border-flame bg-flame-soft" : "border-line bg-paper hover:border-ink-3"
            }`}
          >
            <span
              aria-hidden
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border text-[0.625rem] ${
                active ? "border-flame bg-flame text-paper" : "border-line text-transparent"
              }`}
            >
              ✓
            </span>
            <span>
              <span className="block text-[0.9375rem] font-medium leading-snug tracking-tight text-ink">
                {o.label}
              </span>
              {o.note && (
                <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-ink-3">
                  {o.note}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Toggle({
  label,
  note,
  checked,
  onChange,
}: {
  label: string;
  note?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-start justify-between gap-4 border p-4 text-left transition-colors duration-300 ${
        checked ? "border-flame bg-flame-soft" : "border-line bg-paper hover:border-ink-3"
      }`}
    >
      <span>
        <span className="block text-[0.9375rem] font-medium tracking-tight text-ink">{label}</span>
        {note && (
          <span className="mt-0.5 block text-[0.75rem] leading-relaxed text-ink-3">{note}</span>
        )}
      </span>
      <span
        aria-hidden
        className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-300 ${
          checked ? "bg-flame" : "bg-line"
        }`}
      >
        <span
          className="h-4 w-4 rounded-full bg-paper transition-transform duration-300"
          style={{ transform: checked ? "translateX(16px)" : "none" }}
        />
      </span>
    </button>
  );
}

/* ── Output ──────────────────────────────────────────────────── */

export function Headline({
  label,
  value,
  sub,
  tone = "light",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div>
      <p className={`t-mono ${tone === "dark" ? "text-flame-2" : "text-ink-3"}`}>{label}</p>
      <p
        className={`t-display mt-2 text-[clamp(1.75rem,5vw,3rem)] ${
          tone === "dark" ? "text-paper" : "text-ink"
        }`}
      >
        {value}
      </p>
      {sub && (
        <p
          className={`mt-2 text-[0.8125rem] leading-relaxed ${
            tone === "dark" ? "text-white/55" : "text-ink-3"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export function StatRow({
  items,
  tone = "light",
}: {
  items: { label: string; value: string; hint?: string }[];
  tone?: "light" | "dark";
}) {
  const border = tone === "dark" ? "border-white/10" : "border-line";
  return (
    <dl className="flex flex-col">
      {items.map((s) => (
        <div
          key={s.label}
          className={`flex items-baseline justify-between gap-6 border-t ${border} py-3.5`}
        >
          <dt
            className={`t-mono ${tone === "dark" ? "text-white/50" : "text-ink-3"}`}
          >
            {s.label}
            {s.hint && (
              <span className="ml-2 normal-case tracking-normal opacity-70">{s.hint}</span>
            )}
          </dt>
          <dd
            className={`shrink-0 text-[1rem] font-semibold tracking-tight ${
              tone === "dark" ? "text-paper" : "text-ink"
            }`}
          >
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Bar({ value, max, label, hint }: { value: number; max: number; label: string; hint?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[0.9375rem] font-medium tracking-tight text-ink">{label}</span>
        <span className="t-mono text-ink-3">{Math.round(pct * 100)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full bg-line">
        <div
          className="h-full bg-flame transition-[width] duration-700"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      {hint && <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-3">{hint}</p>}
    </div>
  );
}

export function Scenarios({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; values: string[]; emphasis?: boolean }[];
}) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
      <table className="w-full min-w-[30rem] border-collapse text-left">
        <thead>
          <tr>
            <th className="t-mono border-b border-line pb-3 text-ink-3">Scenario</th>
            {columns.map((c, i) => (
              <th
                key={c}
                className={`t-mono border-b border-line pb-3 text-right ${
                  i === 1 ? "text-flame" : "text-ink-3"
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th
                scope="row"
                className={`border-b border-line py-3.5 pr-4 text-left text-[0.875rem] font-normal ${
                  r.emphasis ? "font-semibold text-ink" : "text-ink-3"
                }`}
              >
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td
                  key={i}
                  className={`border-b border-line py-3.5 text-right text-[0.9375rem] tabular-nums ${
                    r.emphasis ? "font-semibold text-ink" : "text-ink-2"
                  } ${i === 1 ? "bg-flame-soft/40" : ""}`}
                >
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Assumptions({
  items,
  source,
}: {
  items: string[];
  source?: { label: string; url: string };
}) {
  return (
    <details className="group border-t border-line pt-5">
      <summary className="t-mono flex cursor-pointer list-none items-center justify-between text-ink-3 hover:text-ink">
        Assumptions behind this
        <span className="text-flame transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map((a) => (
          <li key={a} className="text-[0.8125rem] leading-relaxed text-ink-3">
            — {a}
          </li>
        ))}
      </ul>
      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="t-mono mt-4 inline-block text-mist link-underline hover:text-flame"
        >
          {source.label} ↗
        </a>
      )}
    </details>
  );
}
