import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { listCaseStudies } from "@/lib/db";
import { deleteCaseStudy } from "../actions";
import { AdminPage, Button, Card, Empty, LinkButton, Pill } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function Page() {
  await requireAdmin();
  const rows = await listCaseStudies();

  return (
    <AdminPage
      title="IT Projects"
      sub="Projects shown on /it-projects."
      action={<LinkButton href="/admin/work/new" variant="primary">Add a project</LinkButton>}
    >
      {rows.length === 0 ? (
        <Empty>Nothing added yet — add your first project to populate /it-projects.</Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((c) => (
            <Card key={c.id}>
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink">
                      {c.client}
                    </h3>
                    <Pill tone={c.published ? "qualified" : "lost"}>
                      {c.published ? "live" : "draft"}
                    </Pill>
                    {c.featured && <Pill tone="new">featured</Pill>}
                    {c.confidential && <Pill tone="contacted">NDA</Pill>}
                  </div>
                  <p className="mt-1.5 max-w-[62ch] text-[0.875rem] leading-relaxed text-ink-3">
                    {c.title}
                  </p>
                  <p className="t-mono mt-2 text-mist">
                    {c.category} · {c.industry} · /it-projects/{c.slug}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Link
                    href={`/it-projects/${c.slug}`}
                    target="_blank"
                    className="t-mono border border-line px-4 py-2.5 text-ink-3 transition-colors duration-200 hover:border-ink hover:text-ink"
                  >
                    View ↗
                  </Link>
                  <LinkButton href={`/admin/work/${c.id}`}>Edit</LinkButton>
                  <form action={deleteCaseStudy}>
                    <input type="hidden" name="id" value={c.id} />
                    <Button variant="danger">Delete</Button>
                  </form>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminPage>
  );
}
