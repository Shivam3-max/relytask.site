"use client";

import { useState } from "react";

/**
 * Every tool ends here: the visitor can have the working sent to them, which
 * puts the inputs and the computed result on the lead record. That is far
 * more useful to a salesperson than a bare email address.
 */
export default function SendResult({
  source,
  service,
  payload,
  headline = "Want this as a written summary?",
  body = "We'll send the numbers, the assumptions behind them, and what we'd do differently — from a person, not a sequence.",
}: {
  source: string;
  service?: string;
  payload: Record<string, unknown>;
  headline?: string;
  body?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          website: form.get("website"),
          message: form.get("message"),
          source,
          service,
          payload,
        }),
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
      <div className="border border-flame bg-flame-soft p-7 md:p-9">
        <p className="t-eyebrow text-flame">On its way</p>
        <p className="t-display mt-3 text-[clamp(1.375rem,3vw,2rem)] text-ink">
          Got it — we&rsquo;ll be in touch.
        </p>
        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-2">
          Your inputs came through with it, so the first reply will be about your
          numbers rather than a generic intro.
        </p>
      </div>
    );
  }

  const field =
    "w-full border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink outline-none transition-colors duration-300 placeholder:text-mist focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper-2 p-7 md:p-9">
      <p className="t-eyebrow">Next step</p>
      <h3 className="t-display mt-3 max-w-[20ch] text-[clamp(1.375rem,3vw,2rem)] text-ink">
        {headline}
      </h3>
      <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-3">{body}</p>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <input name="name" required placeholder="Your name" className={field} aria-label="Your name" />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className={field}
          aria-label="Email"
        />
        <input name="phone" type="tel" placeholder="Phone / WhatsApp" className={field} aria-label="Phone" />
      </div>
      <textarea
        name="message"
        rows={2}
        placeholder="Anything we should know? (optional)"
        className={`${field} mt-3 resize-y`}
        aria-label="Message"
      />

      {state === "error" && (
        <p className="mt-4 border-l-2 border-flame bg-paper px-4 py-3 text-[0.875rem] text-ink-2">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          data-cursor="Send"
          className="t-mono inline-flex items-center gap-3 bg-ink px-7 py-3.5 text-paper transition-colors duration-400 hover:bg-flame disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Send me this →"}
        </button>
        <span className="t-mono text-mist">One of email or phone is enough</span>
      </div>
    </form>
  );
}
