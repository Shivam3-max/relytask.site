import Link from "next/link";

export default function Placeholder({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <section
      className="flex min-h-[70svh] flex-col justify-center py-24"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <p className="t-eyebrow">{eyebrow}</p>
      <h1 className="t-display mt-5 text-[clamp(2.5rem,9vw,7rem)] text-ink">
        {title}
      </h1>
      <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ink-3">
        {note ?? "This page is next in the build queue."}
      </p>
      <Link href="/" className="t-mono mt-8 text-ink-2 link-underline">
        ← Back home
      </Link>
    </section>
  );
}
