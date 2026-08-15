import { saveCaseStudy } from "@/app/admin/actions";
import { AdminPage, Area, Button, Card, Check, LinkButton, Text, inputClass } from "./ui";

type Row = {
  id: string;
  slug: string;
  client: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  timeline: string;
  liveUrl: string | null;
  summary: string;
  challenge: string;
  services: string;
  stack: string | null;
  approach: string;
  metrics: string;
  quoteText: string | null;
  quoteName: string | null;
  quoteRole: string | null;
  seed: number;
  order: number;
  confidential: boolean;
  featured: boolean;
  published: boolean;
};

const CATEGORIES = ["Marketing", "Outreach", "Technology", "Growth Systems"];

const toLines = (json: string | null | undefined) => {
  if (!json) return "";
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.join("\n") : "";
  } catch {
    return "";
  }
};

const toPairs = (json: string | null | undefined, a: string, b: string) => {
  if (!json) return "";
  try {
    const v = JSON.parse(json);
    if (!Array.isArray(v)) return "";
    return v.map((x) => `${x[a] ?? ""} | ${x[b] ?? ""}`).join("\n");
  } catch {
    return "";
  }
};

export default function CaseStudyForm({ row }: { row?: Row }) {
  const editing = Boolean(row);

  return (
    <AdminPage
      title={editing ? `Edit — ${row!.client}` : "New IT project"}
      sub="Everything here maps straight onto the public project page."
      action={<LinkButton href="/admin/work">← Back to projects</LinkButton>}
    >
      <form action={saveCaseStudy} className="flex flex-col gap-6">
        {editing && <input type="hidden" name="id" value={row!.id} />}

        <Card title="The basics">
          <div className="grid gap-4 md:grid-cols-2">
            <Text name="client" label="Client name" defaultValue={row?.client} required placeholder="WISE369" />
            <Text
              name="slug"
              label="URL slug"
              hint="Lowercase, hyphens. Becomes /it-projects/your-slug"
              defaultValue={row?.slug}
              required
              placeholder="wise369"
            />
          </div>
          <div className="mt-4">
            <Text
              name="title"
              label="Headline"
              hint="One line describing what the project was"
              defaultValue={row?.title}
              required
              placeholder="A scroll-narrative site for a turnkey property builder"
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <label className="block">
              <span className="t-mono mb-1.5 block text-ink-3">Category</span>
              <select name="category" defaultValue={row?.category ?? "Technology"} className={inputClass}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <Text name="industry" label="Industry" defaultValue={row?.industry} placeholder="Real estate" />
            <Text name="year" label="Year" defaultValue={row?.year ?? "2026"} />
            <Text name="timeline" label="Timeline" defaultValue={row?.timeline} placeholder="5 weeks" />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Text
              name="liveUrl"
              label="Live URL"
              hint="Optional — shows a 'Visit site' link"
              defaultValue={row?.liveUrl}
              placeholder="https://example.com"
            />
            <Text
              name="seed"
              label="Artwork seed"
              hint="Any number. Changes the generated placeholder art."
              type="number"
              defaultValue={row?.seed ?? 7}
            />
          </div>
        </Card>

        <Card title="The story">
          <Area
            name="summary"
            label="Summary"
            hint="One or two sentences. Used on the work index card."
            rows={3}
            defaultValue={row?.summary}
          />
          <div className="mt-4">
            <Area
              name="challenge"
              label="The challenge"
              hint="What they were handed to you with. Shown large on the case page."
              rows={5}
              defaultValue={row?.challenge}
            />
          </div>
        </Card>

        <Card
          title="Approach and results"
          note="One item per line. Use a pipe to split the two parts."
        >
          <Area
            name="approach"
            label="Approach steps"
            hint="Format: Title | Body text"
            rows={6}
            defaultValue={toPairs(row?.approach, "title", "body")}
            placeholder={"Make the offer one object | Instead of six sections, we built a single 3D structure…"}
          />
          <div className="mt-4">
            <Area
              name="metrics"
              label="Metrics"
              hint="Format: Value | Label"
              rows={4}
              defaultValue={toPairs(row?.metrics, "value", "label")}
              placeholder={"3.4× | time on page vs old site"}
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Area
              name="services"
              label="Services"
              hint="One per line"
              rows={4}
              defaultValue={toLines(row?.services)}
              placeholder={"Web design\nDevelopment\nSEO"}
            />
            <Area
              name="stack"
              label="Stack"
              hint="One per line. Optional."
              rows={4}
              defaultValue={toLines(row?.stack)}
              placeholder={"Next.js\nGSAP\nVercel"}
            />
          </div>
        </Card>

        <Card title="Client quote" note="Optional. Leave the quote empty to hide this section.">
          <Area name="quoteText" label="Quote" rows={3} defaultValue={row?.quoteText} />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Text name="quoteName" label="Name" defaultValue={row?.quoteName} placeholder="Founder" />
            <Text name="quoteRole" label="Role" defaultValue={row?.quoteRole} placeholder="D2C wellness brand" />
          </div>
        </Card>

        <Card title="Visibility">
          <div className="grid gap-3 md:grid-cols-4">
            <Check name="published" label="Published" defaultChecked={row?.published ?? true} />
            <Check name="featured" label="Featured" defaultChecked={row?.featured ?? false} />
            <Check name="confidential" label="Under NDA" defaultChecked={row?.confidential ?? false} />
            <Text name="order" label="Sort order" type="number" defaultValue={row?.order ?? 0} />
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button>{editing ? "Save changes" : "Create project"}</Button>
          <LinkButton href="/admin/work">Cancel</LinkButton>
        </div>
      </form>
    </AdminPage>
  );
}
