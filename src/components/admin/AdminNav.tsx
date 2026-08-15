"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/work", label: "Work" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/pricing", label: "Rate card" },
  { href: "/admin/benchmarks", label: "Benchmarks" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-6 px-5 py-3 md:px-8">
        <Link href="/admin" className="t-display shrink-0 text-[1.125rem] text-ink">
          Rely<span className="text-flame">Admin</span>
        </Link>

        <nav className="scrollbar-none -mx-2 flex flex-1 items-center gap-1 overflow-x-auto px-2">
          {LINKS.map((l) => {
            const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`t-mono shrink-0 whitespace-nowrap px-3 py-2 transition-colors duration-200 ${
                  active ? "bg-ink text-paper" : "text-ink-3 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="t-mono hidden text-ink-3 transition-colors duration-200 hover:text-ink sm:inline"
          >
            View site ↗
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="t-mono border border-line px-3 py-2 text-ink-3 transition-colors duration-200 hover:border-flame hover:text-flame"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
