import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { leadSourceCounts, listLeads } from "@/lib/db";
import { deleteLead, updateLead } from "../actions";
import { AdminPage, Button, Card, Empty, Pill, inputClass } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

type Search = { status?: string; source?: string };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  await requireAdmin();
  const { status, source } = await searchParams;

  const [leads, sources] = await Promise.all([
    listLeads({
      status: status && status !== "all" ? status : undefined,
      source: source && source !== "all" ? source : undefined,
      take: 200,
    }),
    leadSourceCounts(),
  ]);

  const filterLink = (next: Partial<Search>) => {
    const p = new URLSearchParams();
    const s = next.status ?? status;
    const src = next.source ?? source;
    if (s && s !== "all") p.set("status", s);
    if (src && src !== "all") p.set("source", src);
    const q = p.toString();
    return q ? `/admin/leads?${q}` : "/admin/leads";
  };

  return (
    <AdminPage
      title="Leads"
      sub="Contact enquiries and tool submissions. Tool leads carry the inputs and the computed result, so the first reply can be about their numbers."
    >
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="t-mono text-mist">Status</span>
          {["all", ...STATUSES].map((s) => (
            <Link
              key={s}
              href={filterLink({ status: s })}
              className={`t-mono px-3 py-1.5 transition-colors duration-200 ${
                (status ?? "all") === s
                  ? "bg-ink text-paper"
                  : "border border-line text-ink-3 hover:border-ink hover:text-ink"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
        {sources.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="t-mono text-mist">Source</span>
            {["all", ...sources.map((s) => s.source)].map((s) => (
              <Link
                key={s}
                href={filterLink({ source: s })}
                className={`t-mono px-3 py-1.5 transition-colors duration-200 ${
                  (source ?? "all") === s
                    ? "bg-ink text-paper"
                    : "border border-line text-ink-3 hover:border-ink hover:text-ink"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>
        )}
      </div>

      {leads.length === 0 ? (
        <Empty>No leads match that filter.</Empty>
      ) : (
        <div className="flex flex-col gap-4">
          {leads.map((l) => {
            const payload = l.payload ? safeParse(l.payload) : null;
            return (
              <Card key={l.id} className="scroll-mt-24">
                <div id={l.id} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  {/* Left: who and what */}
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[1.125rem] font-semibold tracking-tight text-ink">
                        {l.name ?? "Unnamed"}
                      </h3>
                      <Pill tone={l.status}>{l.status}</Pill>
                      <span className="t-mono text-mist">score {l.score}</span>
                      <span className="t-mono text-mist">{l.source}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[0.875rem]">
                      {l.email && (
                        <a href={`mailto:${l.email}`} className="text-ink-2 hover:text-flame">
                          {l.email}
                        </a>
                      )}
                      {l.phone && (
                        <a href={`tel:${l.phone}`} className="text-ink-2 hover:text-flame">
                          {l.phone}
                        </a>
                      )}
                      {l.company && <span className="text-ink-3">{l.company}</span>}
                    </div>

                    <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                      {[
                        { k: "Service", v: l.service },
                        { k: "Budget", v: l.budget },
                        { k: "Timeline", v: l.timeline },
                        {
                          k: "Received",
                          v: l.createdAt.toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }),
                        },
                      ]
                        .filter((r) => r.v)
                        .map((r) => (
                          <div key={r.k}>
                            <dt className="t-mono text-mist">{r.k}</dt>
                            <dd className="mt-0.5 text-[0.875rem] text-ink-2">{r.v}</dd>
                          </div>
                        ))}
                    </dl>

                    {l.message && (
                      <p className="mt-4 border-l-2 border-line pl-4 text-[0.875rem] leading-relaxed text-ink-2">
                        {l.message}
                      </p>
                    )}

                    {payload && (
                      <details className="group mt-4">
                        <summary className="t-mono cursor-pointer list-none text-ink-3 hover:text-ink">
                          Tool inputs & result
                          <span className="ml-2 text-flame transition-transform duration-200 group-open:rotate-45 inline-block">
                            +
                          </span>
                        </summary>
                        <pre className="mt-3 max-h-72 overflow-auto border border-line bg-paper-2 p-3 text-[0.6875rem] leading-relaxed text-ink-2">
                          {JSON.stringify(payload, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>

                  {/* Right: triage */}
                  <div className="border-t border-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <form action={updateLead} className="flex flex-col gap-3">
                      <input type="hidden" name="id" value={l.id} />
                      <label className="block">
                        <span className="t-mono mb-1.5 block text-ink-3">Status</span>
                        <select name="status" defaultValue={l.status} className={inputClass}>
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="block">
                        <span className="t-mono mb-1.5 block text-ink-3">Notes</span>
                        <textarea
                          name="notes"
                          rows={4}
                          defaultValue={l.notes ?? ""}
                          placeholder="What was said, what happens next"
                          className={`${inputClass} resize-y`}
                        />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <Button>Save</Button>
                      </div>
                    </form>

                    <form action={deleteLead} className="mt-3">
                      <input type="hidden" name="id" value={l.id} />
                      <Button variant="danger">Delete</Button>
                    </form>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </AdminPage>
  );
}

function safeParse(json: string) {
  try {
    return JSON.parse(json);
  } catch {
    return { raw: json };
  }
}
