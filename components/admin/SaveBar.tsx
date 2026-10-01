"use client";

import { useCallback, useEffect, useState } from "react";
import type { DocumentEditor } from "./useDocumentEditor";
import { useFeedback } from "./feedback";
import { Icon } from "./icons";

/** The parts of an editor the bar needs; independent of the document type. */
type SaveTarget = Pick<
  DocumentEditor<unknown>,
  "docKey" | "label" | "dirty" | "status" | "error" | "save" | "discard"
>;

/**
 * Sticky save bar for one or more document editors on a page. Appears when
 * there are unsaved edits or errors; Ctrl/Cmd+S saves.
 */
export function SaveBar({ editors }: { editors: SaveTarget[] }) {
  const { toast, confirm } = useFeedback();
  const [busy, setBusy] = useState(false);

  const dirty = editors.filter((editor) => editor.dirty);
  const failed = editors.filter((editor) => editor.status === "error" && editor.error);
  const visible = dirty.length > 0 || failed.length > 0 || busy;

  const saveAll = useCallback(async () => {
    const pending = editors.filter((editor) => editor.dirty || editor.status === "error");
    if (pending.length === 0 || busy) return;
    setBusy(true);
    let ok = true;
    for (const editor of pending) {
      // Sequential on purpose: each document is its own row and its own revalidation.
      ok = (await editor.save()) && ok;
    }
    setBusy(false);
    if (ok) toast("Saved. The live portfolio now shows your changes.");
    else toast("Some changes were not saved. Check the highlighted fields.", "error");
  }, [editors, busy, toast]);

  const discardAll = async () => {
    const ok = await confirm({
      title: "Discard unsaved changes?",
      message: "Your edits on this page will be reverted to the last saved version.",
      confirmLabel: "Discard",
      tone: "danger",
    });
    if (ok) editors.forEach((editor) => editor.discard());
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        void saveAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saveAll]);

  if (!visible) return null;

  return (
    <div className="sticky bottom-4 z-30 mt-8 adm-savebar">
      <div className="adm-card flex flex-wrap items-center gap-3 px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.55)] border-[var(--border-strong)]">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {failed.length > 0 && !busy ? (
            <>
              <Icon name="alert" size={18} className="text-[var(--danger)]" />
              <div className="min-w-0">
                {failed.map((editor) => (
                  <p key={editor.docKey + editor.label} className="text-[13px] text-[#ffb3ba] truncate">
                    {editor.error}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[var(--warning)]" aria-hidden="true" />
              <p className="text-[13.5px]">
                {busy ? "Saving…" : `Unsaved changes in ${dirty.map((editor) => editor.label).join(", ")}`}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[12px] adm-faint mr-1">Ctrl + S</span>
          <button type="button" className="adm-btn adm-btn--ghost" onClick={discardAll} disabled={busy || dirty.length === 0}>
            Discard
          </button>
          <button type="button" className="adm-btn adm-btn--primary" onClick={() => void saveAll()} disabled={busy}>
            {busy ? <span className="adm-spinner" aria-hidden="true" /> : <Icon name="check" size={16} />}
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
