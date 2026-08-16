"use client";

import { useActionState } from "react";
import { setupAdmin } from "@/app/admin/actions";
import { Button, inputClass, Label } from "./ui";

export default function SetupForm() {
  const [state, formAction, pending] = useActionState(setupAdmin, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="block">
        <Label>Email</Label>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          className={inputClass}
        />
      </label>

      <label className="block">
        <Label>Password</Label>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClass}
        />
      </label>

      <label className="block">
        <Label>Confirm password</Label>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClass}
        />
      </label>

      <label className="block">
        <Label hint="The ADMIN_SECRET value set in this server's environment variables — proves you can configure the host, not just guess a URL.">
          Setup token
        </Label>
        <input name="token" type="password" required className={inputClass} />
      </label>

      {state?.error && (
        <p className="border-l-2 border-flame bg-flame-soft px-3 py-2.5 text-[0.8125rem] text-ink-2">
          {state.error}
        </p>
      )}

      <Button disabled={pending}>{pending ? "Creating…" : "Create admin account →"}</Button>
    </form>
  );
}
