"use client";

import { useEffect, useState } from "react";
import { INTERNAL_URLS } from "@/lib/browser/route-meta";

interface ToolbarProps {
  url: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isBookmarked: boolean;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
  onNavigate: (url: string) => void;
  onToggleBookmark: () => void;
}

export default function Toolbar({
  url,
  canGoBack,
  canGoForward,
  isBookmarked,
  onBack,
  onForward,
  onRefresh,
  onNavigate,
  onToggleBookmark,
}: ToolbarProps) {
  const [draft, setDraft] = useState(url);

  // Keep the address bar in sync when navigation happens elsewhere.
  useEffect(() => setDraft(url), [url]);

  const navButton =
    "chrome-button rounded-md flex items-center justify-center t-xl text-gray-300 flex-shrink-0";

  return (
    <div className="url-bar flex items-center gap-1.5 px-3 py-2 bg-gray-800/80 flex-shrink-0 border-b border-gray-700/50">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={navButton}
        title="Back"
        aria-label="Back"
      >
        ←
      </button>
      <button
        onClick={onForward}
        disabled={!canGoForward}
        className={navButton}
        title="Forward"
        aria-label="Forward"
      >
        →
      </button>
      <button onClick={onRefresh} className={navButton} title="Reload" aria-label="Reload">
        ↻
      </button>

      <div className="address-bar flex-1 mx-1.5 px-3 bg-gray-950/60 border border-gray-700/60 rounded-md flex items-center gap-2 min-w-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]">
        <span className="text-emerald-400 t-xs flex-shrink-0" aria-hidden="true">
          🔒
        </span>
        <input
          type="text"
          value={draft}
          list="firefox-internal-urls"
          aria-label="Address bar"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onNavigate(draft.trim());
            if (event.key === "Escape") setDraft(url);
          }}
          spellCheck={false}
          className="flex-1 bg-transparent text-gray-200 outline-none t-md min-w-0"
        />
        <datalist id="firefox-internal-urls">
          {INTERNAL_URLS.map((internal) => (
            <option key={internal} value={internal} />
          ))}
        </datalist>
      </div>

      <button
        onClick={onToggleBookmark}
        className={`chrome-button press rounded-md flex items-center justify-center t-xl flex-shrink-0 ${
          isBookmarked ? "text-yellow-400" : "text-gray-400"
        }`}
        title={isBookmarked ? "Remove bookmark" : "Bookmark this page"}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this page"}
      >
        ★
      </button>
    </div>
  );
}
