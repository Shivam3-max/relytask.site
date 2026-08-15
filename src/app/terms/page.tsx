import type { Metadata } from "next";
import LegalPage, { type Section } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply to using the ${SITE.name} website and the tools on it.`,
  alternates: { canonical: "/terms" },
};

const SECTIONS: Section[] = [
  {
    heading: "Who we are",
    body: [
      `This website is operated by ${SITE.legalName} ("RelyTask", "we", "us"), ${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.region}, ${SITE.address.country}.`,
    ],
  },
  {
    heading: "The calculators and tools are estimates",
    body: [
      "The cost estimator, ROI calculators and maturity score on this site produce indicative figures from the inputs you give and from published industry benchmarks. They are a starting point for a conversation, not a quotation and not professional advice.",
      "A binding price only exists once we have sent you a written proposal for your specific scope and you have accepted it.",
    ],
  },
  {
    heading: "Benchmarks and third-party figures",
    body: [
      "Service pages cite published industry research so you can check it. Those figures describe the market at the time of writing. They are not a forecast of your results and nothing on this site should be read as a guarantee of any outcome, ranking, reply rate or return.",
    ],
  },
  {
    heading: "Our work is governed by a separate agreement",
    body: [
      "Nothing on this website creates a contract for services. Client engagements are governed by the proposal and terms we sign with you, which set out scope, timelines, fees, intellectual property and confidentiality.",
      "Where those documents and this page disagree, the signed agreement wins.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The design, copy, code and artwork on this website belong to RelyTask. You are welcome to quote or link to it with attribution. Wholesale copying of the site or its content is not permitted.",
      "Work we produce for a client is transferred to that client on the terms of the relevant engagement — typically in full on final payment.",
    ],
  },
  {
    heading: "Case studies and client names",
    body: [
      "Case studies are published with client permission. Where a client has asked not to be named, the work is shown anonymously and marked as such. Figures shown are those the client agreed we could share.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Do not use this site or its forms to submit unlawful content, to attempt to gain unauthorised access, or to send automated bulk submissions. We rate-limit and block where necessary.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "We keep this site accurate and available, but we do not warrant that it is error-free or continuously available. To the extent permitted by law, we are not liable for losses arising from reliance on the general information or estimates published here.",
      "Nothing here limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of India, and the courts at Mohali, Punjab have exclusive jurisdiction over any dispute arising from them.",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      updated="15 August 2026"
      intro="Plain version: the calculators give estimates rather than quotes, published benchmarks describe the market rather than promise your results, and any actual work we do together is governed by the agreement we sign — not by this page."
      sections={SECTIONS}
    />
  );
}
