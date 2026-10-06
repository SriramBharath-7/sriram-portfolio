"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";

type Tone = "success" | "error" | "info";

interface Toast {
  id: number;
  tone: Tone;
  message: string;
}

interface ConfirmOptions {
  title: string;
  message?: React.ReactNode;
  confirmLabel?: string;
  tone?: "danger" | "default";
  /** Glyph beside the title; defaults to a warning sign. */
  icon?: IconName;
}

interface FeedbackContextValue {
  toast: (message: string, tone?: Tone) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  /** Editors report unsaved state so navigation can warn before discarding it. */
  setDirty: (source: string, dirty: boolean) => void;
  hasUnsavedChanges: () => boolean;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

/** Separate so only the system bar re-renders when the unsaved count changes. */
const UnsavedContext = createContext(0);

const TOAST_STYLE: Record<Tone, { icon: IconName; source: string }> = {
  success: { icon: "check", source: "done" },
  error: { icon: "alert", source: "error" },
  info: { icon: "info", source: "notice" },
};

export function AdminFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [pending, setPending] = useState<(ConfirmOptions & { resolve: (ok: boolean) => void }) | null>(
    null
  );
  const [closing, setClosing] = useState(false);
  const [unsaved, setUnsaved] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dirtySources = useRef(new Set<string>());
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((current) => current.filter((t) => t.id !== id)), []);

  const toast = useCallback(
    (message: string, tone: Tone = "success") => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-3), { id, tone, message }]);
      window.setTimeout(() => dismiss(id), 3800);
    },
    [dismiss]
  );

  const confirm = useCallback(
    (options: ConfirmOptions) => new Promise<boolean>((resolve) => setPending({ ...options, resolve })),
    []
  );

  const setDirty = useCallback((source: string, dirty: boolean) => {
    const sources = dirtySources.current;
    if (dirty === sources.has(source)) return;
    if (dirty) sources.add(source);
    else sources.delete(source);
    setUnsaved(sources.size);
  }, []);

  const hasUnsavedChanges = useCallback(() => dirtySources.current.size > 0, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (pending && dialog && !dialog.open) {
      setClosing(false);
      dialog.showModal();
    }
  }, [pending]);

  // Native browser prompt when closing or reloading the tab with unsaved edits.
  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dirtySources.current.size === 0) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  /** Resolves immediately; the dialog animates out before it actually closes. */
  const settle = (ok: boolean) => {
    if (!pending || closing) return;
    pending.resolve(ok);
    setClosing(true);
    window.setTimeout(() => {
      dialogRef.current?.close();
      setPending(null);
      setClosing(false);
    }, 150);
  };

  const value = useMemo(
    () => ({ toast, confirm, setDirty, hasUnsavedChanges }),
    [toast, confirm, setDirty, hasUnsavedChanges]
  );

  const danger = pending?.tone === "danger";

  return (
    <FeedbackContext.Provider value={value}>
      <UnsavedContext.Provider value={unsaved}>{children}</UnsavedContext.Provider>

      <dialog
        ref={dialogRef}
        className="adm-dialog"
        data-closing={closing}
        onCancel={(event) => {
          event.preventDefault();
          settle(false);
        }}
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) cancels.
          if (event.target === event.currentTarget) settle(false);
        }}
        aria-labelledby="adm-confirm-title"
      >
        {pending && (
          <>
            <div className="adm-dialog-bar">Confirm</div>
            <div className="adm-dialog-body">
              <span className="adm-dialog-icon" data-tone={danger ? "danger" : undefined}>
                <Icon name={pending.icon ?? "alert"} size={18} />
              </span>
              <div className="min-w-0 pt-0.5">
                <h2 id="adm-confirm-title" className="text-[length:var(--fs-lg)] font-semibold leading-snug">
                  {pending.title}
                </h2>
                {pending.message && (
                  <div className="adm-muted mt-1.5 text-[length:var(--fs-sm)]">{pending.message}</div>
                )}
              </div>
            </div>
            <div className="adm-dialog-actions">
              <button type="button" className="adm-btn adm-btn--ghost" onClick={() => settle(false)}>
                Cancel
              </button>
              <button
                type="button"
                autoFocus
                className={`adm-btn ${danger ? "adm-btn--danger-solid" : "adm-btn--primary"}`}
                onClick={() => settle(true)}
              >
                {pending.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </>
        )}
      </dialog>

      <div className="adm-toasts" aria-live="polite">
        {toasts.map((item) => {
          const style = TOAST_STYLE[item.tone];
          return (
            <div
              key={item.id}
              className="adm-toast"
              data-tone={item.tone}
              role={item.tone === "error" ? "alert" : "status"}
            >
              <Icon name={style.icon} size={18} />
              <div className="min-w-0 flex-1">
                <p className="adm-toast-src">{style.source}</p>
                <p className="adm-toast-msg">{item.message}</p>
              </div>
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--icon !w-7 !h-7 -mr-1 -mt-1"
                aria-label="Dismiss notification"
                onClick={() => dismiss(item.id)}
              >
                <Icon name="x" size={14} />
              </button>
              <span className="adm-toast-timer" aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback must be used inside AdminFeedbackProvider");
  return context;
}

/** Number of editors on the page with unsaved edits. */
export function useUnsavedCount(): number {
  return useContext(UnsavedContext);
}
