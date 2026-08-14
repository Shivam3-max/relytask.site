"use client";

import Link from "next/link";
import { PILLARS } from "@/lib/services";

type Props = {
  active: string | null;
  activePillar: string | null;
  onHover: (slug: string | null, pillar: string | null) => void;
};

export default function ServiceIndex({ active, activePillar, onHover }: Props) {
  return (
    <div className="border-t border-line">
      <div
        className="grid gap-x-8 gap-y-7 py-6 md:grid-cols-3"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {PILLARS.map((pillar) => {
          const dim = activePillar !== null && activePillar !== pillar.id;
          return (
            <div
              key={pillar.id}
              onMouseEnter={() => onHover(null, pillar.id)}
              onMouseLeave={() => onHover(null, null)}
              className="transition-opacity duration-400"
              style={{ opacity: dim ? 0.4 : 1 }}
            >
              <Link href={pillar.href} className="flex items-baseline gap-2">
                <span className="t-mono text-[0.5625rem] text-flame">{pillar.index}</span>
                <span className="t-mono text-ink">{pillar.name}</span>
              </Link>
              <ul className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1.5">
                {pillar.services.map((service) => {
                  const isActive = active === service.slug;
                  return (
                    <li key={service.slug}>
                      <Link
                        href={`${pillar.href}#${service.slug}`}
                        onMouseEnter={() => onHover(service.slug, pillar.id)}
                        onMouseLeave={() => onHover(null, pillar.id)}
                        className="block rounded-full border px-2.5 py-1 text-[0.75rem] leading-none transition-all duration-250"
                        style={{
                          borderColor: isActive
                            ? "var(--color-flame)"
                            : "var(--color-line)",
                          background: isActive ? "var(--color-flame)" : "transparent",
                          color: isActive ? "#fff" : "var(--color-ink-2)",
                        }}
                      >
                        {service.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
