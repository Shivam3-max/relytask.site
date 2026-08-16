"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminConfigError, checkPassword, clearSession, isAuthed, setSession } from "@/lib/auth";
import {
  createCaseStudy,
  createTestimonial,
  deleteCaseStudy as removeCaseStudy,
  deleteLead as removeLead,
  deleteTestimonial as removeTestimonial,
  getCaseStudyById,
  updateCaseStudy,
  updateLead as saveLeadUpdate,
  updateTestimonial,
} from "@/lib/db";
import { KEYS, resetSetting, write } from "@/lib/settings";
import type { RateCard } from "@/lib/pricing";
import type { BenchmarkSettings, SiteStats } from "@/lib/settings";
import type { CurrencyCode } from "@/lib/currency";

/** Every mutation goes through this. Server actions are public endpoints. */
async function guard() {
  if (!(await isAuthed())) throw new Error("Not authorised.");
}

const str = (v: FormDataEntryValue | null, max = 5000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const num = (v: FormDataEntryValue | null, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const lines = (v: FormDataEntryValue | null) =>
  str(v, 20000)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

/** "Title | body" per line. */
const pairs = (v: FormDataEntryValue | null, aKey: string, bKey: string) =>
  lines(v).map((l) => {
    const [a, ...rest] = l.split("|");
    return { [aKey]: a.trim(), [bKey]: rest.join("|").trim() };
  });

/* ── Auth ─────────────────────────────────────────────────────── */

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const misconfigured = adminConfigError();
  if (misconfigured) return { error: misconfigured };

  const password = str(formData.get("password"), 200);
  if (!password) return { error: "Enter the password." };
  if (!checkPassword(password)) return { error: "That password is not right." };
  await setSession();
  redirect("/admin");
}

export async function logout() {
  await clearSession();
  redirect("/admin/login");
}

/* ── Leads ────────────────────────────────────────────────────── */

export async function updateLead(formData: FormData) {
  await guard();
  const id = str(formData.get("id"), 60);
  await saveLeadUpdate(id, {
    status: str(formData.get("status"), 20) || "new",
    notes: str(formData.get("notes"), 5000) || null,
  });
  revalidatePath("/admin/leads");
}

export async function deleteLead(formData: FormData) {
  await guard();
  await removeLead(str(formData.get("id"), 60));
  revalidatePath("/admin/leads");
}

/* ── Case studies ─────────────────────────────────────────────── */

export async function saveCaseStudy(formData: FormData) {
  await guard();
  const id = str(formData.get("id"), 60);

  const data = {
    slug: str(formData.get("slug"), 120).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    client: str(formData.get("client"), 120),
    title: str(formData.get("title"), 240),
    category: str(formData.get("category"), 40) || "Technology",
    industry: str(formData.get("industry"), 120),
    year: str(formData.get("year"), 10),
    timeline: str(formData.get("timeline"), 60),
    liveUrl: str(formData.get("liveUrl"), 300) || null,
    summary: str(formData.get("summary"), 600),
    challenge: str(formData.get("challenge"), 3000),
    services: JSON.stringify(lines(formData.get("services"))),
    stack: JSON.stringify(lines(formData.get("stack"))),
    approach: JSON.stringify(pairs(formData.get("approach"), "title", "body")),
    metrics: JSON.stringify(pairs(formData.get("metrics"), "value", "label")),
    quoteText: str(formData.get("quoteText"), 800) || null,
    quoteName: str(formData.get("quoteName"), 120) || null,
    quoteRole: str(formData.get("quoteRole"), 120) || null,
    seed: num(formData.get("seed"), 1),
    order: num(formData.get("order"), 0),
    confidential: formData.get("confidential") === "on",
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  const previous = id ? await getCaseStudyById(id) : null;

  if (id) await updateCaseStudy(id, data);
  else await createCaseStudy(data);

  revalidatePath("/admin/work");
  revalidatePath("/it-projects");
  // The case page is prerendered, so it needs busting by path — including the
  // old path when a slug has been renamed.
  revalidatePath(`/it-projects/${data.slug}`);
  if (previous && previous.slug !== data.slug) revalidatePath(`/it-projects/${previous.slug}`);
  revalidatePath("/sitemap.xml");

  redirect("/admin/work");
}

export async function deleteCaseStudy(formData: FormData) {
  await guard();
  const removed = await removeCaseStudy(str(formData.get("id"), 60));
  revalidatePath("/admin/work");
  revalidatePath("/it-projects");
  if (removed) revalidatePath(`/it-projects/${removed.slug}`);
  revalidatePath("/sitemap.xml");
}

/* ── Testimonials ─────────────────────────────────────────────── */

export async function saveTestimonial(formData: FormData) {
  await guard();
  const id = str(formData.get("id"), 60);
  const data = {
    quote: str(formData.get("quote"), 2000),
    name: str(formData.get("name"), 120),
    role: str(formData.get("role"), 120),
    company: str(formData.get("company"), 160) || null,
    mediaUrl: str(formData.get("mediaUrl"), 400) || null,
    mediaType: str(formData.get("mediaType"), 20) || null,
    posterUrl: str(formData.get("posterUrl"), 400) || null,
    aspect: str(formData.get("aspect"), 12) || "16/9",
    order: num(formData.get("order"), 0),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  if (id) await updateTestimonial(id, data);
  else await createTestimonial(data);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await guard();
  await removeTestimonial(str(formData.get("id"), 60));
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/testimonials");
}

/* ── Rate card ────────────────────────────────────────────────── */

export async function saveRateCard(formData: FormData) {
  await guard();

  const group = (prefix: string) => {
    const out: { id: string; label: string; note?: string; cost: number; days: number }[] = [];
    for (const [key, value] of formData.entries()) {
      const m = key.match(new RegExp(`^${prefix}\\.(.+)\\.label$`));
      if (!m) continue;
      const id = m[1];
      out.push({
        id,
        label: String(value).trim(),
        note: str(formData.get(`${prefix}.${id}.note`), 200) || undefined,
        cost: num(formData.get(`${prefix}.${id}.cost`)),
        days: num(formData.get(`${prefix}.${id}.days`)),
      });
    }
    return out;
  };

  const card: RateCard = {
    buildTypes: group("buildTypes"),
    features: group("features"),
    design: group("design"),
    cms: group("cms"),
    support: group("support"),
    pages: {
      perPage: num(formData.get("pages.perPage")),
      daysPerPage: num(formData.get("pages.daysPerPage")),
      included: num(formData.get("pages.included")),
    },
    integrations: {
      perIntegration: num(formData.get("integrations.perIntegration")),
      daysPer: num(formData.get("integrations.daysPer")),
    },
    bandWidth: num(formData.get("bandWidth")) / 100,
    rushMultiplier: num(formData.get("rushMultiplier")),
  };

  await write(KEYS.rateCard, card);
  revalidatePath("/admin/pricing");
  revalidatePath("/tools/cost-estimator");
}

/* ── Benchmarks ───────────────────────────────────────────────── */

export async function saveBenchmarks(formData: FormData) {
  await guard();

  /** Percentages are edited as whole numbers; store fractions. */
  const band = (prefix: string, divisor = 1) => ({
    low: num(formData.get(`${prefix}.low`)) / divisor,
    mid: num(formData.get(`${prefix}.mid`)) / divisor,
    high: num(formData.get(`${prefix}.high`)) / divisor,
  });

  const value: BenchmarkSettings = {
    outreach: {
      deliverableRate: band("outreach.deliverableRate", 100),
      replyRate: band("outreach.replyRate", 100),
      positiveShare: band("outreach.positiveShare", 100),
      meetingRate: band("outreach.meetingRate", 100),
      closeRate: band("outreach.closeRate", 100),
      emailsPerInboxPerDay: num(formData.get("outreach.emailsPerInboxPerDay"), 40),
    },
    paid: {
      metaCpc: band("paid.metaCpc"),
      metaCpm: band("paid.metaCpm"),
      googleCpc: band("paid.googleCpc"),
      landingCvr: band("paid.landingCvr", 100),
    },
    automation: {
      hourlyCost: {
        junior: num(formData.get("automation.hourlyCost.junior")),
        executive: num(formData.get("automation.hourlyCost.executive")),
        manager: num(formData.get("automation.hourlyCost.manager")),
        senior: num(formData.get("automation.hourlyCost.senior")),
      },
      workingHoursPerMonth: num(formData.get("automation.workingHoursPerMonth"), 176),
      automatableShare: band("automation.automatableShare", 100),
    },
  };

  await write(KEYS.benchmarks, value);
  revalidatePath("/admin/benchmarks");
  revalidatePath("/tools", "layout");
}

/* ── FX and site stats ────────────────────────────────────────── */

export async function saveFx(formData: FormData) {
  await guard();
  const rates: Record<string, number> = {};
  for (const [key, value] of formData.entries()) {
    if (!key.startsWith("fx.")) continue;
    const code = key.slice(3) as CurrencyCode;
    const n = Number(value);
    if (Number.isFinite(n) && n > 0) rates[code] = n;
  }
  await write(KEYS.fx, rates);
  revalidatePath("/", "layout");
}

export async function saveStats(formData: FormData) {
  await guard();
  const stats: SiteStats = [];
  for (let i = 0; i < 8; i++) {
    const label = str(formData.get(`stats.${i}.label`), 80);
    if (!label) continue;
    stats.push({
      label,
      value: num(formData.get(`stats.${i}.value`)),
      suffix: str(formData.get(`stats.${i}.suffix`), 8),
      prefix: str(formData.get(`stats.${i}.prefix`), 8) || undefined,
      decimals: num(formData.get(`stats.${i}.decimals`)),
    });
  }
  await write(KEYS.stats, stats);
  revalidatePath("/");
}

export async function resetToDefaults(formData: FormData) {
  await guard();
  const key = str(formData.get("key"), 40);
  await resetSetting(key);
  revalidatePath("/admin", "layout");
  revalidatePath("/", "layout");
}
