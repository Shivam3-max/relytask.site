import { requireAdmin } from "@/lib/auth";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

export default async function Page() {
  await requireAdmin();
  return <CaseStudyForm />;
}
