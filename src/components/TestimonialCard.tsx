import type { Testimonial } from "@/lib/content";

/**
 * A testimonial with optional video. Videos are lazy — no autoplay, no
 * preloaded payload — so a wall of them costs nothing until one is played.
 */
export default function TestimonialCard({
  item,
  large = false,
}: {
  item: Testimonial;
  large?: boolean;
}) {
  // Role and company are separate fields but often say the same thing.
  const attribution = [...new Set([item.role, item.company].filter(Boolean))].join(", ");

  return (
    <figure className="flex flex-col bg-paper">
      {item.mediaUrl && (
        <div
          className="relative overflow-hidden bg-ink"
          style={{ aspectRatio: item.aspect.replace("/", " / ") }}
        >
          {item.mediaType === "video" ? (
            <video
              src={item.mediaUrl}
              poster={item.posterUrl ?? undefined}
              controls
              preload="none"
              playsInline
              className="h-full w-full object-cover"
            >
              Your browser cannot play this video.
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.mediaUrl}
              alt={`${item.name}${attribution ? `, ${attribution}` : ""}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}

      <div className={item.mediaUrl ? "p-6 md:p-7" : "p-7 md:p-8"}>
        {item.quote && (
          <blockquote
            className={
              large
                ? "t-display text-[clamp(1.375rem,3vw,2.25rem)] leading-[1.2] text-ink"
                : "text-[1.0625rem] leading-relaxed text-ink"
            }
          >
            &ldquo;{item.quote}&rdquo;
          </blockquote>
        )}
        <figcaption className={`t-mono text-ink-3 ${item.quote ? "mt-6" : ""}`}>
          {item.name}
          {attribution && <span className="text-mist"> · {attribution}</span>}
          {item.mediaType === "video" && (
            <span className="ml-3 text-flame">Video</span>
          )}
        </figcaption>
      </div>
    </figure>
  );
}
