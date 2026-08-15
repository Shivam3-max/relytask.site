"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "../CurrencyProvider";
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
  Slider,
  StatRow,
} from "./ui";

const VERDICTS = [
  { min: 5, label: "Underinvesting", tone: "warn", body: "A ratio this high usually means you are leaving growth on the table — you can afford to spend more to acquire, not less." },
  { min: 3, label: "Healthy", tone: "good", body: "The range investors look for. Enough margin to fund growth without the model breaking." },
  { min: 1, label: "Thin", tone: "warn", body: "You are acquiring customers at close to what they are worth. Cash gets tight before it gets better." },
  { min: 0, label: "Unsustainable", tone: "bad", body: "Every new customer costs more than they return. More spend makes this worse, not better." },
];

export default function CacLtv() {
  const { money, compact, currency } = useCurrency();

  const [spend, setSpend] = useState(300000);
  const [salesCost, setSalesCost] = useState(150000);
  const [newCustomers, setNewCustomers] = useState(40);
  const [aov, setAov] = useState(12000);
  const [margin, setMargin] = useState(0.5);
  const [purchasesPerYear, setPurchasesPerYear] = useState(3);
  const [churn, setChurn] = useState(0.3);

  const model = useMemo(() => {
    const totalCost = spend + salesCost;
    const cac = newCustomers > 0 ? totalCost / newCustomers : 0;
    const lifespanYears = churn > 0 ? 1 / churn : 10;
    const grossPerPurchase = aov * margin;
    const annualGross = grossPerPurchase * purchasesPerYear;
    const ltv = annualGross * lifespanYears;
    const ratio = cac > 0 ? ltv / cac : 0;
    const paybackMonths = annualGross > 0 ? (cac / annualGross) * 12 : Infinity;
    const netPerCustomer = ltv - cac;

    return {
      totalCost, cac, lifespanYears, grossPerPurchase, annualGross, ltv, ratio, paybackMonths, netPerCustomer,
    };
  }, [spend, salesCost, newCustomers, aov, margin, purchasesPerYear, churn]);

  const verdict = VERDICTS.find((v) => model.ratio >= v.min) ?? VERDICTS[VERDICTS.length - 1];
  const bg =
    verdict.tone === "good" ? "bg-ink" : verdict.tone === "warn" ? "bg-ink-2" : "bg-flame";

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
        <div className="flex flex-col gap-6">
          <Panel title="01 — What acquisition costs you" note="Take a typical month.">
            <Row>
              <Field label="Ad spend / month">
                <MoneyInput valueINR={spend} onChangeINR={setSpend} stepINR={10000} />
              </Field>
              <Field label="Sales & marketing cost / month" hint="Salaries, agency fees, tools">
                <MoneyInput valueINR={salesCost} onChangeINR={setSalesCost} stepINR={10000} />
              </Field>
            </Row>
            <div className="mt-6">
              <Field label="New customers won / month">
                <NumberInput value={newCustomers} onChange={setNewCustomers} min={1} max={100000} />
              </Field>
            </div>
          </Panel>

          <Panel title="02 — What a customer returns">
            <Row>
              <Field label="Average order value">
                <MoneyInput valueINR={aov} onChangeINR={setAov} stepINR={500} />
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
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <Field label="Purchases per year">
                <NumberInput value={purchasesPerYear} onChange={setPurchasesPerYear} min={0.1} max={365} step={0.1} />
              </Field>
              <Field
                label="Annual churn"
                hint={`Implies an average life of ${model.lifespanYears.toFixed(1)} years`}
              >
                <div className="pt-2">
                  <Slider
                    value={Math.round(churn * 100)}
                    onChange={(n) => setChurn(n / 100)}
                    min={2}
                    max={100}
                    format={(n) => `${n}%`}
                  />
                </div>
              </Field>
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
          <div className={`p-7 text-paper md:p-9 ${bg}`}>
            <Headline
              label={`LTV to CAC — ${verdict.label.toLowerCase()}`}
              value={`${model.ratio.toFixed(1)} : 1`}
              sub={verdict.body}
              tone="dark"
            />
            <div className="mt-7">
              <StatRow
                tone="dark"
                items={[
                  { label: "Customer acquisition cost", value: money(model.cac) },
                  { label: "Lifetime value (gross profit)", value: money(model.ltv) },
                  { label: "Net per customer", value: `${model.netPerCustomer >= 0 ? "" : "−"}${money(Math.abs(model.netPerCustomer))}` },
                  {
                    label: "CAC payback",
                    value: Number.isFinite(model.paybackMonths)
                      ? `${model.paybackMonths.toFixed(1)} months`
                      : "—",
                  },
                  { label: "Average customer life", value: `${model.lifespanYears.toFixed(1)} years` },
                ]}
              />
            </div>
            {currency.code !== "INR" && (
              <p className="t-mono mt-6 text-white/40">
                Converted from INR at indicative rates, {RATES_UPDATED}
              </p>
            )}
          </div>

          <Panel title="The working">
            <StatRow
              items={[
                { label: "Total acquisition cost / month", value: money(model.totalCost) },
                { label: "Gross profit per purchase", value: money(model.grossPerPurchase) },
                { label: "Gross profit per year, per customer", value: money(model.annualGross) },
                { label: "Customers / month", value: formatNumber(newCustomers) },
                { label: "Implied monthly gross profit", value: compact(model.annualGross * newCustomers / 12) },
              ]}
            />
            <div className="mt-6">
              <Assumptions
                items={[
                  "LTV here is gross profit, not revenue. Revenue-based LTV flatters every business and is the most common way this number gets misused.",
                  `Average customer life is derived from churn as 1 ÷ ${formatPercent(churn, 0)}.`,
                  "A 3:1 ratio is the usual healthy benchmark; under 1:1 the model loses money on every customer.",
                  "CAC payback under 12 months keeps cash flow manageable for most service businesses.",
                  "Discounting future cash flows would lower LTV slightly — this model does not discount, so treat it as the optimistic end.",
                ]}
              />
            </div>
          </Panel>
        </div>
      </div>

      <SendResult
        source="cac-ltv"
        service="Performance Marketing"
        headline="Want to know which lever moves this fastest?"
        body="Send the numbers and we'll tell you whether to attack acquisition cost, conversion, margin or retention first — they are rarely equally worth it."
        payload={{
          spendINR: spend,
          salesCostINR: salesCost,
          newCustomers,
          aovINR: aov,
          margin,
          purchasesPerYear,
          churn,
          currency: currency.code,
          cacINR: model.cac,
          ltvINR: model.ltv,
          ratio: model.ratio,
        }}
      />
    </div>
  );
}
