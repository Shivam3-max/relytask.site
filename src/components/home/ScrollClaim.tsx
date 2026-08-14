"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT =
  "You don't have a marketing problem. You have a system problem. Attention without capture is noise. Capture without follow-up is a spreadsheet nobody opens.";

export default function ScrollClaim() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = TEXT.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (new URLSearchParams(window.location.search).has("static")) {
      gsap.set(el.querySelectorAll("span[data-w]"), { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(el.querySelectorAll("span[data-w]"), {
        opacity: 1,
        stagger: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.4,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-40" style={{ paddingInline: "var(--gutter)" }}>
      <p
        ref={ref}
        className="t-display max-w-[52rem] text-[clamp(1.6rem,4.6vw,3.4rem)] leading-[1.06] text-ink"
      >
        {words.map((w, i) => (
          <span key={i} data-w className="opacity-15 transition-none">
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
