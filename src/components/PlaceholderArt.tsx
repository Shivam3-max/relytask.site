/**
 * Deterministic abstract artwork, generated from a seed. Stands in for real
 * photography until the client's own images are dropped in — no external
 * requests, no broken image boxes, and it always matches the brand.
 */

function mulberry(seed: number) {
  let a = seed * 1103515245 + 12345;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function PlaceholderArt({
  seed = 1,
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  seed?: number;
  label?: string;
  className?: string;
  ratio?: string;
}) {
  const rand = mulberry(seed);
  const rings = Array.from({ length: 5 }, () => ({
    cx: 20 + rand() * 60,
    cy: 20 + rand() * 60,
    r: 8 + rand() * 30,
  }));
  const bars = Array.from({ length: 7 }, (_, i) => ({
    x: 6 + i * 13,
    h: 10 + rand() * 62,
  }));
  const rot = Math.round(rand() * 60 - 30);

  return (
    <div className={`relative overflow-hidden bg-paper-2 ${ratio} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`pa-${seed}`} x1="0" y1="100" x2="100" y2="0">
            <stop offset="0" stopColor="#2B3252" />
            <stop offset="0.6" stopColor="#2B3252" />
            <stop offset="1" stopColor="#F4600B" />
          </linearGradient>
          <clipPath id={`pc-${seed}`}>
            <rect width="100" height="100" />
          </clipPath>
        </defs>
        <g clipPath={`url(#pc-${seed})`}>
          <rect width="100" height="100" fill="#f6f7fa" />
          <g transform={`rotate(${rot} 50 50)`} opacity="0.9">
            {bars.map((b, i) => (
              <rect
                key={i}
                x={b.x}
                y={100 - b.h}
                width="5"
                height={b.h}
                fill={`url(#pa-${seed})`}
                opacity={0.08 + (i % 3) * 0.05}
              />
            ))}
          </g>
          {rings.map((c, i) => (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill="none"
              stroke={`url(#pa-${seed})`}
              strokeWidth="0.5"
              opacity={0.5}
            />
          ))}
          <circle
            cx={rings[0].cx}
            cy={rings[0].cy}
            r={rings[0].r * 0.42}
            fill={`url(#pa-${seed})`}
            opacity="0.85"
          />
        </g>
      </svg>
      {label && (
        <span className="t-mono absolute bottom-3 left-3 text-[0.5rem] text-ink-3/70">
          {label}
        </span>
      )}
    </div>
  );
}
