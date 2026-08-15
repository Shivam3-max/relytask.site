"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "../CurrencyProvider";
import { PAID as PAID_META, SOURCES } from "@/lib/benchmarks";
import type { BenchmarkSettings } from "@/lib/settings";
import { formatNumber, formatPercent, RATES_UPDATED } from "@/lib/currency";
import SendResult from "./SendResult";
import {
  Assumptions,
  Choice,
  Field,
  Headline,
  MoneyInput,
  Panel,
  Row,
  Scenarios,
  Slider,
  StatRow,
} from "./ui";

type Channel = "meta" | "google";
type Band = "low" | "mid" | "high";
const BANDS: Band[] = ["low", "mid", "high"];

export default function RoasCalculator({ bm }: { bm: BenchmarkSettings }) {
  const PAID = useMemo(
    () => ({
      meta: {
        cpc: bm.paid.metaCpc,
        cpm: bm.paid.metaCpm,
        note: PAID_META.meta.note,
        source: PAID_META.meta.source,
      },
      google: {
        cpc: bm.paid.googleCpc,
        note: PAID_META.google.note,
        source: PAID_META.google.source,
      },
      landingCvr: bm.paid.landingCvr,
    }),
    [bm],
  );
  const { money, compact, currency } = useCurrency();

  const [channel, setChannel] = useState<Channel>("meta");
  const [budget, setBudget] = useState(200000);
  const [aov, setAov] = useState(3500);
  const [margin, setMargin] = useState(0.45);
  const [cvr, setCvr] = useState<number>(PAID.landingCvr.mid);

  const breakEvenRoas = margin > 0 ? 1 / margin : 0;
  const targetRoas = breakEvenRoas * 1.5;

  const model = useMemo(() => {
    return BANDS.map((band) => {
      const cpc = channel === "meta" ? PAID.meta.cpc[band] : PAID.google.cpc[band];
      // Low CPC is the optimistic case, so flip the band for cost inputs.
      const flipped: Band = band === "low" ? "high" : band === "high" ? "low" : "mid";
      const realCpc = channel === "meta" ? PAID.meta.cpc[flipped] : PAID.google.cpc[flipped];
      const clicks = realCpc > 0 ? budget / realCpc : 0;
      const conversions = clicks * cvr;
      const revenue = conversions * aov;
      const grossProfit = revenue * margin;
      const roas = budget > 0 ? revenue / budget : 0;
      const cac = conversions > 0 ? budget / conversions : 0;
      const netProfit = grossProfit - budget;

      return { band, cpc, realCpc, clicks, conversions, revenue, grossProfit, roas, cac, netProfit };
    });
  }, [channel, budget, aov, margin, cvr, PAID]);

  const mid = model[1];
  const profitable = mid.roas >= breakEvenRoas;
  const ch = channel === "meta" ? PAID.meta : PAID.google;

  const maxCac = aov * margin;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-10">
        <div className="flex flex-col gap-6">
          <Panel title="01 — Channel and budget">
            <Choice
              options={[
                { id: "meta" as const, label: "Meta", note: "Instagram & Facebook" },
                { id: "google" as const, label: "Google", note: "Search & Performance Max" },
              ]}
              value={channel}
              onChange={setChannel}
              columns={2}
            />
            <div className="mt-6">
              <Field label="Monthly ad spend" hint="Platform spend only, excluding management fees">
                <MoneyInput valueINR={budget} onChangeINR={setBudget} stepINR={10000} />
              </Field>
            </div>
          </Panel>

          <Panel title="02 — Your economics">
            <Row>
              <Field label="Average order / deal value">
                <MoneyInput valueINR={aov} onChangeINR={setAov} stepINR={500} />
              </Field>
              <Field label="Gross margin" hint="After cost of goods, shipping and returns">
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
              <Field
                label="Landing page conversion rate"
                hint={`Typical range ${formatPercent(PAID.landingCvr.low)}–${formatPercent(PAID.landingCvr.high)}. This is the lever most people ignore.`}
              >
                <div className="pt-2">
                  <Slider
                    value={Number((cvr * 100).toFixed(1))}
                    onChange={(n) => setCvr(n / 100)}
                    min={0.2}
                    max={10}
                    step={0.1}
                    format={(n) => `${n.toFixed(1)}%`}
                  />
                </div>
              </Field>
            </div>
          </Panel>

          <Panel title="The number that decides it">
            <StatRow
              items={[
                { label: "Break-even ROAS", value: `${breakEvenRoas.toFixed(2)}x` },
                { label: "Target ROAS (50% margin of safety)", value: `${targetRoas.toFixed(2)}x` },
                { label: "Most you can pay per customer", value: money(maxCac) },
              ]}
            />
            <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-3">
              At a {formatPercent(margin, 0)} margin you need{" "}
              <strong className="text-ink">{breakEvenRoas.toFixed(2)}x</strong> just to
              stand still. Any agency quoting a ROAS target without asking your
              margin is quoting a number that cannot mean anything.
            </p>
          </Panel>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
          <div className={`p-7 text-paper md:p-9 ${profitable ? "bg-ink" : "bg-flame"}`}>
            <Headline
              label={profitable ? "Projected — profitable" : "Projected — below break-even"}
              value={`${mid.roas.toFixed(2)}x`}
              sub={
                profitable
                  ? `Above the ${breakEvenRoas.toFixed(2)}x you need. Net ${money(mid.netProfit)} a month at this spend.`
                  : `Short of the ${breakEvenRoas.toFixed(2)}x you need. Losing ${money(Math.abs(mid.netProfit))} a month at this spend.`
              }
              tone="dark"
            />
            <div className="mt-7">
              <StatRow
                tone="dark"
                items={[
                  { label: "Clicks / month", value: formatNumber(mid.clicks) },
                  { label: "Conversions / month", value: formatNumber(mid.conversions, 1) },
                  { label: "Revenue / month", value: compact(mid.revenue) },
                  { label: "Cost per acquisition", value: mid.conversions > 0 ? money(mid.cac) : "—" },
                  { label: "Assumed CPC", value: money(mid.realCpc) },
                ]}
              />
            </div>
            {currency.code !== "INR" && (
              <p className="t-mono mt-6 text-white/40">
                Converted from INR at indicative rates, {RATES_UPDATED}
              </p>
            )}
          </div>

          <Panel title="By CPC scenario">
            <Scenarios
              columns={["Cheap clicks", "Typical", "Expensive"]}
              rows={[
                { label: "CPC", values: model.map((m) => money(m.realCpc)) },
                { label: "Clicks", values: model.map((m) => formatNumber(m.clicks)) },
                { label: "Conversions", values: model.map((m) => formatNumber(m.conversions, 1)) },
                { label: "Revenue", values: model.map((m) => compact(m.revenue)) },
                { label: "ROAS", values: model.map((m) => `${m.roas.toFixed(2)}x`), emphasis: true },
                {
                  label: "Net after spend",
                  values: model.map((m) => `${m.netProfit >= 0 ? "" : "−"}${compact(Math.abs(m.netProfit))}`),
                  emphasis: true,
                },
              ]}
            />
            <div className="mt-6">
              <Assumptions
                items={[
                  ch.note,
                  `${channel === "meta" ? "Meta" : "Google"} CPC range used: ${money(ch.cpc.low)}–${money(ch.cpc.high)}, India.`,
                  "Revenue counts first purchase only — repeat orders make the real picture better.",
                  "Platform-reported ROAS usually flatters this by counting returning customers and view-through conversions.",
                  "Below roughly ₹1.5–2L a month on one channel, results are mostly noise rather than signal.",
                  "Management fees, creative production and GST sit outside this number.",
                ]}
                source={channel === "meta" ? SOURCES.metaAds : SOURCES.googleAds}
              />
            </div>
          </Panel>
        </div>
      </div>

      <SendResult
        source="roas-calculator"
        service="Performance Marketing"
        headline="Want a second opinion on these numbers?"
        body="Send it over with your actual account access and we'll tell you whether the gap is creative, targeting, or the page the clicks land on."
        payload={{
          channel,
          budget,
          aov,
          margin,
          cvr,
          currency: currency.code,
          breakEvenRoas,
          projectedRoas: mid.roas,
          netProfitINR: mid.netProfit,
        }}
      />
    </div>
  );
}
