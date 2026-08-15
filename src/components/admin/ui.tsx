import Link from "next/link";

/** Shared chrome for the admin screens. Denser and plainer than the site. */

export function AdminPage({
  title,
  sub,
  action,
  children,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[80rem] px-5 py-8 md:px-8 md:py-10">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="t-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink">{title}</h1>
          {sub && <p className="mt-2 max-w-[62ch] text-[0.875rem] leading-relaxed text-ink-3">{sub}</p>}
        </div>
        {action}
      </header>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function Card({
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
    <section className={`border border-line bg-paper p-5 md:p-6 ${className}`}>
      {title && (
        <header className="mb-5 border-b border-line pb-4">
          <h2 className="t-mono text-flame">{title}</h2>
          {note && <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">{note}</p>}
        </header>
      )}
      {children}
    </section>
  );
}

export const inputClass =
  "w-full border border-line bg-paper px-3 py-2.5 text-[0.875rem] text-ink outline-none transition-colors duration-200 placeholder:text-mist focus:border-ink";

export function Label({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <span className="mb-1.5 block">
      <span className="t-mono block text-ink-3">{children}</span>
      {hint && <span className="mt-1 block text-[0.6875rem] leading-relaxed text-mist">{hint}</span>}
    </span>
  );
}

export function Text({
  name,
  label,
  hint,
  defaultValue,
  placeholder,
  required,
  type = "text",
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        step={type === "number" ? "any" : undefined}
        className={inputClass}
      />
    </label>
  );
}

export function Area({
  name,
  label,
  hint,
  defaultValue,
  rows = 4,
  placeholder,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <Label hint={hint}>{label}</Label>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        className={`${inputClass} resize-y font-mono text-[0.8125rem]`}
      />
    </label>
  );
}

export function Check({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 border border-line px-3 py-2.5">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="accent-[var(--color-flame)]" />
      <span className="text-[0.875rem] text-ink">{label}</span>
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "submit",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
}) {
  const styles = {
    primary: "bg-ink text-paper hover:bg-flame",
    ghost: "border border-line text-ink-2 hover:border-ink hover:text-ink",
    danger: "border border-line text-ink-3 hover:border-flame hover:text-flame",
  }[variant];

  return (
    <button
      type={type}
      {...rest}
      className={`t-mono inline-flex items-center justify-center gap-2 px-5 py-2.5 transition-colors duration-200 disabled:opacity-40 ${styles}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-flame"
      : "border border-line text-ink-2 hover:border-ink hover:text-ink";
  return (
    <Link
      href={href}
      className={`t-mono inline-flex items-center justify-center gap-2 px-5 py-2.5 transition-colors duration-200 ${styles}`}
    >
      {children}
    </Link>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-line bg-paper-2 p-10 text-center">
      <p className="text-[0.9375rem] text-ink-3">{children}</p>
    </div>
  );
}

export function Pill({ tone, children }: { tone: string; children: React.ReactNode }) {
  const map: Record<string, string> = {
    new: "bg-flame-soft text-flame",
    contacted: "bg-paper-2 text-ink-2",
    qualified: "bg-ink text-paper",
    won: "bg-ink text-paper",
    lost: "bg-paper-2 text-mist",
  };
  return (
    <span className={`t-mono inline-block px-2.5 py-1 text-[0.5625rem] ${map[tone] ?? "bg-paper-2 text-ink-3"}`}>
      {children}
    </span>
  );
}

/** Band editor used across the benchmark screens. */
export function BandRow({
  prefix,
  label,
  hint,
  value,
  multiplier = 1,
  suffix,
}: {
  prefix: string;
  label: string;
  hint?: string;
  value: { low: number; mid: number; high: number };
  multiplier?: number;
  suffix?: string;
}) {
  const fmt = (n: number) => Number((n * multiplier).toFixed(4));
  return (
    <div className="grid gap-3 border-t border-line py-4 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:items-end">
      <div>
        <p className="text-[0.875rem] font-medium text-ink">{label}</p>
        {hint && <p className="mt-1 text-[0.6875rem] leading-relaxed text-mist">{hint}</p>}
      </div>
      {(["low", "mid", "high"] as const).map((k) => (
        <label key={k} className="block">
          <span className="t-mono mb-1 block text-mist">
            {k}
            {suffix ? ` (${suffix})` : ""}
          </span>
          <input
            name={`${prefix}.${k}`}
            type="number"
            step="any"
            defaultValue={fmt(value[k])}
            className={inputClass}
          />
        </label>
      ))}
    </div>
  );
}
