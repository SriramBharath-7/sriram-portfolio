"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import kaliLogo from "@/public/assets/svg/kali-logo.png";
import { ACCESS_COOKIE, type AccessReport } from "@/lib/admin/types";

interface Step {
  label: string;
  detail: string;
  state: "ok" | "warn";
}

const FIRST_MS = 140;
const STEP_MS = 150;
const RESOLVE_MS = 130;
const HOLD_MS = 720;
const LEAVE_MS = 520;

/** Every line is a real check from the sign-in (see loadAccessChecks). */
function buildSteps(report: AccessReport): Step[] {
  const dbOk = report.database === "ok";
  return [
    { label: "Authenticating operator", detail: report.email, state: "ok" },
    { label: "Identity verified", detail: "admin allowlist", state: "ok" },
    { label: "Secure session established", detail: "supabase auth", state: "ok" },
    {
      label: "Content store mounted",
      detail:
        report.documents === null
          ? "built-in defaults"
          : `${report.documents}/${report.totalDocuments} documents`,
      state: report.documents === null ? "warn" : "ok",
    },
    {
      label: "Supabase online",
      detail: dbOk ? report.host ?? "connected" : "database unreachable",
      state: dbOk ? "ok" : "warn",
    },
    {
      label: "Row level security",
      detail: report.adminRole ? "write access" : "not in admin_users · saves refused",
      state: report.adminRole ? "ok" : "warn",
    },
    { label: "Portfolio modules loaded", detail: `${report.modules} modules`, state: "ok" },
  ];
}

/**
 * Boot log played once after a successful sign-in, over the paused shell:
 * systemd-style status lines, ACCESS GRANTED, then the desktop is revealed.
 * About 2.5 seconds; click or press any key to skip.
 */
export default function AccessSequence({
  report,
  onReveal,
  onDone,
}: {
  report: AccessReport;
  /** Called as the overlay starts to leave, so the shell can animate in under it. */
  onReveal: () => void;
  onDone: () => void;
}) {
  const steps = useMemo(() => buildSteps(report), [report]);
  const [shown, setShown] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [granted, setGranted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  const leave = useCallback(() => {
    setLeaving(true);
    onReveal();
    timers.current.push(window.setTimeout(onDone, LEAVE_MS));
  }, [onReveal, onDone]);

  const finish = useCallback(() => {
    if (leaving) return;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setShown(steps.length);
    setResolved(steps.length);
    setGranted(true);
    leave();
  }, [leaving, steps.length, leave]);

  useEffect(() => {
    // One-shot: clear the sign-in marker so a reload never replays this.
    document.cookie = `${ACCESS_COOKIE}=; Max-Age=0; path=/admin`;

    const at = (ms: number, run: () => void) => timers.current.push(window.setTimeout(run, ms));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setShown(steps.length);
      setResolved(steps.length);
      setGranted(true);
      at(700, leave);
    } else {
      steps.forEach((_, index) => {
        at(FIRST_MS + index * STEP_MS, () => setShown(index + 1));
        at(FIRST_MS + index * STEP_MS + RESOLVE_MS, () => setResolved(index + 1));
      });
      const grantedAt = FIRST_MS + (steps.length - 1) * STEP_MS + RESOLVE_MS + 180;
      at(grantedAt, () => setGranted(true));
      at(grantedAt + HOLD_MS, leave);
    }

    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
    // Runs once per mount; the callbacks are stable for its lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", finish);
    return () => window.removeEventListener("keydown", finish);
  }, [finish]);

  const warnings = steps.filter((step) => step.state === "warn").length;

  return (
    <div className="adm-boot" data-leaving={leaving} onClick={finish} role="status" aria-live="polite" aria-label="Signing in">
      <div className="adm-boot-inner">
        <div className="adm-boot-head">
          <Image src={kaliLogo} alt="" width={52} height={52} priority />
          <div>
            <p className="adm-eyebrow">kali · portfolio control center</p>
            <p>{granted ? "Session ready" : "Starting privileged session"}</p>
          </div>
        </div>

        <div className="adm-boot-log">
          {steps.slice(0, shown).map((step, index) => {
            const done = index < resolved;
            const warn = step.state === "warn";
            return (
              <div key={step.label} className="adm-boot-line" data-done={done}>
                <span className="adm-boot-status">
                  {done ? (
                    <>
                      [<b data-warn={warn}>{warn ? "WARN" : " OK "}</b>]
                    </>
                  ) : (
                    <>
                      [<span className="adm-boot-wait" />]
                    </>
                  )}
                </span>
                <span className="adm-boot-label">
                  {step.label}
                  {done ? "" : "…"}
                </span>
                <span className="adm-boot-leader" aria-hidden="true" />
                <span className="adm-boot-detail" data-warn={done && warn}>
                  {done ? step.detail : ""}
                </span>
              </div>
            );
          })}
          <div className="adm-meter mt-3" aria-hidden="true">
            <span style={{ width: `${(resolved / steps.length) * 100}%` }} />
          </div>
        </div>

        <div className="adm-boot-granted" data-on={granted}>
          {granted && (
            <>
              <strong data-warn={warnings > 0}>ACCESS GRANTED</strong>
              <small>
                {warnings > 0
                  ? `${warnings === 1 ? "1 check needs" : `${warnings} checks need`} attention · see docs/SUPABASE_SETUP.md`
                  : `session opened for ${report.email}`}
              </small>
            </>
          )}
        </div>

        <p className="adm-boot-skip">press any key to skip</p>
      </div>
    </div>
  );
}
