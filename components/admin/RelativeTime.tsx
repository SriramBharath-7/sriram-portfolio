"use client";

import { useEffect, useState } from "react";

function describe(iso: string): string {
  const seconds = Math.round((Date.now() - Date.parse(iso)) / 1000);
  if (Number.isNaN(seconds)) return "unknown";
  if (seconds < 45) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} d ago`;
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** "5 min ago", rendered after mount so server and client never disagree. */
export default function RelativeTime({ iso, fallback = "—" }: { iso: string | null; fallback?: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!iso) return;
    setLabel(describe(iso));
    const timer = window.setInterval(() => setLabel(describe(iso)), 60_000);
    return () => window.clearInterval(timer);
  }, [iso]);

  if (!iso) return <span>{fallback}</span>;
  return (
    <time dateTime={iso} title={new Date(iso).toUTCString()}>
      {label ?? ""}
    </time>
  );
}
