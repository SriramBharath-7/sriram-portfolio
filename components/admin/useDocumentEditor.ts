"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { saveDocumentAction } from "@/lib/admin/actions";
import { validateDocument, type ValidationIssue } from "@/content/schema";
import type { DocumentKey } from "@/content/documents";
import { useFeedback } from "./feedback";

type Path = (string | number)[];

function parsePath(path: string): Path {
  return path === "" ? [] : path.split(".").map((part) => (/^\d+$/.test(part) ? Number(part) : part));
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getIn(source: unknown, path: string): unknown {
  let node: unknown = source;
  for (const key of parsePath(path)) {
    if (node === null || node === undefined) return undefined;
    node = (node as Record<string | number, unknown>)[key];
  }
  return node;
}

/** Immutable set-by-path: copies only the objects along the path. */
export function setIn<T>(source: T, path: string, value: unknown): T {
  const keys = parsePath(path);
  const write = (node: unknown, depth: number): unknown => {
    if (depth === keys.length) return value;
    const key = keys[depth];
    const current = node === null || node === undefined ? undefined : (node as Record<string | number, unknown>)[key];
    const child = write(current, depth + 1);
    if (Array.isArray(node)) {
      const copy = node.slice();
      copy[key as number] = child;
      return copy;
    }
    return { ...(isObject(node) ? node : {}), [key]: child };
  };
  return write(source, 0) as T;
}

function pick(source: unknown, keys: string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!isObject(source)) return out;
  for (const key of keys) if (key in source) out[key] = source[key];
  return out;
}

export type EditorStatus = "idle" | "saving" | "saved" | "error";

export interface ListOps<I> {
  items: I[];
  add: (item: I) => void;
  remove: (index: number) => void;
  move: (from: number, to: number) => void;
  update: (index: number, item: I) => void;
}

export interface DocumentEditor<T> {
  docKey: DocumentKey;
  label: string;
  value: T;
  setValue: (next: T) => void;
  set: (path: string, value: unknown) => void;
  field: (path: string) => { value: string; onChange: (value: string) => void; error?: string };
  list: <I>(path: string) => ListOps<I>;
  issue: (path: string) => string | undefined;
  issuesUnder: (prefix: string) => number;
  issues: ValidationIssue[];
  dirty: boolean;
  status: EditorStatus;
  error: string | null;
  savedAt: string | null;
  save: () => Promise<boolean>;
  discard: () => void;
}

interface Options<T> {
  docKey: DocumentKey;
  /** Human name used in save feedback, e.g. "Profile". */
  label: string;
  initial: T;
  /**
   * The full stored document when `initial` is only part of it (the Profile
   * page edits profile fields, the Socials page edits `socials`). Used for
   * client-side validation; the server merges the partial itself.
   */
  base?: unknown;
}

/**
 * Local draft of one stored document. Edits stay in the browser until saved;
 * saving validates with the same schema the server uses, then calls the
 * admin save action, which validates again before writing.
 */
export function useDocumentEditor<T>({ docKey, label, initial, base }: Options<T>): DocumentEditor<T> {
  const { setDirty } = useFeedback();
  const [value, setValueState] = useState<T>(initial);
  const [baseline, setBaseline] = useState<T>(initial);
  const [status, setStatus] = useState<EditorStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;
  const baseRef = useRef(base);

  const dirty = useMemo(() => JSON.stringify(value) !== JSON.stringify(baseline), [value, baseline]);

  const sourceId = `${docKey}:${label}`;
  useEffect(() => {
    setDirty(sourceId, dirty);
  }, [dirty, setDirty, sourceId]);
  useEffect(() => () => setDirty(sourceId, false), [setDirty, sourceId]);

  const touch = useCallback(() => {
    setStatus((current) => (current === "saved" ? "idle" : current));
  }, []);

  const setValue = useCallback(
    (next: T) => {
      setValueState(next);
      touch();
    },
    [touch]
  );

  const set = useCallback(
    (path: string, next: unknown) => {
      setValueState((current) => setIn(current, path, next));
      setIssues((current) => current.filter((item) => item.path !== path));
      touch();
    },
    [touch]
  );

  const issueMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const item of issues) if (!map.has(item.path)) map.set(item.path, item.message);
    return map;
  }, [issues]);

  const issue = useCallback((path: string) => issueMap.get(path), [issueMap]);

  const issuesUnder = useCallback(
    (prefix: string) =>
      issues.filter((item) => item.path === prefix || item.path.startsWith(`${prefix}.`)).length,
    [issues]
  );

  const field = useCallback(
    (path: string) => ({
      value: (getIn(value, path) as string | undefined) ?? "",
      onChange: (next: string) => set(path, next),
      error: issueMap.get(path),
    }),
    [value, set, issueMap]
  );

  const list = useCallback(
    <I,>(path: string): ListOps<I> => {
      const items = ((getIn(value, path) as I[] | undefined) ?? []) as I[];
      // Structural edits shift indexes, so stale issues under this list are dropped.
      const write = (next: I[]) => {
        setValueState((current) => setIn(current, path, next));
        setIssues((current) => current.filter((item) => !item.path.startsWith(path ? `${path}.` : "")));
        touch();
      };
      return {
        items,
        add: (item) => write([...items, item]),
        remove: (index) => write(items.filter((_, i) => i !== index)),
        move: (from, to) => {
          if (to < 0 || to >= items.length || from === to) return;
          const next = items.slice();
          const [moved] = next.splice(from, 1);
          next.splice(to, 0, moved);
          write(next);
        },
        update: (index, item) => write(items.map((existing, i) => (i === index ? item : existing))),
      };
    },
    [value, touch]
  );

  const save = useCallback(async () => {
    const submitted = valueRef.current;
    const merged =
      Array.isArray(submitted) || !isObject(baseRef.current)
        ? submitted
        : { ...baseRef.current, ...(submitted as Record<string, unknown>) };

    const local = validateDocument(docKey, merged);
    if (!local.ok) {
      setIssues(local.issues);
      setError(
        local.issues.length === 1
          ? `${label}: 1 field needs attention`
          : `${label}: ${local.issues.length} fields need attention`
      );
      setStatus("error");
      return false;
    }

    setStatus("saving");
    setError(null);
    try {
      const result = await saveDocumentAction(docKey, submitted);
      if (!result.ok) {
        setIssues(result.issues ?? []);
        setError(`${label}: ${result.error}`);
        setStatus("error");
        return false;
      }

      const normalized = (
        Array.isArray(submitted) ? result.value : pick(result.value, Object.keys(submitted as object))
      ) as T;
      baseRef.current = result.value;
      setBaseline(normalized);
      // Keep anything typed while the request was in flight.
      if (valueRef.current === submitted) setValueState(normalized);
      setIssues([]);
      setSavedAt(result.updatedAt);
      setStatus("saved");
      return true;
    } catch {
      setError(`${label}: could not reach the server. Nothing was saved.`);
      setStatus("error");
      return false;
    }
  }, [docKey, label]);

  const discard = useCallback(() => {
    setValueState(baseline);
    setIssues([]);
    setError(null);
    setStatus("idle");
  }, [baseline]);

  return {
    docKey,
    label,
    value,
    setValue,
    set,
    field,
    list,
    issue,
    issuesUnder,
    issues,
    dirty,
    status,
    error,
    savedAt,
    save,
    discard,
  };
}

/** Lowercase, dash-separated id from free text. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

/** A slug based on `text` that is not already in `taken`. */
export function uniqueId(text: string, taken: string[], fallback = "item"): string {
  const base = slugify(text) || fallback;
  if (!taken.includes(base)) return base;
  let counter = 2;
  while (taken.includes(`${base}-${counter}`)) counter += 1;
  return `${base}-${counter}`;
}
