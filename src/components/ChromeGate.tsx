"use client";

import { usePathname } from "next/navigation";

/**
 * The admin panel runs inside the same root layout as the site, so the public
 * header, footer, cursor and WhatsApp button are hidden there rather than
 * duplicating the layout tree.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <>{children}</>;
}
