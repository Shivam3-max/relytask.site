import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function Page() {
  if (await isAuthed()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="t-display text-[1.5rem] text-ink">
          Rely<span className="text-flame">Admin</span>
        </p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">
          Leads, case studies, testimonials and every number the calculators use.
        </p>
        <div className="mt-7 border border-line bg-paper p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
