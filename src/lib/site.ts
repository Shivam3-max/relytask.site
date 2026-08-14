export const SITE = {
  name: "RelyTask",
  legalName: "Rely Task Solutions",
  tagline: "Your Delegation Partners",
  claim: "We build demand. And the system that holds it.",
  email: "hello@relytask.com",
  phone: "+91 98057 00090",
  phoneRaw: "+919805700090",
  whatsapp: "919805700090",
  whatsappMessage:
    "Hi RelyTask — I'd like to talk about growing my business.",
  address: {
    line1: "DSS 109, First Floor",
    line2: "Mohali City Centre 1",
    city: "Mohali",
    region: "Punjab",
    country: "India",
  },
  url: "https://relytask.com",
} as const;

export const whatsappHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  SITE.whatsappMessage,
)}`;
