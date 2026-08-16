"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { PILLARS } from "@/lib/services";
import { useMotion } from "@/lib/useMotion";

const RINGS = [
  { pillar: PILLARS[0], size: 100, speed: 0.028, dir: 1, offset: -90 },
  { pillar: PILLARS[1], size: 73, speed: -0.038, dir: -1, offset: -50 },
  { pillar: PILLARS[2], size: 46, speed: 0.052, dir: 1, offset: -120 },
];

type Props = {
  active: string | null;
  activePillar: string | null;
  onHover: (slug: string | null, pillar: string | null) => void;
};

export default function OrbitSystem({ active, activePillar, onHover }: Props) {
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const motion = useMotion();

  useEffect(() => {
    if (!motion) return;
    let raf = 0;
    let last = performance.now();
    const angles = RINGS.map(() => 0);

    const loop = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      RINGS.forEach((ring, i) => {
        angles[i] += ring.speed * dt * 0.06;
        const el = ringRefs.current[i];
        if (el) el.style.transform = `rotate(${angles[i]}deg)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [motion]);

  return (
    <div className="relative aspect-square w-full select-none">
      {/* soft field behind the engine */}
      <div
        className="pointer-events-none absolute inset-[6%] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,122,24,0.10) 0%, rgba(43,50,82,0.06) 38%, rgba(255,255,255,0) 68%)",
        }}
      />

      {RINGS.map((ring, i) => {
        const dim = activePillar !== null && activePillar !== ring.pillar.id;
        return (
          <div
            key={ring.pillar.id}
            className="absolute left-1/2 top-1/2 transition-opacity duration-500"
            style={{
              width: `${ring.size}%`,
              height: `${ring.size}%`,
              marginLeft: `-${ring.size / 2}%`,
              marginTop: `-${ring.size / 2}%`,
              opacity: dim ? 0.22 : 1,
            }}
          >
            {/* the ring itself */}
            <div
              className="absolute inset-0 rounded-full border border-dashed"
              style={{
                borderColor:
                  activePillar === ring.pillar.id
                    ? "rgba(244,96,11,0.45)"
                    : "rgba(43,50,82,0.16)",
                transition: "border-color 400ms var(--ease-brand)",
              }}
            />

            {/* rotating node group */}
            <div ref={(el) => { ringRefs.current[i] = el; }} className="absolute inset-0">
              {ring.pillar.services.map((service, j) => {
                const angle =
                  (j * 360) / ring.pillar.services.length + ring.offset;
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 50 * Math.cos(rad);
                const y = 50 + 50 * Math.sin(rad);
                const isActive = active === service.slug;
                return (
                  <Link
                    key={service.slug}
                    href={`${ring.pillar.href}/${service.slug}`}
                    aria-label={service.name}
                    onMouseEnter={() => onHover(service.slug, ring.pillar.id)}
                    onMouseLeave={() => onHover(null, null)}
                    className="absolute flex items-center justify-center"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: 28,
                      height: 28,
                      marginLeft: -14,
                      marginTop: -14,
                    }}
                  >
                    <span
                      className="block rounded-full transition-all duration-300"
                      style={{
                        width: isActive ? 13 : 6,
                        height: isActive ? 13 : 6,
                        background: isActive
                          ? "var(--color-flame)"
                          : "var(--color-ink-2)",
                        boxShadow: isActive
                          ? "0 0 0 5px rgba(244,96,11,0.16)"
                          : "none",
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* the core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full md:h-[5.75rem] md:w-[5.75rem]"
          style={{
            background:
              "conic-gradient(from 210deg, #2B3252, #14182b 35%, #F4600B 72%, #FF7A18 88%, #2B3252)",
            boxShadow: "0 18px 50px -18px rgba(43,50,82,0.55)",
          }}
        >
          <div className="flex h-[3.25rem] w-[3.25rem] flex-col items-center justify-center rounded-full bg-paper text-center md:h-[4.625rem] md:w-[4.625rem]">
            <span className="t-mono hidden text-[0.5rem] text-mist md:block">System</span>
            <span className="font-[family-name:var(--font-display)] text-[0.8125rem] font-extrabold tracking-tight text-ink md:text-[0.9375rem]">
              360°
            </span>
          </div>
        </div>
      </div>

      {/* pillar tags */}
      {PILLARS.map((pillar, i) => {
        const pos = [
          { left: "-2%", top: "4%" },
          { right: "-4%", top: "44%" },
          { left: "4%", bottom: "2%" },
        ][i];
        const dim = activePillar !== null && activePillar !== pillar.id;
        return (
          <Link
            key={pillar.id}
            href={pillar.href}
            data-cursor="View"
            onMouseEnter={() => onHover(null, pillar.id)}
            onMouseLeave={() => onHover(null, null)}
            className="absolute z-10 hidden border-l-2 bg-paper/85 py-1.5 pl-2.5 pr-4 backdrop-blur-sm transition-all duration-400 lg:block"
            style={{
              ...pos,
              borderColor:
                activePillar === pillar.id ? "var(--color-flame)" : "var(--color-ink)",
              opacity: dim ? 0.35 : 1,
            }}
          >
            <span className="t-mono block text-[0.5625rem] text-mist">{pillar.index}</span>
            <span className="font-[family-name:var(--font-display)] block text-[0.875rem] font-extrabold uppercase tracking-[-0.01em] text-ink md:text-[1rem]">
              {pillar.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
