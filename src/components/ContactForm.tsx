"use client";

import { useState } from "react";
import { ALL_SERVICES } from "@/lib/services";

const BUDGETS = [
  "Not sure yet",
  "Under ₹1L",
  "₹1L – ₹3L",
  "₹3L – ₹8L",
  "₹8L – ₹20L",
  "₹20L+",
];

const TIMELINES = ["ASAP", "1–2 months", "3–6 months", "Just exploring"];

const field =
  "w-full border border-line bg-paper px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-mist focus:border-ink";

const label = "t-mono block text-ink-3";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, source: "contact" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-line bg-paper-2 p-8 md:p-10">
        <p className="t-eyebrow text-flame">Got it</p>
        <h2 className="t-display mt-4 text-[clamp(1.5rem,3.5vw,2.25rem)] text-ink">
          Thanks — we&rsquo;ll be in touch.
        </h2>
        <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-ink-3">
          We reply to everything within one working day, usually the same
          morning. If it is urgent, WhatsApp is faster than waiting for us.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Your name *
          </label>
          <input id="name" name="name" required className={`${field} mt-2`} placeholder="Shivam" />
        </div>
        <div>
          <label className={label} htmlFor="company">
            Company
          </label>
          <input id="company" name="company" className={`${field} mt-2`} placeholder="Acme Pvt Ltd" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            className={`${field} mt-2`}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className={`${field} mt-2`}
            placeholder="+91 …"
          />
        </div>
      </div>
      <p className="t-mono -mt-2 text-mist">One of email or phone is enough.</p>

      <div>
        <label className={label} htmlFor="service">
          What do you need?
        </label>
        <select id="service" name="service" defaultValue="" className={`${field} mt-2`}>
          <option value="">Not sure yet — help me work it out</option>
          {ALL_SERVICES.map((s) => (
            <option key={`${s.pillar}-${s.slug}`} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="budget">
            Budget
          </label>
          <select id="budget" name="budget" defaultValue="" className={`${field} mt-2`}>
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="timeline">
            Timeline
          </label>
          <select id="timeline" name="timeline" defaultValue="" className={`${field} mt-2`}>
            <option value="">Not decided</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          What&rsquo;s going wrong?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${field} mt-2 resize-y`}
          placeholder="The more specific, the more useful our first reply will be."
        />
      </div>

      {state === "error" && (
        <p className="border-l-2 border-flame bg-flame-soft px-4 py-3 text-[0.875rem] text-ink-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        data-cursor="Send"
        className="t-mono mt-2 inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-paper transition-colors duration-400 hover:bg-flame disabled:opacity-50"
      >
        {state === "sending" ? "Sending…" : "Send it →"}
      </button>

      <p className="t-mono text-mist">
        We reply within one working day. No sequences, no drip campaign.
      </p>
    </form>
  );
}
