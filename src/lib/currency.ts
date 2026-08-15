/**
 * Multi-currency display for the calculators.
 *
 * Everything is priced and computed in INR — that is the real cost base — and
 * converted only at render time. Rates are static and indicative on purpose:
 * a marketing calculator that silently depends on a live FX API is a
 * calculator that breaks quietly. The UI says so wherever a converted figure
 * appears.
 */

export type CurrencyCode =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "SGD"
  | "AUD"
  | "CAD";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  /** Indicative INR per 1 unit of this currency. */
  perINR: number;
  /** Round displayed amounts to this step, to avoid false precision. */
  step: number;
};

/** Indicative mid-market rates. Review roughly every quarter. */
export const RATES_UPDATED = "August 2026";

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN", perINR: 1, step: 500 },
  { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US", perINR: 88, step: 10 },
  { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE", perINR: 96, step: 10 },
  { code: "GBP", symbol: "£", name: "Pound Sterling", locale: "en-GB", perINR: 112, step: 10 },
  { code: "AED", symbol: "AED ", name: "UAE Dirham", locale: "en-AE", perINR: 24, step: 50 },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", locale: "en-SG", perINR: 66, step: 10 },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU", perINR: 58, step: 10 },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA", perINR: 64, step: 10 },
];

export const DEFAULT_CURRENCY: CurrencyCode = "INR";

export const getCurrency = (code: CurrencyCode) =>
  CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];

/** INR amount into the target currency, rounded to a sensible step. */
export function convert(inr: number, currency: Currency) {
  const raw = inr / currency.perINR;
  if (raw === 0) return 0;
  const step = currency.step;
  // Below one step, keep some resolution rather than rounding to zero.
  if (Math.abs(raw) < step) return Math.round(raw);
  return Math.round(raw / step) * step;
}

export function formatMoney(inr: number, currency: Currency) {
  const value = convert(inr, currency);
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Short form for headline figures. Indian numbering gets lakh/crore because
 * that is how the number is actually said; everything else gets K/M.
 */
export function formatCompact(inr: number, currency: Currency) {
  const value = convert(inr, currency);
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  const sym = currency.symbol;

  if (currency.code === "INR") {
    if (abs >= 1e7) return `${sign}${sym}${trim(abs / 1e7)} Cr`;
    if (abs >= 1e5) return `${sign}${sym}${trim(abs / 1e5)} L`;
    if (abs >= 1e3) return `${sign}${sym}${Math.round(abs / 1e3)}K`;
    return formatMoney(inr, currency);
  }

  if (abs >= 1e6) return `${sign}${sym}${trim(abs / 1e6)}M`;
  if (abs >= 1e3) return `${sign}${sym}${trim(abs / 1e3)}K`;
  return formatMoney(inr, currency);
}

const trim = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export const formatNumber = (n: number, digits = 0) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(n);

export const formatPercent = (fraction: number, digits = 1) =>
  `${(fraction * 100).toFixed(digits)}%`;
