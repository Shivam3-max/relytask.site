"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  formatCompact,
  formatMoney,
  getCurrency,
  type Currency,
  type CurrencyCode,
} from "@/lib/currency";

type Ctx = {
  currency: Currency;
  setCode: (code: CurrencyCode) => void;
  /** INR in, formatted string out. */
  money: (inr: number) => string;
  compact: (inr: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

const KEY = "relytask.currency";
const EVENT = "relytask:currency";

const isValid = (v: string | null): v is CurrencyCode =>
  !!v && CURRENCIES.some((c) => c.code === v);

/**
 * localStorage is an external store, so it is read through
 * useSyncExternalStore rather than an effect — that keeps the server and the
 * first client render in agreement without a cascading re-render.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): CurrencyCode {
  try {
    const stored = window.localStorage.getItem(KEY);
    return isValid(stored) ? stored : DEFAULT_CURRENCY;
  } catch {
    // Private mode or blocked storage — the default is fine.
    return DEFAULT_CURRENCY;
  }
}

const getServerSnapshot = (): CurrencyCode => DEFAULT_CURRENCY;

export default function CurrencyProvider({
  children,
  rates,
}: {
  children: React.ReactNode;
  /** Admin-set INR-per-unit overrides, keyed by currency code. */
  rates?: Partial<Record<CurrencyCode, number>>;
}) {
  const code = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setCode = useCallback((next: CurrencyCode) => {
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      // Not being able to remember the choice is not worth an error.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const value = useMemo<Ctx>(() => {
    const base = getCurrency(code);
    const override = rates?.[code];
    const currency: Currency =
      override && override > 0 ? { ...base, perINR: override } : base;
    return {
      currency,
      setCode,
      money: (inr: number) => formatMoney(inr, currency),
      compact: (inr: number) => formatCompact(inr, currency),
    };
  }, [code, setCode, rates]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
