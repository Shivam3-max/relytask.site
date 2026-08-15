"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AREAS,
  QUESTIONS,
  bandFor,
  overall,
  scoreByArea,
  MAX_PER_QUESTION,
} from "@/lib/maturity";
import SendResult from "./SendResult";
import { Bar, Panel } from "./ui";

export default function DigitalMaturity() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const answered = Object.keys(answers).length;
  const q = QUESTIONS[step];
  const areaName = AREAS.find((a) => a.id === q?.area)?.name ?? "";

  const areaScores = useMemo(() => scoreByArea(answers), [answers]);
  const total = useMemo(() => overall(answers), [answers]);
  const band = bandFor(total.percent);
  const ranked = [...areaScores].sort((a, b) => a.percent - b.percent);

  const choose = (value: number) => {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step + 1 < QUESTIONS.length) setStep(step + 1);
    else setDone(true);
  };

  /* ── Result ────────────────────────────────────────────── */
  if (done) {
    return (
      <div className="flex flex-col gap-8">
        <div className="bg-ink p-8 text-paper md:p-12">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="t-eyebrow text-flame-2">Your score</p>
              <p className="t-display mt-4 text-[clamp(3.5rem,12vw,8rem)] leading-none">
                {Math.round(total.percent * 100)}
                <span className="text-[0.4em] text-white/40">/100</span>
              </p>
              <p className="t-display mt-3 text-[clamp(1.25rem,3vw,2rem)] text-flame-2">
                {band.label}
              </p>
            </div>
            <p className="max-w-[42ch] text-[1rem] leading-relaxed text-white/65">{band.body}</p>
          </div>
        </div>

        <Panel title="Where you stand, area by area">
          <div className="flex flex-col gap-6">
            {areaScores.map((a) => (
              <Bar
                key={a.area.id}
                label={a.area.name}
                value={a.score}
                max={a.max}
                hint={`${a.score} of ${a.max}`}
              />
            ))}
          </div>
        </Panel>

        <Panel
          title="Fix in this order"
          note="Weakest first. Fixing the bottom of this list usually lifts everything above it."
        >
          <ol className="flex flex-col">
            {ranked.map((a, i) => (
              <li
                key={a.area.id}
                className="grid gap-3 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[3rem_1fr_auto] md:gap-6"
              >
                <span className="t-mono text-flame">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4 className="text-[1.0625rem] font-semibold tracking-tight text-ink">
                    {a.area.name}
                    <span className="t-mono ml-3 font-normal text-mist">
                      {Math.round(a.percent * 100)}%
                    </span>
                  </h4>
                  <p className="mt-2 max-w-[56ch] text-[0.875rem] leading-relaxed text-ink-3">
                    {a.area.why}
                  </p>
                </div>
                <Link
                  href={a.area.fix.href}
                  data-cursor="Read"
                  className="t-mono self-start whitespace-nowrap border border-line px-4 py-2.5 text-ink-2 transition-colors duration-300 hover:border-flame hover:text-flame"
                >
                  {a.area.fix.label} →
                </Link>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setStep(0);
              setDone(false);
            }}
            className="t-mono border border-line px-6 py-3 text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            ← Start again
          </button>
        </div>

        <SendResult
          source="digital-maturity"
          headline="Want the full read-out and what we'd do first?"
          body="We'll send your scores with a specific 90-day order of work — and tell you honestly if the top item isn't something we sell."
          payload={{
            score: total.score,
            max: total.max,
            percent: total.percent,
            band: band.label,
            areas: areaScores.map((a) => ({ id: a.area.id, score: a.score, max: a.max })),
            weakest: ranked.slice(0, 2).map((a) => a.area.name),
            answers,
          }}
        />
      </div>
    );
  }

  /* ── Question ──────────────────────────────────────────── */
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-12">
      <div>
        <div className="flex items-center justify-between">
          <p className="t-mono text-flame">{areaName}</p>
          <p className="t-mono text-mist">
            {step + 1} / {QUESTIONS.length}
          </p>
        </div>
        <div className="mt-3 h-1 w-full bg-line">
          <div
            className="h-full bg-flame transition-[width] duration-500"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h3 className="t-display mt-8 max-w-[22ch] text-[clamp(1.5rem,4vw,2.5rem)] text-ink">
          {q.text}
        </h3>

        <div className="mt-8 flex flex-col gap-2">
          {q.answers.map((a, i) => {
            const active = answers[q.id] === i;
            return (
              <button
                key={a}
                type="button"
                onClick={() => choose(i)}
                className={`flex items-center justify-between gap-4 border p-4 text-left transition-colors duration-300 ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink hover:border-ink-3"
                }`}
              >
                <span className="text-[0.9375rem] leading-snug tracking-tight">{a}</span>
                <span
                  className={`t-mono shrink-0 ${active ? "text-flame-2" : "text-mist"}`}
                >
                  {i}/{MAX_PER_QUESTION}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="t-mono border border-line px-5 py-2.5 text-ink-2 transition-colors duration-300 hover:border-ink hover:text-ink disabled:opacity-30"
          >
            ← Back
          </button>
          {answered >= QUESTIONS.length && (
            <button
              type="button"
              onClick={() => setDone(true)}
              className="t-mono bg-flame px-6 py-2.5 text-paper transition-colors duration-300 hover:bg-flame-2"
            >
              See my score →
            </button>
          )}
        </div>
      </div>

      <Panel title="What this measures" className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
        <p className="text-[0.9375rem] leading-relaxed text-ink-3">
          Twenty questions across six areas. It takes about four minutes and the
          useful output is not the total — it is the ranking, because the weakest
          area is nearly always what is capping the others.
        </p>
        <ul className="mt-6 flex flex-col">
          {AREAS.map((a) => {
            const isCurrent = a.id === q.area;
            const s = areaScores.find((x) => x.area.id === a.id);
            return (
              <li
                key={a.id}
                className={`flex items-center justify-between gap-4 border-t border-line py-3 text-[0.875rem] ${
                  isCurrent ? "text-ink" : "text-ink-3"
                }`}
              >
                <span className={isCurrent ? "font-semibold" : ""}>{a.name}</span>
                <span className="t-mono text-mist">
                  {s ? `${s.score}/${s.max}` : ""}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[0.75rem] leading-relaxed text-mist">
          Nothing is sent anywhere until you choose to send it. Answers stay in
          this browser tab.
        </p>
      </Panel>
    </div>
  );
}
