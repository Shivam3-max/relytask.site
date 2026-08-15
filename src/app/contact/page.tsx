import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SITE, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to RelyTask about marketing, outreach or software. Based in Mohali, working with clients across nine countries. We reply within one working day.",
  alternates: { canonical: "/contact" },
};

const EXPECT = [
  {
    title: "A reply within one working day",
    body: "Usually the same morning. From a person who has read what you wrote, not an autoresponder.",
  },
  {
    title: "A straight answer about fit",
    body: "If we are not the right people for it, we will say so — and point you at who is, when we know.",
  },
  {
    title: "A number before you commit",
    body: "A realistic price band and timeline after the first conversation, not after three discovery calls.",
  },
];

export default function Page() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${SITE.address.line1}, ${SITE.address.line2}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: "IN",
    },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <section
        className="pt-[calc(var(--nav-h)+3rem)] pb-14 md:pb-20"
        style={{ paddingInline: "var(--gutter)" }}
      >
        <Reveal>
          <p className="t-eyebrow">Say hello</p>
          <h1 className="t-display mt-5 max-w-[14ch] text-[clamp(2.5rem,8.5vw,6.5rem)] text-ink">
            Tell us what&rsquo;s <span className="grad-flame">actually wrong.</span>
          </h1>
          <p className="mt-7 max-w-[50ch] text-[1.0625rem] leading-relaxed text-ink-2">
            Not what service you think you need — that is our job to work out.
            The more specific you are about the problem, the more useful our
            first reply will be.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal className="flex flex-col gap-10">
            <div>
              <p className="t-eyebrow">Or reach us directly</p>
              <ul className="mt-5 flex flex-col">
                <li className="border-t border-line py-4">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[1.0625rem] font-semibold tracking-tight text-ink link-underline"
                  >
                    WhatsApp {SITE.phone}
                  </a>
                  <p className="t-mono mt-1 text-mist">Fastest, most days</p>
                </li>
                <li className="border-t border-line py-4">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="text-[1.0625rem] font-semibold tracking-tight text-ink link-underline"
                  >
                    {SITE.phone}
                  </a>
                  <p className="t-mono mt-1 text-mist">Mon–Sat, 10am–7pm IST</p>
                </li>
                <li className="border-t border-line py-4">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-[1.0625rem] font-semibold tracking-tight text-ink link-underline"
                  >
                    {SITE.email}
                  </a>
                  <p className="t-mono mt-1 text-mist">Replies within a working day</p>
                </li>
              </ul>
            </div>

            <div>
              <p className="t-eyebrow">Studio</p>
              <address className="mt-4 text-[0.9375rem] not-italic leading-relaxed text-ink-2">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
                <br />
                {SITE.address.city}, {SITE.address.region}
                <br />
                {SITE.address.country}
              </address>
            </div>

            <div>
              <p className="t-eyebrow">What to expect</p>
              <ul className="mt-4 flex flex-col">
                {EXPECT.map((e) => (
                  <li key={e.title} className="border-t border-line py-4">
                    <p className="text-[0.9375rem] font-semibold tracking-tight text-ink">
                      {e.title}
                    </p>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-3">
                      {e.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
