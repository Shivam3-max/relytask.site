"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import CurrencySwitch from "./CurrencySwitch";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-paper/85 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <div
          className="mx-auto flex h-full items-center justify-between"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <Link href="/" aria-label="RelyTask home" className="relative z-10">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="t-mono text-ink-2 link-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CurrencySwitch className="hidden md:inline-flex" />
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.8125rem] font-medium text-paper transition-colors duration-300 hover:bg-flame sm:inline-flex"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className="block h-[1.5px] w-5 bg-ink transition-transform duration-300"
                style={{ transform: open ? "translateY(3.25px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-[1.5px] w-5 bg-ink transition-transform duration-300"
                style={{ transform: open ? "translateY(-3.25px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-400 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        style={{ paddingTop: "var(--nav-h)" }}
      >
        <div
          className="h-full overflow-y-auto pb-16"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <nav className="flex flex-col border-t border-line">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="t-display border-b border-line py-5 text-[2.25rem] text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="t-eyebrow mt-9">Pillars</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {[...PILLARS.map((p) => ({ name: p.name, href: p.href })), GROWTH_SYSTEM].map(
              (p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setOpen(false)}
                  className="text-[1.0625rem] text-ink-2"
                >
                  {p.name}
                </Link>
              ),
            )}
          </div>

          <div className="mt-9">
            <p className="t-eyebrow">Show prices in</p>
            <CurrencySwitch className="mt-3" />
          </div>

          <div className="mt-10 flex flex-col gap-1.5 text-[0.9375rem] text-ink-3">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}
