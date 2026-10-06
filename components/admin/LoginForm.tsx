"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import kaliLogo from "@/public/assets/svg/kali-logo.png";
import { signInAction } from "@/lib/admin/actions";
import type { AuthFormState } from "@/lib/admin/types";
import { Icon } from "./icons";
import { Notice, StatusDot } from "./ui";

const COMMAND = "sudo portfolio-admin --login";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="adm-btn adm-btn--primary adm-btn--lg adm-btn--block" disabled={pending}>
      {pending ? (
        <>
          <span className="adm-spinner" aria-hidden="true" />
          Verifying identity…
        </>
      ) : (
        <>
          <Icon name="fingerprint" size={19} />
          Authenticate
          <Icon name="arrowRight" size={17} className="ml-auto opacity-70" />
        </>
      )}
    </button>
  );
}

/** The sign-in window: a sudo prompt, operator credentials, clear failure feedback. */
export default function LoginForm({ initialError }: { initialError?: string }) {
  const [state, formAction] = useFormState<AuthFormState, FormData>(signInAction, {
    error: initialError,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [shake, setShake] = useState(false);
  const lastError = useRef(state.error);

  // Shake the window each time a new error comes back.
  useEffect(() => {
    if (state.error && state.error !== lastError.current) {
      setShake(true);
      const timer = window.setTimeout(() => setShake(false), 460);
      lastError.current = state.error;
      return () => window.clearTimeout(timer);
    }
    lastError.current = state.error;
  }, [state]);

  const detectCaps = (event: React.KeyboardEvent<HTMLInputElement>) =>
    setCapsLock(event.getModifierState?.("CapsLock") ?? false);

  return (
    <div className="adm-window" data-shake={shake}>
      <div className="adm-window-bar">
        <Icon name="lock" size={14} />
        <span>sudo — authentication required</span>
        <StatusDot tone="warning" live />
      </div>

      <div className="adm-login-body">
        <div className="adm-login-hero">
          <Image src={kaliLogo} alt="" width={52} height={52} priority />
          <div>
            <h1>Control Center</h1>
            <p>kali · restricted administration</p>
          </div>
        </div>

        <div className="adm-login-shell" aria-hidden="true">
          <p>
            <span className="adm-p-br">┌──(</span>
            <span className="adm-p-user">guest㉿kali</span>
            <span className="adm-p-br">)-[</span>
            <span className="adm-p-path">~</span>
            <span className="adm-p-br">]</span>
          </p>
          <p>
            <span className="adm-p-user">└─$</span>{" "}
            <span className="adm-type adm-p-cmd" style={{ "--chars": COMMAND.length } as React.CSSProperties}>
              {COMMAND}
            </span>
            <span className="adm-cursor ml-[0.15em]" />
          </p>
          <p className="adm-type-after adm-faint">[sudo] operator credentials required for this machine</p>
        </div>

        <form action={formAction} className="flex flex-col gap-5" noValidate>
          <div className="adm-field">
            <label htmlFor="email" className="adm-label">
              Operator email
            </label>
            <div className="adm-input-wrap">
              <span className="adm-input-icon">
                <Icon name="mail" size={18} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                required
                autoFocus
                spellCheck={false}
                placeholder="you@example.com"
                className="adm-input adm-input--icon"
              />
            </div>
          </div>

          <div className="adm-field">
            <label htmlFor="password" className="adm-label">
              Passphrase
            </label>
            <div className="adm-input-wrap">
              <span className="adm-input-icon">
                <Icon name="key" size={18} />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                onKeyDown={detectCaps}
                onKeyUp={detectCaps}
                className="adm-input adm-input--icon !pr-12"
              />
              <span className="adm-input-trail">
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="adm-btn adm-btn--ghost adm-btn--icon"
                  aria-label={showPassword ? "Hide passphrase" : "Show passphrase"}
                  title={showPassword ? "Hide passphrase" : "Show passphrase"}
                >
                  <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
                </button>
              </span>
            </div>
            {capsLock && (
              <p className="adm-error !text-[var(--warn)]">
                <Icon name="alert" size={14} />
                Caps Lock is on
              </p>
            )}
          </div>

          {state.error && (
            <Notice tone="danger" title="Authentication failed">
              {state.error}
            </Notice>
          )}

          <SubmitButton />
        </form>

        <div className="adm-login-foot">
          <span>
            <StatusDot tone="accent" />
            supabase auth
          </span>
          <span>
            <Icon name="shield" size={14} />
            row level security
          </span>
          <span>
            <Icon name="lock" size={14} />
            admin allowlist
          </span>
        </div>
      </div>
    </div>
  );
}
