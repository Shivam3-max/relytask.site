import PlaceholderArt from "./PlaceholderArt";

/**
 * Renders the project's uploaded cover image if there is one, otherwise
 * falls back to the generated placeholder art.
 */
export default function ProjectImage({
  src,
  seed,
  label,
  ratio = "aspect-[4/3]",
  className = "",
}: {
  src?: string | null;
  seed: number;
  label?: string;
  ratio?: string;
  className?: string;
}) {
  if (!src) return <PlaceholderArt seed={seed} ratio={ratio} label={label} className={className} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={label ?? ""} className={`${ratio} block w-full object-cover ${className}`} />
  );
}
