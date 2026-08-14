import type { Metadata, Viewport } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  weight: ["400", "500"],
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable} ${mono.variable}`}>
      <body className="grain antialiased">
        <SmoothScroll />
        <Cursor />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
