import Reveal from "../Reveal";

const QUOTES = [
  {
    quote:
      "We'd been through two agencies. RelyTask was the first that asked to see our sales process before touching the ad account.",
    name: "Founder",
    role: "D2C wellness brand",
  },
  {
    quote:
      "Thirty-one meetings with plant heads in ninety days, in a market where our ads had never worked. That changed the year.",
    name: "Director",
    role: "Industrial equipment",
  },
  {
    quote:
      "They built the ERP and then ran the campaigns on top of it. One team, one number to call.",
    name: "Operations Head",
    role: "Manufacturing",
  },
];

export default function Testimonials() {
  return (
    <section
      className="border-t border-line py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <p className="t-eyebrow">What clients say</p>
      </Reveal>
      <Reveal stagger="[data-q]" className="mt-10 grid gap-px bg-line md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure key={q.quote} data-q className="bg-paper p-7 md:p-8">
            <blockquote className="text-[1.0625rem] leading-relaxed text-ink">
              “{q.quote}”
            </blockquote>
            <figcaption className="t-mono mt-6 text-ink-3">
              {q.name} · <span className="text-mist">{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
      <Reveal>
        <p className="t-mono mt-6 text-mist">
          Named references and video testimonials available on request.
        </p>
      </Reveal>
    </section>
  );
}
