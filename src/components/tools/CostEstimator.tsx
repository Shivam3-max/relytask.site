"use client";

import { useMemo, useState } from "react";
import { useCurrency } from "../CurrencyProvider";
import { DEFAULT_RATE_CARD as CARD, estimate } from "@/lib/pricing";
import { GST_RATE, SOURCES } from "@/lib/benchmarks";
import { RATES_UPDATED } from "@/lib/currency";
import SendResult from "./SendResult";
import {
  Assumptions,
  CheckGrid,
  Choice,
  Field,
  Headline,
  Panel,
  Row,
  StatRow,
  Stepper,
  Toggle,
} from "./ui";

export default function CostEstimator() {
  const { money, currency } = useCurrency();

  const [buildType, setBuildType] = useState(CARD.buildTypes[1].id);
  const [pages, setPages] = useState(8);
  const [design, setDesign] = useState(CARD.design[1].id);
  const [cms, setCms] = useState(CARD.cms[1].id);
  const [features, setFeatures] = useState<string[]>(["analytics", "seo"]);
  const [integrations, setIntegrations] = useState(1);
  const [support, setSupport] = useState(CARD.support[1].id);
  const [rush, setRush] = useState(false);
  const [gst, setGst] = useState(true);

  const result = useMemo(
    () => estimate({ buildType, pages, features, design, cms, integrations, support, rush }, CARD),
    [buildType, pages, features, design, cms, integrations, support, rush],
  );

  const tax = (n: number) => (gst ? n * (1 + GST_RATE) : n);
  const build = CARD.buildTypes.find((b) => b.id === buildType);

  const toggleFeature = (id: string) =>
    setFeatures((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-10">
      {/* ── Inputs ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <Panel title="01 — What are we building?">
          <Choice
            options={CARD.buildTypes.map((b) => ({ id: b.id, label: b.label, note: b.note }))}
            value={buildType}
            onChange={setBuildType}
            columns={2}
          />
        </Panel>

        <Panel title="02 — Size and design">
          <Row>
            <Field
              label="Pages / screens"
              hint={`${CARD.pages.included} included, then ${money(CARD.pages.perPage)} each`}
            >
              <Stepper value={pages} onChange={setPages} min={1} max={200} />
            </Field>
            <Field
              label="Third-party integrations"
              hint={`${money(CARD.integrations.perIntegration)} each — payments, CRM, Tally, shipping`}
            >
              <Stepper value={integrations} onChange={setIntegrations} min={0} max={30} />
            </Field>
          </Row>

          <div className="mt-6">
            <p className="t-mono mb-3 text-ink-3">Design approach</p>
            <Choice
              options={CARD.design.map((d) => ({ id: d.id, label: d.label, note: d.note }))}
              value={design}
              onChange={setDesign}
              columns={3}
            />
          </div>

          <div className="mt-6">
            <p className="t-mono mb-3 text-ink-3">Who edits the content?</p>
            <Choice
              options={CARD.cms.map((c) => ({ id: c.id, label: c.label, note: c.note }))}
              value={cms}
              onChange={setCms}
              columns={3}
            />
          </div>
        </Panel>

        <Panel title="03 — Features">
          <CheckGrid
            options={CARD.features.map((f) => ({ id: f.id, label: f.label }))}
            value={features}
            onToggle={toggleFeature}
          />
        </Panel>

        <Panel title="04 — After launch">
          <Choice
            options={CARD.support.map((s) => ({ id: s.id, label: s.label, note: s.note }))}
            value={support}
            onChange={setSupport}
            columns={3}
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Toggle
              label="Rush delivery"
              note={`Compresses the timeline ~28%, costs ${Math.round((CARD.rushMultiplier - 1) * 100)}% more`}
              checked={rush}
              onChange={setRush}
            />
            <Toggle
              label="Show GST"
              note="18%, applies to Indian clients"
              checked={gst}
              onChange={setGst}
            />
          </div>
        </Panel>
      </div>

      {/* ── Result ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
        <div className="bg-ink p-7 text-paper md:p-9">
          <Headline
            label="Estimated investment"
            value={`${money(tax(result.low))} – ${money(tax(result.high))}`}
            sub={
              gst
                ? "Including 18% GST. Excludes third-party licences and ad spend."
                : "Before GST. Excludes third-party licences and ad spend."
            }
            tone="dark"
          />

          <div className="mt-7">
            <StatRow
              tone="dark"
              items={[
                { label: "Mid-point", value: money(tax(result.point)) },
                { label: "Build time", value: `${result.weeks} weeks` },
                { label: "Working days", value: `${result.days}` },
                {
                  label: "Indicative monthly AMC",
                  value:
                    support === "none"
                      ? "—"
                      : money(
                          (CARD.support.find((s) => s.id === support)?.cost ?? 0) / 12,
                        ),
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

        <Panel title="What makes up the number">
          <dl className="flex flex-col">
            {result.lines.map((l) => (
              <div
                key={l.label}
                className="flex items-baseline justify-between gap-6 border-t border-line py-3 first:border-t-0 first:pt-0"
              >
                <dt className="text-[0.875rem] text-ink-3">{l.label}</dt>
                <dd className="shrink-0 text-[0.9375rem] font-medium tabular-nums text-ink">
                  {money(l.cost)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <Assumptions
              items={[
                `Based on a ${build?.label.toLowerCase()} as the starting point.`,
                `A ±${Math.round(CARD.bandWidth * 100)}% band is applied — the real number lands inside it once scope is pinned down.`,
                "Content, photography and ad spend are not included unless you add them as features.",
                "Third-party licences (fonts, plugins, hosting, SaaS) are billed at cost.",
                "Timeline assumes content and approvals arrive on schedule — that is the usual cause of slippage, not development.",
                "Payment is milestone-based, never fully up front.",
              ]}
              source={SOURCES.webCost}
            />
          </div>
        </Panel>

        <SendResult
          source="cost-estimator"
          service="Websites & Web Apps"
          headline="Want this as a proper quote?"
          body="Send it over and we'll come back with a fixed-scope proposal — same numbers, with the assumptions made explicit."
          payload={{
            buildType,
            pages,
            design,
            cms,
            features,
            integrations,
            support,
            rush,
            currency: currency.code,
            estimateINR: { low: result.low, point: result.point, high: result.high },
            weeks: result.weeks,
          }}
        />
      </div>
    </div>
  );
}
