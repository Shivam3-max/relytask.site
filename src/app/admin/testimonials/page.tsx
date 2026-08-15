import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteTestimonial, saveTestimonial } from "../actions";
import {
  AdminPage,
  Area,
  Button,
  Card,
  Check,
  Empty,
  LinkButton,
  Text,
  inputClass,
} from "@/components/admin/ui";
import MediaUpload from "@/components/admin/MediaUpload";
import { FALLBACK_TESTIMONIALS } from "@/lib/content";

export const dynamic = "force-dynamic";

const ASPECTS = ["16/9", "9/16", "1/1", "4/5"];

export default async function Page() {
  await requireAdmin();
  const rows = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const withVideo = rows.filter((r) => r.mediaType === "video").length;

  return (
    <AdminPage
      title="Testimonials"
      sub="Shown on the home page and on /testimonials. Add a video and it becomes a video testimonial — record 16:9 and it will fill the card properly."
      action={
        <LinkButton href="/testimonials" variant="ghost">
          View page ↗
        </LinkButton>
      }
    >
      <div className="mb-6 grid gap-px bg-line sm:grid-cols-3">
        {[
          { k: "Total", v: rows.length },
          { k: "With video", v: withVideo },
          { k: "Published", v: rows.filter((r) => r.published).length },
        ].map((s) => (
          <div key={s.k} className="bg-paper p-4">
            <p className="t-display text-[1.75rem] text-ink">{s.v}</p>
            <p className="t-mono mt-1 text-ink-3">{s.k}</p>
          </div>
        ))}
      </div>

      {/* ── New ─────────────────────────────────────────────── */}
      <Card title="Add a testimonial" note="A quote is enough. A video is better.">
        <form action={saveTestimonial} className="flex flex-col gap-5">
          <MediaUpload
            name="mediaUrl"
            typeName="mediaType"
            label="Video or photo"
            hint="Record in 16:9 for the best fit. MP4 or WebM plays everywhere; MOV works but is heavier."
          />

          <Area
            name="quote"
            label="Quote"
            hint="Without quote marks — the site adds those. With a video this becomes the caption."
            rows={3}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <Text name="name" label="Name" placeholder="Founder" required />
            <Text name="role" label="Role" placeholder="Director" />
            <Text name="company" label="Company" placeholder="D2C wellness brand" />
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <label className="block">
              <span className="t-mono mb-1.5 block text-ink-3">Aspect ratio</span>
              <select name="aspect" defaultValue="16/9" className={inputClass}>
                {ASPECTS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
            <Text name="order" label="Sort order" type="number" defaultValue={rows.length} />
            <Check name="featured" label="Feature it" />
            <Check name="published" label="Published" defaultChecked />
          </div>

          <div>
            <Button>Add testimonial</Button>
          </div>
        </form>
      </Card>

      {/* ── Existing ────────────────────────────────────────── */}
      <div className="mt-8 flex flex-col gap-4">
        {rows.length === 0 ? (
          <Empty>
            Nothing saved yet — the site is showing the {FALLBACK_TESTIMONIALS.length} built-in
            quotes.
          </Empty>
        ) : (
          rows.map((t) => (
            <Card key={t.id}>
              <form action={saveTestimonial} className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
                <input type="hidden" name="id" value={t.id} />

                <MediaUpload
                  name="mediaUrl"
                  typeName="mediaType"
                  label="Video or photo"
                  defaultUrl={t.mediaUrl}
                  defaultType={t.mediaType}
                />

                <div className="flex flex-col gap-4">
                  <Area name="quote" label="Quote" rows={3} defaultValue={t.quote} />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Text name="name" label="Name" defaultValue={t.name} />
                    <Text name="role" label="Role" defaultValue={t.role} />
                    <Text name="company" label="Company" defaultValue={t.company} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <label className="block">
                      <span className="t-mono mb-1.5 block text-ink-3">Aspect</span>
                      <select name="aspect" defaultValue={t.aspect} className={inputClass}>
                        {ASPECTS.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Text name="order" label="Order" type="number" defaultValue={t.order} />
                    <Check name="featured" label="Featured" defaultChecked={t.featured} />
                    <Check name="published" label="Published" defaultChecked={t.published} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button>Save</Button>
                  </div>
                </div>
              </form>

              <form action={deleteTestimonial} className="mt-4 border-t border-line pt-4">
                <input type="hidden" name="id" value={t.id} />
                <Button variant="danger">Delete</Button>
              </form>
            </Card>
          ))
        )}
      </div>

      <Card title="Where uploads live" className="mt-8">
        <p className="text-[0.875rem] leading-relaxed text-ink-3">
          Files are written to <code className="bg-paper-2 px-1.5 py-0.5">public/uploads</code> on
          the server and served from <code className="bg-paper-2 px-1.5 py-0.5">/uploads/…</code>.
          That works on any normal host and on your own machine. If you later deploy somewhere with
          a read-only filesystem — Vercel, Netlify — uploads will need to move to object storage,
          and only this one route changes.
        </p>
      </Card>
    </AdminPage>
  );
}
