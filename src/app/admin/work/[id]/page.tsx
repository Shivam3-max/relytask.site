import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getCaseStudyById } from "@/lib/db";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const row = await getCaseStudyById(id);
  if (!row) notFound();
  return <CaseStudyForm row={row} />;
}
