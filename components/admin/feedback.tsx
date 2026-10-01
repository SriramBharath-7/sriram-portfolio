"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./icons";

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
}

interface FeedbackContextValue {
  toast: (message: string, tone?: Tone) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  /** Editors report unsaved state so navigation can warn before discarding it. */
  setDirty: (source: string, dirty: boolean) => void;
  hasUnsavedChanges: () => boolean;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function AdminFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [pending, setPending] = useState<(ConfirmOptions & { resolve: (ok: boolean) => void }) | null>(
    null
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dirtySources = useRef(new Set<string>());
  const nextId = useRef(1);

  const toast = useCallback((message: string, tone: Tone = "success") => {
    const id = nextId.current++;
    setToasts((current) => [...current.slice(-3), { id, tone, message }]);
    window.setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3800);
  }, []);

  const confirm = useCallback(
    (options: ConfirmOptions) => new Promise<boolean>((resolve) => setPending({ ...options, resolve })),
    []
  );

  const setDirty = useCallback((source: string, dirty: boolean) => {
    if (dirty) dirtySources.current.add(source);
    else dirtySources.current.delete(source);
  }, []);

  const hasUnsavedChanges = useCallback(() => dirtySources.current.size > 0, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (pending && dialog && !dialog.open) dialog.showModal();
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

  const settle = (ok: boolean) => {
    pending?.resolve(ok);
    setPending(null);
    dialogRef.current?.close();
  };

  const value = useMemo(
    () => ({ toast, confirm, setDirty, hasUnsavedChanges }),
    [toast, confirm, setDirty, hasUnsavedChanges]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <dialog
        ref={dialogRef}
        className="adm-dialog"
        onCancel={(event) => {
          event.preventDefault();
          settle(false);
        }}
        aria-labelledby="adm-confirm-title"
      >
        {pending && (
          <div className="p-5">
            <h2 id="adm-confirm-title" className="text-[16px] font-semibold">
              {pending.title}
            </h2>
            {pending.message && <div className="adm-muted mt-2 text-[13.5px]">{pending.message}</div>}
            <div className="flex justify-end gap-2 mt-5">
              <button type="button" className="adm-btn" onClick={() => settle(false)}>
                Cancel
              </button>
              <button
                type="button"
                autoFocus
                className={`adm-btn ${pending.tone === "danger" ? "adm-btn--danger-solid" : "adm-btn--primary"}`}
                onClick={() => settle(true)}
              >
                {pending.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        )}
      </dialog>

      <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 w-[min(360px,calc(100vw-40px))]" aria-live="polite">
        {toasts.map((item) => (
          <div
            key={item.id}
            className="adm-toast adm-card flex items-start gap-2.5 px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            role={item.tone === "error" ? "alert" : "status"}
          >
            <Icon
              name={item.tone === "error" ? "alert" : item.tone === "info" ? "database" : "check"}
              size={17}
              className={
                item.tone === "error"
                  ? "text-[var(--danger)] mt-0.5"
                  : item.tone === "info"
                  ? "text-[var(--accent)] mt-0.5"
                  : "text-[var(--success)] mt-0.5"
              }
            />
            <p className="text-[13.5px] min-w-0">{item.message}</p>
          </div>
        ))}
      </div>
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error("useFeedback must be used inside AdminFeedbackProvider");
  return context;
}
