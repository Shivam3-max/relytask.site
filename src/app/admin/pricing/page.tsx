import { requireAdmin } from "@/lib/auth";
import { getRateCard, KEYS } from "@/lib/settings";
import { resetToDefaults, saveRateCard } from "../actions";
import { AdminPage, Button, Card, Text, inputClass } from "@/components/admin/ui";
import type { Option } from "@/lib/pricing";

export const dynamic = "force-dynamic";

function OptionGroup({
  prefix,
  options,
  showNote = true,
}: {
  prefix: string;
  options: Option[];
  showNote?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div className="t-mono hidden gap-3 border-b border-line pb-2 text-mist md:grid md:grid-cols-[1.3fr_1.6fr_0.8fr_0.6fr]">
        <span>Label</span>
        <span>{showNote ? "Note" : ""}</span>
        <span>Cost (₹)</span>
        <span>Days</span>
      </div>
      {options.map((o) => (
        <div
          key={o.id}
          className="grid gap-3 border-b border-line py-3 md:grid-cols-[1.3fr_1.6fr_0.8fr_0.6fr] md:items-center"
        >
          <input
            name={`${prefix}.${o.id}.label`}
            defaultValue={o.label}
            className={inputClass}
            aria-label={`${o.id} label`}
          />
          <input
            name={`${prefix}.${o.id}.note`}
            defaultValue={o.note ?? ""}
            placeholder={showNote ? "Short description" : "—"}
            className={inputClass}
            aria-label={`${o.id} note`}
          />
          <input
            name={`${prefix}.${o.id}.cost`}
            type="number"
            step="any"
            defaultValue={o.cost}
            className={inputClass}
            aria-label={`${o.id} cost`}
          />
          <input
            name={`${prefix}.${o.id}.days`}
            type="number"
            step="any"
            defaultValue={o.days}
            className={inputClass}
            aria-label={`${o.id} days`}
          />
        </div>
      ))}
    </div>
  );
}

export default async function Page() {
  await requireAdmin();
  const card = await getRateCard();

  return (
    <AdminPage
      title="Rate card"
      sub="Every number behind the Website & App Cost Estimator. All costs are in INR — the tool converts to whatever currency the visitor picked. Changes take effect immediately, no deploy."
      action={
        <form action={resetToDefaults}>
          <input type="hidden" name="key" value={KEYS.rateCard} />
          <Button variant="danger">Reset to defaults</Button>
        </form>
      }
    >
      <form action={saveRateCard} className="flex flex-col gap-6">
        <Card title="Build types" note="The starting point a visitor picks first.">
          <OptionGroup prefix="buildTypes" options={card.buildTypes} />
        </Card>

        <Card title="Features" note="Add-ons, each with its own cost and days.">
          <OptionGroup prefix="features" options={card.features} showNote={false} />
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Design approach">
            <OptionGroup prefix="design" options={card.design} />
          </Card>
          <Card title="CMS options">
            <OptionGroup prefix="cms" options={card.cms} />
          </Card>
        </div>

        <Card title="Support / AMC" note="Cost is the 12-month total; the tool divides it to show a monthly figure.">
          <OptionGroup prefix="support" options={card.support} />
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Pages">
            <div className="grid gap-4 sm:grid-cols-3">
              <Text name="pages.included" label="Included free" type="number" defaultValue={card.pages.included} />
              <Text name="pages.perPage" label="Cost per extra (₹)" type="number" defaultValue={card.pages.perPage} />
              <Text name="pages.daysPerPage" label="Days per page" type="number" defaultValue={card.pages.daysPerPage} />
            </div>
          </Card>

          <Card title="Integrations">
            <div className="grid gap-4 sm:grid-cols-2">
              <Text
                name="integrations.perIntegration"
                label="Cost each (₹)"
                type="number"
                defaultValue={card.integrations.perIntegration}
              />
              <Text
                name="integrations.daysPer"
                label="Days each"
                type="number"
                defaultValue={card.integrations.daysPer}
              />
            </div>
          </Card>
        </div>

        <Card title="Estimate shaping">
          <div className="grid gap-4 sm:grid-cols-2">
            <Text
              name="bandWidth"
              label="Band width (%)"
              hint="How far the low/high range sits either side of the mid-point. 15 means ±15%."
              type="number"
              defaultValue={Math.round(card.bandWidth * 100)}
            />
            <Text
              name="rushMultiplier"
              label="Rush multiplier"
              hint="1.35 means rush delivery costs 35% more and cuts the timeline by roughly 28%."
              type="number"
              defaultValue={card.rushMultiplier}
            />
          </div>
        </Card>

        <div className="sticky bottom-0 -mx-5 border-t border-line bg-paper/95 px-5 py-4 backdrop-blur-md md:-mx-8 md:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Save rate card</Button>
            <p className="text-[0.75rem] text-mist">
              Applies to the live estimator the moment you save.
            </p>
          </div>
        </div>
      </form>
    </AdminPage>
  );
}
