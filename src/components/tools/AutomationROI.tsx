"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "../CurrencyProvider";
import { AUTOMATION } from "@/lib/benchmarks";
import { formatNumber, formatPercent, RATES_UPDATED } from "@/lib/currency";
import SendResult from "./SendResult";
import {
  Assumptions,
  Choice,
  Field,
  Headline,
  MoneyInput,
  NumberInput,
  Panel,
  Row,
  Slider,
  StatRow,
} from "./ui";

type Role = keyof typeof AUTOMATION.hourlyCost;

const ROLES: { id: Role; label: string; note: string }[] = [
  { id: "junior", label: "Junior / data entry", note: "₹180/hr loaded" },
  { id: "executive", label: "Executive", note: "₹320/hr loaded" },
  { id: "manager", label: "Manager", note: "₹650/hr loaded" },
  { id: "senior", label: "Senior / specialist", note: "₹1,200/hr loaded" },
];

export default function AutomationROI() {
  const { money, compact, currency } = useCurrency();

  const [people, setPeople] = useState(3);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [role, setRole] = useState<Role>("executive");
  const [share, setShare] = useState<number>(AUTOMATION.automatableShare.mid);
  const [buildCost, setBuildCost] = useState(180000);
  const [runCost, setRunCost] = useState(4000);

  const model = useMemo(() => {
    const rate = AUTOMATION.hourlyCost[role];
    const hoursMonth = people * hoursPerWeek * 4.33;
    const savedHoursMonth = hoursMonth * share;
    const savedCostMonth = savedHoursMonth * rate - runCost;
    const savedYear = savedCostMonth * 12;
    const paybackMonths = savedCostMonth > 0 ? buildCost / savedCostMonth : Infinity;
    const threeYearNet = savedCostMonth * 36 - buildCost;
    const fteEquivalent = savedHoursMonth / AUTOMATION.workingHoursPerMonth;

    return {
      rate,
      hoursMonth,
      savedHoursMonth,
      savedHoursYear: savedHoursMonth * 12,
      savedCostMonth,
      savedYear,
      paybackMonths,
      threeYearNet,
      fteEquivalent,
    };
  }, [people, hoursPerWeek, role, share, buildCost, runCost]);

  const worthIt = model.paybackMonths <= 18 && model.savedCostMonth > 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
        <div className="flex flex-col gap-6">
          <Panel
            title="01 — The manual task"
            note="Pick one specific, repetitive task — order entry, invoice creation, lead routing, report assembly."
          >
            <Row>
              <Field label="People doing it">
                <NumberInput value={people} onChange={setPeople} min={1} max={200} />
              </Field>
              <Field label="Hours each per week">
                <NumberInput value={hoursPerWeek} onChange={setHoursPerWeek} min={0.5} max={40} step={0.5} />
              </Field>
            </Row>
            <div className="mt-6">
              <p className="t-mono mb-3 text-ink-3">Who does it today?</p>
              <Choice options={ROLES} value={role} onChange={setRole} columns={2} />
            </div>
          </Panel>

          <Panel title="02 — How much can actually be automated?">
            <Slider
              value={Math.round(share * 100)}
              onChange={(n) => setShare(n / 100)}
              min={20}
              max={95}
              format={(n) => `${n}%`}
            />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-3">
              Rule-based, high-volume work sits at the top of the range. Anything
              needing judgement, chasing people, or reading messy documents sits
              lower. {formatPercent(AUTOMATION.automatableShare.mid, 0)} is a fair
              default for a well-scoped workflow.
            </p>
          </Panel>

          <Panel title="03 — What it costs to build">
            <Row>
              <Field label="One-off build cost" hint="Our estimate, or a quote you already have">
                <MoneyInput valueINR={buildCost} onChangeINR={setBuildCost} stepINR={10000} />
              </Field>
              <Field label="Running cost / month" hint="Tooling, API calls, hosting">
                <MoneyInput valueINR={runCost} onChangeINR={setRunCost} stepINR={500} />
              </Field>
            </Row>
          </Panel>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
          <div className={`p-7 text-paper md:p-9 ${worthIt ? "bg-ink" : "bg-ink-2"}`}>
            <Headline
              label="Payback period"
              value={
                Number.isFinite(model.paybackMonths) && model.paybackMonths > 0
                  ? `${model.paybackMonths.toFixed(1)} months`
                  : "Never"
              }
              sub={
                worthIt
                  ? `After that it returns about ${money(model.savedCostMonth)} every month.`
                  : "At these numbers the build does not pay for itself in a sensible window. Worth automating something else first."
              }
              tone="dark"
            />
            <div className="mt-7">
              <StatRow
                tone="dark"
                items={[
                  { label: "Hours saved / month", value: formatNumber(model.savedHoursMonth) },
                  { label: "Hours saved / year", value: formatNumber(model.savedHoursYear) },
                  { label: "Equivalent headcount", value: `${model.fteEquivalent.toFixed(2)} FTE` },
                  { label: "Net saving / year", value: compact(model.savedYear) },
                  {
                    label: "Three-year net",
                    value: `${model.threeYearNet >= 0 ? "" : "−"}${compact(Math.abs(model.threeYearNet))}`,
                  },
                ]}
              />
            </div>
            {currency.code !== "INR" && (
              <p className="t-mono mt-6 text-white/40">
                Converted from INR at indicative rates, {RATES_UPDATED}
              </p>
            )}
          </div>

          <Panel title="Where the time goes today">
            <StatRow
              items={[
                { label: "Total hours on this task / month", value: formatNumber(model.hoursMonth) },
                { label: "Loaded cost of those hours", value: money(model.hoursMonth * model.rate) },
                { label: "Automatable share", value: formatPercent(share, 0) },
                { label: "Left for humans", value: formatNumber(model.hoursMonth * (1 - share)) },
              ]}
            />
            <div className="mt-6">
              <Assumptions
                items={[
                  `Loaded hourly cost of ${money(model.rate)} for a ${ROLES.find((r) => r.id === role)?.label.toLowerCase()} — salary plus overheads, not take-home pay.`,
                  `A working month is taken as ${AUTOMATION.workingHoursPerMonth} hours.`,
                  "Saved hours are real only if they get reassigned to something useful. Automation that just creates idle time saves nothing.",
                  "Running costs are subtracted before payback is calculated.",
                  "We would refuse to build this if the task takes under an hour a month — the maintenance would outlive the value.",
                ]}
              />
            </div>
          </Panel>
        </div>
      </div>

      <SendResult
        source="automation-roi"
        service="Workflow Automation"
        headline="Want us to scope the build properly?"
        body="Send this over and we'll come back with what it would actually take, and whether there's a cheaper task worth doing first."
        payload={{
          people,
          hoursPerWeek,
          role,
          share,
          buildCostINR: buildCost,
          runCostINR: runCost,
          currency: currency.code,
          savedHoursMonth: model.savedHoursMonth,
          paybackMonths: model.paybackMonths,
        }}
      />
    </div>
  );
}
