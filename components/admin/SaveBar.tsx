"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DocumentEditor } from "./useDocumentEditor";
import { useFeedback } from "./feedback";
import { Icon } from "./icons";
import { Button } from "./ui";

/** The parts of an editor the bar needs; independent of the document type. */
type SaveTarget = Pick<
  DocumentEditor<unknown>,
  "docKey" | "label" | "dirty" | "status" | "error" | "savedAt" | "save" | "discard"
>;

type Phase = "idle" | "saving" | "saved";
type PanelPhase = "dirty" | "saving" | "saved" | "error";

const LEAVE_MS = 220;

function clock(iso: string | null): string {
  const date = iso ? new Date(iso) : new Date();
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

/**
 * Save status line for one or more document editors on a page. Slides in with
 * unsaved edits, sweeps while writing, confirms with a drawn check and slides
 * away. Ctrl/Cmd+S saves.
 */
export function SaveBar({ editors }: { editors: SaveTarget[] }) {
  const { toast, confirm } = useFeedback();
  const [phase, setPhase] = useState<Phase>("idle");
  const savedTimer = useRef<number>();

  const dirty = editors.filter((editor) => editor.dirty);
  const failed = editors.filter((editor) => editor.status === "error" && editor.error);
  const errorPhase = failed.length > 0 && phase !== "saving";
  const visible = dirty.length > 0 || errorPhase || phase !== "idle";
  const panelPhase: PanelPhase =
    phase === "saving" ? "saving" : phase === "saved" ? "saved" : errorPhase ? "error" : "dirty";

  // Stay mounted for the exit animation, still showing the last state.
  const [mounted, setMounted] = useState(visible);
  const shownPhase = useRef<PanelPhase>(panelPhase);
  if (visible) shownPhase.current = panelPhase;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    const timer = window.setTimeout(() => setMounted(false), LEAVE_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => () => window.clearTimeout(savedTimer.current), []);

  // Editing again after a save drops the "saved" confirmation immediately.
  useEffect(() => {
    if (phase === "saved" && dirty.length > 0) setPhase("idle");
  }, [phase, dirty.length]);

  const saveAll = useCallback(async () => {
    const pending = editors.filter((editor) => editor.dirty || editor.status === "error");
    if (pending.length === 0 || phase === "saving") return;
    setPhase("saving");
    let ok = true;
    for (const editor of pending) {
      // Sequential on purpose: each document is its own row and its own revalidation.
      ok = (await editor.save()) && ok;
    }
    if (ok) {
      setPhase("saved");
      window.clearTimeout(savedTimer.current);
      savedTimer.current = window.setTimeout(() => setPhase("idle"), 2400);
    } else {
      setPhase("idle");
      toast("Some changes were not saved. Check the highlighted fields.", "error");
    }
  }, [editors, phase, toast]);

  const discardAll = async () => {
    const ok = await confirm({
      title: "Discard unsaved changes?",
      message: "Your edits on this page go back to the last saved version.",
      confirmLabel: "Discard changes",
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

  if (!visible && !mounted) return null;

  const shown = visible ? panelPhase : shownPhase.current;
  const savedAt = editors
    .map((editor) => editor.savedAt)
    .filter((value): value is string => Boolean(value))
    .sort()
    .pop();

  return (
    <div className="adm-save" data-leaving={!visible} role="region" aria-label="Save changes">
      <div className="adm-save-panel" data-phase={shown}>
        <div key={shown} className="adm-save-status" aria-live="polite">
          {shown === "saved" ? (
            <>
              <span className="adm-save-glyph" data-tone="success">
                <svg
                  viewBox="0 0 24 24"
                  className="adm-check-draw"
                  style={{ width: "1.125rem", height: "1.125rem" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </span>
              <div className="min-w-0">
                <p className="adm-save-title">Saved · live on the portfolio</p>
                <p className="adm-save-detail">written to supabase at {clock(savedAt ?? null)}</p>
              </div>
            </>
          ) : shown === "saving" ? (
            <>
              <span className="adm-save-glyph" data-tone="accent">
                <span className="adm-spinner" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="adm-save-title">Saving…</p>
                <p className="adm-save-detail">validating → writing to supabase</p>
              </div>
            </>
          ) : shown === "error" ? (
            <>
              <span className="adm-save-glyph" data-tone="danger">
                <Icon name="alert" size={18} />
              </span>
              <div className="min-w-0">
                <p className="adm-save-title">Not saved</p>
                {failed.map((editor) => (
                  <p key={editor.docKey + editor.label} className="adm-save-detail !text-[#ffb0b6]">
                    {editor.error}
                  </p>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="adm-save-glyph">
                <Icon name="edit" size={17} />
              </span>
              <div className="min-w-0">
                <p className="adm-save-title">Unsaved changes</p>
                <p className="adm-save-detail">
                  {dirty.length === 0 ? "—" : dirty.map((editor) => editor.label.toLowerCase()).join(" · ")}
                </p>
              </div>
            </>
          )}
        </div>

        <div className="adm-save-actions">
          {shown === "saved" ? (
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn--ghost adm-btn--sm">
              <Icon name="external" size={15} />
              View live
            </a>
          ) : (
            <>
              <span className="hidden md:inline-flex items-center gap-1 mr-1.5" aria-hidden="true">
                <span className="adm-kbd">Ctrl</span>
                <span className="adm-kbd">S</span>
              </span>
              <Button variant="ghost" onClick={discardAll} disabled={phase === "saving" || dirty.length === 0}>
                Discard
              </Button>
              <Button
                variant="primary"
                icon="check"
                loading={phase === "saving"}
                className="min-w-[9.5rem]"
                onClick={() => void saveAll()}
              >
                {phase === "saving" ? "Saving…" : shown === "error" ? "Retry save" : "Save changes"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
