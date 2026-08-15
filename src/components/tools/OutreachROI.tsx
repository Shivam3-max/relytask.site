"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "../CurrencyProvider";
import { OUTREACH, SOURCES } from "@/lib/benchmarks";
import { formatNumber, formatPercent, RATES_UPDATED } from "@/lib/currency";
import SendResult from "./SendResult";
import {
  Assumptions,
  Field,
  Headline,
  MoneyInput,
  NumberInput,
  Panel,
  Row,
  Scenarios,
  Slider,
  StatRow,
} from "./ui";

type Band = "low" | "mid" | "high";
const BANDS: Band[] = ["low", "mid", "high"];

export default function OutreachROI() {
  const { money, compact, currency } = useCurrency();

  const [contacts, setContacts] = useState(2000);
  const [dealValue, setDealValue] = useState(250000);
  const [margin, setMargin] = useState(0.55);
  const [monthlyCost, setMonthlyCost] = useState(120000);
  const [months, setMonths] = useState(6);

  const model = useMemo(() => {
    return BANDS.map((band) => {
      const delivered = contacts * OUTREACH.deliverableRate[band];
      const replies = delivered * OUTREACH.replyRate[band];
      const positive = replies * OUTREACH.positiveShare[band];
      const meetings = delivered * OUTREACH.meetingRate[band];
      const deals = meetings * OUTREACH.closeRate[band];
      const revenue = deals * dealValue;
      const grossProfit = revenue * margin;
      const cost = monthlyCost;
      const roi = cost > 0 ? (grossProfit - cost) / cost : 0;
      const costPerMeeting = meetings > 0 ? cost / meetings : 0;
      const cac = deals > 0 ? cost / deals : 0;

      return { band, delivered, replies, positive, meetings, deals, revenue, grossProfit, cost, roi, costPerMeeting, cac };
    });
  }, [contacts, dealValue, margin, monthlyCost]);

  const mid = model[1];
  const inboxes = Math.max(1, Math.ceil(contacts / (OUTREACH.emailsPerInboxPerDay * 22)));
  const cumulative = {
    cost: mid.cost * months,
    revenue: mid.revenue * months,
    profit: mid.grossProfit * months - mid.cost * months,
  };
  const breakEvenMonths =
    mid.grossProfit > mid.cost ? 1 : mid.grossProfit > 0 ? Math.ceil(mid.cost / mid.grossProfit) : 0;

  const fmtBand = (b: Band) =>
    b === "low" ? "Conservative" : b === "mid" ? "Expected" : "Strong";

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
        {/* ── Inputs ────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <Panel title="01 — Your programme" note="Everything below is per month.">
            <Row>
              <Field label="Contacts reached / month" hint={`Needs about ${inboxes} warmed inbox${inboxes > 1 ? "es" : ""}`}>
                <NumberInput value={contacts} onChange={setContacts} min={100} max={100000} step={100} />
              </Field>
              <Field label="Programme cost / month" hint="Ours, plus tooling and inbox costs">
                <MoneyInput valueINR={monthlyCost} onChangeINR={setMonthlyCost} stepINR={5000} />
              </Field>
            </Row>
          </Panel>

          <Panel title="02 — What a customer is worth">
            <Row>
              <Field label="Average deal value" hint="First contract, not lifetime">
                <MoneyInput valueINR={dealValue} onChangeINR={setDealValue} stepINR={10000} />
              </Field>
              <Field label="Gross margin">
                <div className="pt-2">
                  <Slider
                    value={Math.round(margin * 100)}
                    onChange={(n) => setMargin(n / 100)}
                    min={5}
                    max={95}
                    format={(n) => `${n}%`}
                  />
                </div>
              </Field>
            </Row>
            <div className="mt-6">
              <Field label="Run the programme for">
                <div className="pt-2">
                  <Slider value={months} onChange={setMonths} min={1} max={24} format={(n) => `${n} months`} />
                </div>
              </Field>
            </div>
          </Panel>

          <Panel title="Reality check">
            <p className="text-[0.9375rem] leading-relaxed text-ink-3">
              The Expected column uses published 2026 medians, not the numbers in
              an agency pitch deck. If the Conservative column already works for
              you, outbound is a good bet. If only the Strong column works, the
              maths is too tight and we would tell you so.
            </p>
          </Panel>
        </div>

        {/* ── Result ────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
          <div className="bg-ink p-7 text-paper md:p-9">
            <Headline
              label="Expected monthly return"
              value={`${mid.roi >= 0 ? "+" : ""}${Math.round(mid.roi * 100)}%`}
              sub={`On ${money(mid.cost)} a month, gross profit of ${money(mid.grossProfit)}.`}
              tone="dark"
            />
            <div className="mt-7">
              <StatRow
                tone="dark"
                items={[
                  { label: "Meetings / month", value: formatNumber(mid.meetings, 1) },
                  { label: "Deals / month", value: formatNumber(mid.deals, 1) },
                  { label: "Cost per meeting", value: money(mid.costPerMeeting) },
                  { label: "Cost per customer", value: mid.deals > 0 ? money(mid.cac) : "—" },
                  {
                    label: `Net over ${months} months`,
                    value: `${cumulative.profit >= 0 ? "" : "−"}${compact(Math.abs(cumulative.profit))}`,
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

          <Panel title="Funnel, by scenario">
            <Scenarios
              columns={BANDS.map(fmtBand)}
              rows={[
                { label: "Delivered", values: model.map((m) => formatNumber(m.delivered)) },
                { label: "Replies", values: model.map((m) => formatNumber(m.replies)) },
                { label: "Positive replies", values: model.map((m) => formatNumber(m.positive, 1)) },
                { label: "Meetings held", values: model.map((m) => formatNumber(m.meetings, 1)), emphasis: true },
                { label: "Deals closed", values: model.map((m) => formatNumber(m.deals, 1)), emphasis: true },
                { label: "Revenue / month", values: model.map((m) => compact(m.revenue)) },
                { label: "Gross profit", values: model.map((m) => compact(m.grossProfit)) },
                {
                  label: "Return on spend",
                  values: model.map((m) => `${m.roi >= 0 ? "+" : ""}${Math.round(m.roi * 100)}%`),
                  emphasis: true,
                },
              ]}
            />

            <div className="mt-6">
              <Assumptions
                items={[
                  `Deliverability ${formatPercent(OUTREACH.deliverableRate.low, 0)}–${formatPercent(OUTREACH.deliverableRate.high, 0)} after verification.`,
                  `Reply rate ${formatPercent(OUTREACH.replyRate.low)}–${formatPercent(OUTREACH.replyRate.high)}; the median sits near ${formatPercent(OUTREACH.replyRate.mid)}.`,
                  `Meetings ${formatPercent(OUTREACH.meetingRate.low)}–${formatPercent(OUTREACH.meetingRate.high)} of delivered mail.`,
                  `Close rate from a held meeting ${formatPercent(OUTREACH.closeRate.low, 0)}–${formatPercent(OUTREACH.closeRate.high, 0)}.`,
                  `Sending assumes ${OUTREACH.emailsPerInboxPerDay} emails per inbox per day — volume comes from more inboxes, never from pushing one harder.`,
                  breakEvenMonths > 1
                    ? `At these numbers the programme takes roughly ${breakEvenMonths} months of output to cover one month of cost.`
                    : "At these numbers a single month of output covers its own cost.",
                  "Month one is calibration. Judge a programme at 90 days, not 30.",
                ]}
                source={SOURCES.coldEmail}
              />
            </div>
          </Panel>
        </div>
      </div>

      <SendResult
        source="outreach-roi"
        service="Cold Email Campaigns"
        headline="Want us to pressure-test these numbers?"
        body="Send the model over and we'll tell you which assumption is doing the heavy lifting — and whether your list is big enough to support it."
        payload={{
          contacts,
          dealValue,
          margin,
          monthlyCost,
          months,
          currency: currency.code,
          expected: {
            meetings: mid.meetings,
            deals: mid.deals,
            revenueINR: mid.revenue,
            roi: mid.roi,
          },
        }}
      />
    </div>
  );
}
