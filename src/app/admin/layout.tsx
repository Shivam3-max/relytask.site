import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";
import { isAuthed } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The login page renders inside this layout too, so the nav is conditional
  // rather than the whole layout being gated.
  const authed = await isAuthed();

  return (
    <div className="min-h-screen bg-paper-2">
      {authed && <AdminNav />}
      {children}
    </div>
  );
}
