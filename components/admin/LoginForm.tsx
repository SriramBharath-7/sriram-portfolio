"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInAction } from "@/lib/admin/actions";
import type { AuthFormState } from "@/lib/admin/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn--primary w-full h-10" disabled={pending}>
      {pending && <span className="adm-spinner" aria-hidden="true" />}
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export default function LoginForm({ initialError }: { initialError?: string }) {
  const [state, formAction] = useFormState<AuthFormState, FormData>(signInAction, {
    error: initialError,
  });

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="adm-label">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className="adm-input h-10" />
      </div>
      <div>
        <label htmlFor="password" className="adm-label">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="adm-input h-10"
        />
      </div>
      {state.error && (
        <p role="alert" className="text-[13px] text-[#ff9aa4] bg-[var(--danger-soft)] border border-[rgba(239,97,112,0.35)] rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
