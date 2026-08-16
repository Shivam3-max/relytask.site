import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export const runtime = "nodejs";

type Body = Record<string, unknown>;

const str = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) || null : null;

/** Crude but effective: shape check only, delivery is what really validates. */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/**
 * A lead we can rank without a human reading it first: a real budget, a
 * near-term timeline and a company name all raise the score.
 */
function score(lead: {
  budget: string | null;
  timeline: string | null;
  company: string | null;
  phone: string | null;
  message: string | null;
}) {
  let n = 0;
  if (lead.company) n += 15;
  if (lead.phone) n += 15;
  if (lead.message && lead.message.length > 120) n += 15;
  if (lead.budget && !/^(not sure|under)/i.test(lead.budget)) n += 30;
  if (lead.timeline && /(asap|1|2|month)/i.test(lead.timeline)) n += 25;
  return Math.min(100, n);
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real people never fill a hidden field.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const email = str(body.email, 320);
  const phone = str(body.phone, 40);
  const name = str(body.name, 120);
  const source = str(body.source, 60) ?? "contact";

  if (!name) {
    return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Add an email or a phone number so we can reply." },
      { status: 400 },
    );
  }
  if (email && !looksLikeEmail(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const payload =
    body.payload && typeof body.payload === "object"
      ? JSON.stringify(body.payload).slice(0, 20000)
      : null;

  const data = {
    name,
    email,
    phone,
    company: str(body.company, 160),
    message: str(body.message, 5000),
    source,
    service: str(body.service, 120),
    budget: str(body.budget, 60),
    timeline: str(body.timeline, 60),
    payload,
  };

  try {
    const lead = await createLead({ ...data, score: score(data) });
    return NextResponse.json({ ok: true, id: lead.id });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong saving that. Please call or WhatsApp us instead." },
      { status: 500 },
    );
  }
}
