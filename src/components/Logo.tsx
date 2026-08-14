export default function Logo({
  className = "",
  showWord = true,
}: {
  className?: string;
  showWord?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-7 w-7 shrink-0"
        fill="none"
      >
        <defs>
          <linearGradient id="rt-g" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2B3252" />
            <stop offset="0.55" stopColor="#2B3252" />
            <stop offset="1" stopColor="#FF7A18" />
          </linearGradient>
        </defs>
        {/* broken ring, gap at upper right — echoes the mark */}
        <path
          d="M38.5 10.4A20 20 0 1 1 24 4"
          stroke="url(#rt-g)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {/* T stem + R bowl monogram */}
        <path
          d="M13 17.5h20M23 17.5V37"
          stroke="url(#rt-g)"
          strokeWidth="3.4"
          strokeLinecap="square"
        />
        <path
          d="M23 17.5h6.5a5 5 0 0 1 0 10H23m4.2 0L34 37"
          stroke="url(#rt-g)"
          strokeWidth="3.4"
          strokeLinecap="square"
        />
      </svg>
      {showWord && (
        <span className="font-[family-name:var(--font-display)] text-[1.0625rem] font-extrabold tracking-[-0.03em]">
          <span className="text-ink-2">RELY</span>
          <span className="text-flame">TASK</span>
        </span>
      )}
    </span>
  );
}
