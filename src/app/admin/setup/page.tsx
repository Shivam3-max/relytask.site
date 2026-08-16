import Link from "next/link";
import { secretConfigError } from "@/lib/auth";
import { countAdminUsers } from "@/lib/db";
import SetupForm from "@/components/admin/SetupForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  const misconfigured = secretConfigError();
  const existing = misconfigured ? 0 : await countAdminUsers();

  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <p className="t-display text-[1.5rem] text-ink">
          Rely<span className="text-flame">Admin</span> setup
        </p>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-3">
          Creates the first admin account. Only works once, while no account
          exists yet — after that, sign in at{" "}
          <Link href="/admin/login" className="link-underline text-ink">
            /admin/login
          </Link>
          .
        </p>

        {misconfigured && (
          <div className="mt-6 border-l-2 border-flame bg-flame-soft p-4">
            <p className="t-mono text-flame">Not configured</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-2">{misconfigured}</p>
          </div>
        )}

        {!misconfigured && existing > 0 && (
          <div className="mt-6 border-l-2 border-line bg-paper-2 p-4">
            <p className="t-mono text-ink-2">Already set up</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">
              An admin account already exists. Go to{" "}
              <Link href="/admin/login" className="link-underline text-ink">
                /admin/login
              </Link>{" "}
              instead. Locked out? Delete the row from the AdminUser table
              (phpMyAdmin, or wherever your host manages MySQL) and reload
              this page to set up a new one.
            </p>
          </div>
        )}

        {!misconfigured && existing === 0 && (
          <div className="mt-6 border border-line bg-paper p-6">
            <SetupForm />
          </div>
        )}
      </div>
    </div>
  );
}
