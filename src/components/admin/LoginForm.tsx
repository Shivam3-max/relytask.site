"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { Button, inputClass, Label } from "./ui";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

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
          autoComplete="current-password"
          required
          className={inputClass}
        />
      </label>

      {state?.error && (
        <p className="border-l-2 border-flame bg-flame-soft px-3 py-2.5 text-[0.8125rem] text-ink-2">
          {state.error}
        </p>
      )}

      <Button disabled={pending}>{pending ? "Checking…" : "Sign in →"}</Button>
    </form>
  );
}
