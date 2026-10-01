"use client";

import { HIGHLIGHT_CLASSES } from "@/content/schema";
import { INTERNAL_URLS, ROUTE_META } from "@/lib/browser/route-meta";
import { SelectField, type SelectOption } from "../ui";

const HIGHLIGHT_LABELS: Record<(typeof HIGHLIGHT_CLASSES)[number], string> = {
  "skill-highlight": "Accent (cyan)",
  "lang-python": "Python blue",
  "lang-bash": "Bash green",
  "lang-ps": "PowerShell blue",
  "lang-java": "Java yellow",
  "lang-html": "HTML orange",
  "lang-markdown": "Markdown purple",
};

export const HIGHLIGHT_OPTIONS: SelectOption[] = [
  { value: "", label: "Default colour" },
  ...HIGHLIGHT_CLASSES.map((value) => ({ value, label: HIGHLIGHT_LABELS[value] })),
];

/** Terminal colour for a label. Empty selection stores no class at all. */
export function HighlightSelect({
  value,
  onChange,
  error,
}: {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  error?: string;
}) {
  return (
    <SelectField
      label="Terminal colour"
      value={value ?? ""}
      onChange={(next) => onChange(next === "" ? undefined : next)}
      options={HIGHLIGHT_OPTIONS}
      error={error}
    />
  );
}

export const ROUTE_OPTIONS: SelectOption[] = INTERNAL_URLS.map((url) => {
  const meta = ROUTE_META.find((route) => route.url === url);
  return { value: url, label: meta ? `${meta.label} (${url})` : url };
});

export function RouteSelect({
  label = "Internal page",
  value,
  onChange,
  error,
  hint,
}: {
  label?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}) {
  return (
    <SelectField
      label={label}
      value={value ?? ""}
      onChange={onChange}
      options={[{ value: "", label: "Choose a page…" }, ...ROUTE_OPTIONS]}
      error={error}
      hint={hint}
    />
  );
}

/** Truncated one-line preview for collapsed list rows. */
export function preview(text: string | undefined, max = 90): string {
  if (!text) return "";
  const single = text.replace(/\s+/g, " ").trim();
  return single.length > max ? `${single.slice(0, max - 1)}…` : single;
}
