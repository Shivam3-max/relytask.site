import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import CurrencyProvider from "@/components/CurrencyProvider";
import ChromeGate from "@/components/ChromeGate";
import { getFx } from "@/lib/settings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Self-hosted (not next/font/google): builds on hosts without outbound
// internet access — e.g. Hostinger — where fetching fonts.gstatic.com at
// build time fails and silently kills the build. Files are variable fonts
// covering the weight ranges below in one file each, pulled straight from
// Google's own CDN — see AGENTS.md/README for how to refresh them.
const archivo = localFont({
  src: "../fonts/archivo-latin.woff2",
  variable: "--font-archivo",
  weight: "600 900",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "../fonts/jetbrains-mono-latin.woff2",
  variable: "--font-mono-face",
  weight: "400 500",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Marketing, Outreach & Technology`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "RelyTask builds demand and the system that holds it: 360° marketing, manual outreach that books meetings, and custom software — CRM, ERP, apps and automation.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — We build demand. And the system that holds it.`,
    description:
      "360° marketing, manual outreach and custom software from one team in Mohali.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rates = await getFx();
  // Rendered on the server so the client never recomputes it from its own clock.
  const year = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      {/* Extensions (password managers, Grammarly, Dark Reader) add attributes
          to these two elements before React hydrates. Suppression here covers
          only their own attributes, never their children. */}
      <body className="grain antialiased" suppressHydrationWarning>
        <CurrencyProvider rates={rates}>
          <ChromeGate>
            <SmoothScroll />
            <Cursor />
            <Header />
          </ChromeGate>
          <main>{children}</main>
          <ChromeGate>
            <Footer year={year} />
            <WhatsAppFloat />
          </ChromeGate>
        </CurrencyProvider>
      </body>
    </html>
  );
}
