import Reveal from "../Reveal";
import { getTestimonials } from "@/lib/content";

export default async function Testimonials() {
  const quotes = await getTestimonials();
  if (!quotes.length) return null;

  return (
    <section
      className="border-t border-line py-20 md:py-28"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <Reveal>
        <p className="t-eyebrow">What clients say</p>
      </Reveal>
      <Reveal stagger="[data-q]" className="mt-10 grid gap-px bg-line md:grid-cols-3">
        {quotes.map((q) => (
          <figure key={q.id} data-q className="bg-paper p-7 md:p-8">
            <blockquote className="text-[1.0625rem] leading-relaxed text-ink">
              &ldquo;{q.quote}&rdquo;
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
