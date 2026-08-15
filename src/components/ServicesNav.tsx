"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";

const ITEMS = [
  { href: "/services", label: "All services", index: "" },
  ...PILLARS.map((p) => ({ href: p.href, label: p.name, index: p.index })),
  { href: GROWTH_SYSTEM.href, label: GROWTH_SYSTEM.name, index: GROWTH_SYSTEM.index },
];

/**
 * Sticky pillar switcher. Sits under the header on every /services route so a
 * visitor can move between pillars without going back to the index.
 */
export default function ServicesNav() {
  const pathname = usePathname();

  return (
    <div
      className="sticky z-40 border-b border-line bg-paper/85 backdrop-blur-md"
      style={{ top: "var(--nav-h)" }}
    >
      <nav
        aria-label="Services"
        className="scrollbar-none flex items-stretch gap-1 overflow-x-auto"
        style={{ paddingInline: "var(--gutter)" }}
      >
        {ITEMS.map((item) => {
          const active =
            item.href === "/services"
              ? pathname === "/services"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`t-mono relative flex shrink-0 items-center gap-2 whitespace-nowrap py-4 pr-6 transition-colors duration-300 ${
                active ? "text-flame" : "text-ink-3 hover:text-ink"
              }`}
            >
              {item.index && (
                <span className={active ? "text-flame" : "text-mist"}>{item.index}</span>
              )}
              {item.label}
              {active && (
                <span className="absolute inset-x-0 bottom-0 h-px bg-flame" aria-hidden />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
