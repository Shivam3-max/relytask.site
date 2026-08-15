import { requireAdmin } from "@/lib/auth";
import { getFx, getStats, KEYS } from "@/lib/settings";
import { resetToDefaults, saveFx, saveStats } from "../actions";
import { AdminPage, Button, Card, Text } from "@/components/admin/ui";
import { CURRENCIES, RATES_UPDATED } from "@/lib/currency";

export const dynamic = "force-dynamic";

export default async function Page() {
  await requireAdmin();
  const [fx, stats] = await Promise.all([getFx(), getStats()]);

  const rows = [...stats];
  while (rows.length < 4) rows.push({ value: 0, suffix: "", label: "" });

  return (
    <AdminPage
      title="Settings"
      sub="Exchange rates and the headline numbers on the home page."
    >
      <div className="flex flex-col gap-6">
        <Card
          title="Exchange rates"
          note={`How many rupees one unit of each currency is worth. Everything on the site is priced in INR and converted with these. Currently labelled "${RATES_UPDATED}" on the public pages — update that string in lib/currency.ts when you refresh these.`}
        >
          <form action={saveFx}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CURRENCIES.map((c) => (
                <label key={c.code} className="block">
                  <span className="t-mono mb-1.5 block text-ink-3">
                    {c.code}{" "}
                    <span className="normal-case tracking-normal text-mist">{c.name}</span>
                  </span>
                  <div className="relative">
                    <span className="t-mono pointer-events-none absolute inset-y-0 left-3 flex items-center text-mist">
                      ₹
                    </span>
                    <input
                      name={`fx.${c.code}`}
                      type="number"
                      step="any"
                      min="0.0001"
                      defaultValue={fx[c.code] ?? c.perINR}
                      disabled={c.code === "INR"}
                      className="w-full border border-line bg-paper py-2.5 pl-8 pr-3 text-[0.875rem] text-ink outline-none transition-colors duration-200 focus:border-ink disabled:bg-paper-2 disabled:text-mist"
                    />
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button>Save rates</Button>
              <span className="text-[0.75rem] text-mist">
                INR is the base and always 1.
              </span>
            </div>
          </form>
          <form action={resetToDefaults} className="mt-3 border-t border-line pt-3">
            <input type="hidden" name="key" value={KEYS.fx} />
            <Button variant="danger">Reset rates</Button>
          </form>
        </Card>

        <Card
          title="Home page numbers"
          note="The four counters below the work strip. Leave a label blank to drop that one."
        >
          <form action={saveStats}>
            <div className="flex flex-col gap-4">
              {rows.slice(0, 4).map((s, i) => (
                <div
                  key={i}
                  className="grid gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0 md:grid-cols-[1.6fr_0.7fr_0.6fr_0.6fr_0.6fr]"
                >
                  <Text name={`stats.${i}.label`} label="Label" defaultValue={s.label} />
                  <Text name={`stats.${i}.value`} label="Value" type="number" defaultValue={s.value} />
                  <Text name={`stats.${i}.prefix`} label="Prefix" defaultValue={s.prefix ?? ""} />
                  <Text name={`stats.${i}.suffix`} label="Suffix" defaultValue={s.suffix} />
                  <Text
                    name={`stats.${i}.decimals`}
                    label="Decimals"
                    type="number"
                    defaultValue={s.decimals ?? 0}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Button>Save numbers</Button>
            </div>
          </form>
          <form action={resetToDefaults} className="mt-3 border-t border-line pt-3">
            <input type="hidden" name="key" value={KEYS.stats} />
            <Button variant="danger">Reset numbers</Button>
          </form>
        </Card>

        <Card title="What is not editable here">
          <p className="text-[0.875rem] leading-relaxed text-ink-3">
            Service page copy, the 28 service definitions and the research sources live in
            the codebase rather than the database — they are long-form editorial with
            citations, and a form is the wrong tool for them. Contact details live in{" "}
            <code className="bg-paper-2 px-1.5 py-0.5">src/lib/site.ts</code>.
          </p>
        </Card>
      </div>
    </AdminPage>
  );
}
