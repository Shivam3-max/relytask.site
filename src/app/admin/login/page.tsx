import { redirect } from "next/navigation";
import { adminConfigError, isAuthed } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (await isAuthed()) redirect("/admin");
  const misconfigured = await adminConfigError();

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <p className="t-display text-[1.5rem] text-ink">
          Rely<span className="text-flame">Admin</span>
        </p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">
          Leads, IT projects, testimonials and every number the calculators use.
        </p>

        {misconfigured && (
          <div className="mt-6 border-l-2 border-flame bg-flame-soft p-4">
            <p className="t-mono text-flame">Not configured</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-2">
              {misconfigured}
            </p>
            <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-3">
              No password will work until this is fixed — the failure is on the
              server, not with what you are typing.
            </p>
          </div>
        )}

        <div className="mt-6 border border-line bg-paper p-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
