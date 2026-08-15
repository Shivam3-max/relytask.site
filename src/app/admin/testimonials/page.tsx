import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { deleteTestimonial, saveTestimonial } from "../actions";
import { AdminPage, Area, Button, Card, Check, Empty, Text } from "@/components/admin/ui";
import { FALLBACK_TESTIMONIALS } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Page() {
  await requireAdmin();
  const rows = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <AdminPage
      title="Testimonials"
      sub="Shown on the home page. While none are saved the site falls back to the three written into the code."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <Card title="Add a testimonial">
          <form action={saveTestimonial} className="flex flex-col gap-4">
            <Area
              name="quote"
              label="Quote"
              hint="Without the quote marks — the site adds those."
              rows={4}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Text name="name" label="Name" placeholder="Founder" required />
              <Text name="role" label="Role / company" placeholder="D2C wellness brand" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Text name="order" label="Sort order" type="number" defaultValue={rows.length} />
              <Check name="published" label="Published" defaultChecked />
            </div>
            <Button>Add testimonial</Button>
          </form>
        </Card>

        <div className="flex flex-col gap-3">
          {rows.length === 0 ? (
            <Empty>
              Nothing saved yet — the home page is showing the{" "}
              {FALLBACK_TESTIMONIALS.length} built-in quotes.
            </Empty>
          ) : (
            rows.map((t) => (
              <Card key={t.id}>
                <form action={saveTestimonial} className="flex flex-col gap-4">
                  <input type="hidden" name="id" value={t.id} />
                  <Area name="quote" label="Quote" rows={3} defaultValue={t.quote} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Text name="name" label="Name" defaultValue={t.name} />
                    <Text name="role" label="Role / company" defaultValue={t.role} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Text name="order" label="Sort order" type="number" defaultValue={t.order} />
                    <Check name="published" label="Published" defaultChecked={t.published} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button>Save</Button>
                  </div>
                </form>
                <form action={deleteTestimonial} className="mt-3 border-t border-line pt-3">
                  <input type="hidden" name="id" value={t.id} />
                  <Button variant="danger">Delete</Button>
                </form>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminPage>
  );
}
