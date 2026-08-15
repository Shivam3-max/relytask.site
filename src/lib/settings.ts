import "server-only";
import { prisma } from "./db";
import { DEFAULT_RATE_CARD, type RateCard } from "./pricing";
import { AUTOMATION, OUTREACH, PAID } from "./benchmarks";
import { CURRENCIES, type CurrencyCode } from "./currency";

/**
 * Every tunable number on the site lives here. Defaults come from the source
 * files; the admin panel writes overrides into the Setting table, and these
 * loaders merge the two. Nothing needs a deploy to change a price.
 */

export type Band = { low: number; mid: number; high: number };

export type BenchmarkSettings = {
  outreach: {
    deliverableRate: Band;
    replyRate: Band;
    positiveShare: Band;
    meetingRate: Band;
    closeRate: Band;
    emailsPerInboxPerDay: number;
  };
  paid: {
    metaCpc: Band;
    metaCpm: Band;
    googleCpc: Band;
    landingCvr: Band;
  };
  automation: {
    hourlyCost: { junior: number; executive: number; manager: number; senior: number };
    workingHoursPerMonth: number;
    automatableShare: Band;
  };
};

export type SiteStats = { value: number; suffix: string; prefix?: string; label: string; decimals?: number }[];

export const DEFAULT_BENCHMARKS: BenchmarkSettings = {
  outreach: {
    deliverableRate: { ...OUTREACH.deliverableRate },
    replyRate: { ...OUTREACH.replyRate },
    positiveShare: { ...OUTREACH.positiveShare },
    meetingRate: { ...OUTREACH.meetingRate },
    closeRate: { ...OUTREACH.closeRate },
    emailsPerInboxPerDay: OUTREACH.emailsPerInboxPerDay,
  },
  paid: {
    metaCpc: { ...PAID.meta.cpc },
    metaCpm: { ...PAID.meta.cpm },
    googleCpc: { ...PAID.google.cpc },
    landingCvr: { ...PAID.landingCvr },
  },
  automation: {
    hourlyCost: { ...AUTOMATION.hourlyCost },
    workingHoursPerMonth: AUTOMATION.workingHoursPerMonth,
    automatableShare: { ...AUTOMATION.automatableShare },
  },
};

export const DEFAULT_STATS: SiteStats = [
  { value: 42, suffix: "+", label: "Projects delivered" },
  { value: 28, suffix: "", label: "Services under one roof" },
  { value: 3.4, suffix: "Cr", prefix: "₹", label: "Ad spend managed", decimals: 1 },
  { value: 96, suffix: "%", label: "Clients who stay past year one" },
];

export const DEFAULT_FX: Record<CurrencyCode, number> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c.perINR]),
) as Record<CurrencyCode, number>;

export const KEYS = {
  rateCard: "rateCard",
  benchmarks: "benchmarks",
  stats: "siteStats",
  fx: "fxRates",
} as const;

async function read<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await prisma.setting.findUnique({ where: { key } });
    if (!row) return fallback;
    return JSON.parse(row.value) as T;
  } catch {
    // A missing table or bad JSON must never take the public site down.
    return fallback;
  }
}

export async function write(key: string, value: unknown) {
  const json = JSON.stringify(value);
  await prisma.setting.upsert({
    where: { key },
    create: { key, value: json },
    update: { value: json },
  });
}

export const getRateCard = () => read<RateCard>(KEYS.rateCard, DEFAULT_RATE_CARD);
export const getBenchmarks = () => read<BenchmarkSettings>(KEYS.benchmarks, DEFAULT_BENCHMARKS);
export const getStats = () => read<SiteStats>(KEYS.stats, DEFAULT_STATS);
export const getFx = () => read<Record<CurrencyCode, number>>(KEYS.fx, DEFAULT_FX);

export async function resetSetting(key: string) {
  await prisma.setting.deleteMany({ where: { key } });
}
