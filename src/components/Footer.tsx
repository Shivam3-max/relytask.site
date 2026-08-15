"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { PILLARS, GROWTH_SYSTEM } from "@/lib/services";
import { SITE, whatsappHref } from "@/lib/site";

export default function Footer({ year }: { year: number }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-line bg-paper">
      {/* Big CTA */}
      <div style={{ paddingInline: "var(--gutter)" }} className="py-20 md:py-28">
        <p className="t-eyebrow">Next step</p>
        <Link
          href="/contact"
          data-cursor="Let's go"
          className="group mt-5 block"
        >
          <h2 className="t-display text-[clamp(2.75rem,11vw,9rem)] text-ink">
            Let&apos;s build
            <span className="grad-flame"> something</span>
            <br />
            worth copying.
          </h2>
        </Link>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.875rem] font-medium text-paper transition-colors duration-300 hover:bg-flame"
          >
            Start a project <span aria-hidden="true">→</span>
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[0.875rem] font-medium text-ink-2 transition-colors duration-300 hover:border-ink"
          >
            WhatsApp us
          </a>
        </div>
      </div>

      <div className="rule" />

      <div
        style={{ paddingInline: "var(--gutter)" }}
        className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]"
      >
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-ink-3">
            Marketing, outreach and software from one team. We build demand — and
            the system that holds it.
          </p>
          <p className="t-mono mt-6 text-mist">
            Mohali · {time || "--:--:--"} IST
          </p>
        </div>

        <div>
          <p className="t-eyebrow">Services</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {[...PILLARS.map((p) => ({ name: p.name, href: p.href })), GROWTH_SYSTEM].map(
              (p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[0.9375rem] text-ink-2 link-underline">
                    {p.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <p className="t-eyebrow">Company</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {[
              { name: "Work", href: "/work" },
              { name: "Tools", href: "/tools" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.9375rem] text-ink-2 link-underline">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="t-eyebrow">Reach us</p>
          <ul className="mt-4 flex flex-col gap-2.5 text-[0.9375rem] text-ink-2">
            <li>
              <a href={`mailto:${SITE.email}`} className="link-underline">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE.phoneRaw}`} className="link-underline">
                {SITE.phone}
              </a>
            </li>
            <li className="mt-1 leading-relaxed text-ink-3">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}
              <br />
              {SITE.address.city}, {SITE.address.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="rule" />

      <div
        style={{ paddingInline: "var(--gutter)" }}
        className="flex flex-col gap-2 py-6 text-[0.75rem] text-mist md:flex-row md:items-center md:justify-between"
      >
        <p>
          © {year} {SITE.legalName}. {SITE.tagline}.
        </p>
        <div className="flex gap-5">
          <Link href="/privacy" className="link-underline">
            Privacy
          </Link>
          <Link href="/terms" className="link-underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
