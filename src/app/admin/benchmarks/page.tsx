import { requireAdmin } from "@/lib/auth";
import { getBenchmarks, KEYS } from "@/lib/settings";
import { resetToDefaults, saveBenchmarks } from "../actions";
import { AdminPage, BandRow, Button, Card, Text } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  await requireAdmin();
  const b = await getBenchmarks();

  return (
    <AdminPage
      title="Benchmarks"
      sub="The numbers the Outreach ROI, ROAS and Automation calculators run on. Low / mid / high drive the three scenario columns — mid is the one shown as 'Expected'."
      action={
        <form action={resetToDefaults}>
          <input type="hidden" name="key" value={KEYS.benchmarks} />
          <Button variant="danger">Reset to defaults</Button>
        </form>
      }
    >
      <form action={saveBenchmarks} className="flex flex-col gap-6">
        <Card
          title="Outreach"
          note="Percentages are entered as whole numbers — 3.1 means 3.1%."
        >
          <BandRow
            prefix="outreach.deliverableRate"
            label="Deliverable rate"
            hint="Share of a list that survives verification"
            value={b.outreach.deliverableRate}
            multiplier={100}
            suffix="%"
          />
          <BandRow
            prefix="outreach.replyRate"
            label="Reply rate"
            hint="Replies as a share of mail delivered"
            value={b.outreach.replyRate}
            multiplier={100}
            suffix="%"
          />
          <BandRow
            prefix="outreach.positiveShare"
            label="Positive share"
            hint="Replies that are interested rather than a no"
            value={b.outreach.positiveShare}
            multiplier={100}
            suffix="%"
          />
          <BandRow
            prefix="outreach.meetingRate"
            label="Meeting rate"
            hint="Meetings as a share of mail delivered"
            value={b.outreach.meetingRate}
            multiplier={100}
            suffix="%"
          />
          <BandRow
            prefix="outreach.closeRate"
            label="Close rate"
            hint="Deals won from a held meeting"
            value={b.outreach.closeRate}
            multiplier={100}
            suffix="%"
          />
          <div className="mt-4 max-w-xs">
            <Text
              name="outreach.emailsPerInboxPerDay"
              label="Emails per inbox per day"
              hint="Used to work out how many warmed inboxes a volume needs"
              type="number"
              defaultValue={b.outreach.emailsPerInboxPerDay}
            />
          </div>
        </Card>

        <Card title="Paid media" note="Costs in INR. CVR is a percentage.">
          <BandRow prefix="paid.metaCpc" label="Meta CPC" hint="₹ per click" value={b.paid.metaCpc} suffix="₹" />
          <BandRow prefix="paid.metaCpm" label="Meta CPM" hint="₹ per 1,000 impressions" value={b.paid.metaCpm} suffix="₹" />
          <BandRow prefix="paid.googleCpc" label="Google CPC" hint="₹ per click" value={b.paid.googleCpc} suffix="₹" />
          <BandRow
            prefix="paid.landingCvr"
            label="Landing page CVR"
            hint="Default position of the conversion-rate slider"
            value={b.paid.landingCvr}
            multiplier={100}
            suffix="%"
          />
        </Card>

        <Card title="Automation" note="Loaded hourly cost by role band, in INR.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Text
              name="automation.hourlyCost.junior"
              label="Junior / data entry"
              type="number"
              defaultValue={b.automation.hourlyCost.junior}
            />
            <Text
              name="automation.hourlyCost.executive"
              label="Executive"
              type="number"
              defaultValue={b.automation.hourlyCost.executive}
            />
            <Text
              name="automation.hourlyCost.manager"
              label="Manager"
              type="number"
              defaultValue={b.automation.hourlyCost.manager}
            />
            <Text
              name="automation.hourlyCost.senior"
              label="Senior / specialist"
              type="number"
              defaultValue={b.automation.hourlyCost.senior}
            />
          </div>
          <div className="mt-5">
            <BandRow
              prefix="automation.automatableShare"
              label="Automatable share"
              hint="Range of the slider on the automation tool"
              value={b.automation.automatableShare}
              multiplier={100}
              suffix="%"
            />
          </div>
          <div className="mt-4 max-w-xs">
            <Text
              name="automation.workingHoursPerMonth"
              label="Working hours per month"
              hint="Used for the full-time-equivalent figure"
              type="number"
              defaultValue={b.automation.workingHoursPerMonth}
            />
          </div>
        </Card>

        <div className="sticky bottom-0 -mx-5 border-t border-line bg-paper/95 px-5 py-4 backdrop-blur-md md:-mx-8 md:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Save benchmarks</Button>
            <p className="text-[0.75rem] text-mist">
              The published sources shown on the tools stay as they are — update those in
              lib/benchmarks.ts if you change a figure away from what the research says.
            </p>
          </div>
        </div>
      </form>
    </AdminPage>
  );
}
