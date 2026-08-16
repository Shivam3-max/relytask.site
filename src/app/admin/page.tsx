import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { countCaseStudies, countLeads, countTestimonials, leadSourceCounts, listLeads } from "@/lib/db";
import { AdminPage, Card, Empty, LinkButton, Pill } from "@/components/admin/ui";
import { formatMoney } from "@/lib/currency";
import { getCurrency } from "@/lib/currency";

export const dynamic = "force-dynamic";

const since = (days: number) => new Date(Date.now() - days * 86400_000);

export default async function Page() {
  await requireAdmin();

  const [total, thisWeek, unhandled, recent, bySource, work, testimonials] =
    await Promise.all([
      countLeads(),
      countLeads({ since: since(7) }),
      countLeads({ status: "new" }),
      listLeads({ take: 8 }),
      leadSourceCounts(),
      countCaseStudies(),
      countTestimonials(),
    ]);

  const inr = getCurrency("INR");

  const stats = [
    { label: "Leads, all time", value: String(total) },
    { label: "Last 7 days", value: String(thisWeek) },
    { label: "Awaiting a reply", value: String(unhandled) },
    { label: "Case studies live", value: String(work) },
  ];

  return (
    <AdminPage
      title="Overview"
      sub="Everything that came in, and everything the public site reads from."
      action={<LinkButton href="/admin/leads" variant="primary">All leads →</LinkButton>}
    >
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-paper p-5">
            <p className="t-display text-[clamp(1.75rem,4vw,2.5rem)] text-ink">{s.value}</p>
            <p className="t-mono mt-2 text-ink-3">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card title="Recent leads" note="Newest first. Click through to update status and add notes.">
          {recent.length === 0 ? (
            <Empty>Nothing yet. Submissions from the contact form and the tools land here.</Empty>
          ) : (
            <div className="-mx-5 overflow-x-auto px-5 md:-mx-6 md:px-6">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <thead>
                  <tr className="t-mono text-ink-3">
                    <th className="border-b border-line pb-2.5">Name</th>
                    <th className="border-b border-line pb-2.5">Source</th>
                    <th className="border-b border-line pb-2.5">Score</th>
                    <th className="border-b border-line pb-2.5">Status</th>
                    <th className="border-b border-line pb-2.5">When</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((l) => (
                    <tr key={l.id}>
                      <td className="border-b border-line py-3 text-[0.875rem]">
                        <Link href={`/admin/leads#${l.id}`} className="text-ink hover:text-flame">
                          {l.name ?? "—"}
                        </Link>
                        <span className="block text-[0.75rem] text-mist">
                          {l.email ?? l.phone ?? ""}
                        </span>
                      </td>
                      <td className="border-b border-line py-3 text-[0.8125rem] text-ink-3">
                        {l.source}
                      </td>
                      <td className="border-b border-line py-3 text-[0.875rem] tabular-nums text-ink-2">
                        {l.score}
                      </td>
                      <td className="border-b border-line py-3">
                        <Pill tone={l.status}>{l.status}</Pill>
                      </td>
                      <td className="border-b border-line py-3 text-[0.75rem] text-mist">
                        {l.createdAt.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="flex flex-col gap-6">
          <Card title="Where they came from">
            {bySource.length === 0 ? (
              <Empty>No submissions yet.</Empty>
            ) : (
              <dl className="flex flex-col">
                {bySource
                  .sort((a, b) => b.count - a.count)
                  .map((s) => (
                    <div
                      key={s.source}
                      className="flex items-center justify-between border-t border-line py-2.5 first:border-t-0 first:pt-0"
                    >
                      <dt className="text-[0.875rem] text-ink-2">{s.source}</dt>
                      <dd className="t-mono text-ink">{s.count}</dd>
                    </div>
                  ))}
              </dl>
            )}
          </Card>

          <Card title="Content">
            <dl className="flex flex-col">
              {[
                { k: "Case studies", v: work, href: "/admin/work" },
                { k: "Testimonials", v: testimonials, href: "/admin/testimonials" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between border-t border-line py-2.5 first:border-t-0 first:pt-0"
                >
                  <dt className="text-[0.875rem] text-ink-2">{r.k}</dt>
                  <dd className="flex items-center gap-3">
                    <span className="t-mono text-ink">{r.v}</span>
                    <Link href={r.href} className="t-mono text-flame hover:underline">
                      manage
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
            {work === 0 && (
              <p className="mt-4 text-[0.75rem] leading-relaxed text-mist">
                With none saved, the site falls back to the six case studies written
                into the code, so /work is never empty.
              </p>
            )}
          </Card>

          <Card title="Quick edits">
            <div className="flex flex-wrap gap-2">
              <LinkButton href="/admin/pricing">Rate card</LinkButton>
              <LinkButton href="/admin/benchmarks">Benchmarks</LinkButton>
              <LinkButton href="/admin/settings">FX & stats</LinkButton>
            </div>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-mist">
              Base currency is INR ({formatMoney(100000, inr)} shown as an example).
              Everything else converts from it.
            </p>
          </Card>
        </div>
      </div>
    </AdminPage>
  );
}
