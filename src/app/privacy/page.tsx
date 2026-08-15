import type { Metadata } from "next";
import LegalPage, { type Section } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.legalName} collects, uses and protects the information you give us.`,
  alternates: { canonical: "/privacy" },
};

const SECTIONS: Section[] = [
  {
    heading: "What we collect",
    body: [
      "When you submit a form or use one of our tools, we store what you typed: your name, email address, phone number, company, and whatever you told us about your problem, budget and timeline. Tool submissions also store the inputs and the result, so we can pick the conversation up where you left it.",
      "We do not ask for and do not want payment card details, government identifiers, or any sensitive personal data through this website.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "To reply to you, to prepare a proposal, and to keep a record of the conversation so you do not have to explain it twice. If you become a client, the same record becomes the project file.",
      "We do not sell your data, rent it, or share it with advertising networks.",
    ],
  },
  {
    heading: "Analytics and cookies",
    body: [
      "We use privacy-respecting analytics to understand which pages are read and where people give up. This tells us about pages, not about people — we do not build advertising profiles of visitors.",
      "Where advertising pixels are used on campaign landing pages, they are disclosed on those pages and only loaded with consent where the law requires it.",
    ],
  },
  {
    heading: "Where it is stored",
    body: [
      "Enquiries are stored on infrastructure we control, with access limited to the people at RelyTask who need it to reply to you. Files and documents relating to client work are held in access-controlled workspaces.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries that do not turn into work are kept for up to twenty-four months, so we recognise you if you come back, then deleted. Client records are kept for as long as we are working together and for the period afterwards that Indian tax and contract law requires.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to us and we will action it within thirty days, and usually far sooner.",
      "If you are contacted by us as part of outbound business development, every message carries a working opt-out. Use it and you will not hear from us again — we maintain a permanent suppression list.",
    ],
  },
  {
    heading: "Outbound outreach we run for clients",
    body: [
      "When we run outreach campaigns on behalf of clients, the client is the data controller and we act on their instructions. We build lists from business contact information, honour opt-outs promptly, and identify the sender clearly in every message. For recipients in the EU and UK we apply the stricter standard by default.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we change how we handle information, we will update this page and change the date at the top. Material changes affecting existing clients will also be communicated directly.",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="15 August 2026"
      intro="Plain version: we only collect what you give us, we use it to reply to you and do the work, we don't sell it, and you can ask us to delete it whenever you like. The detail is below."
      sections={SECTIONS}
    />
  );
}
