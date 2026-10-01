"use client";

import type { Tab } from "@/lib/browser/types";

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelect: (tabId: string) => void;
  onClose: (tabId: string) => void;
  onNew: () => void;
}

export default function TabBar({
  tabs,
  activeTabId,
  onSelect,
  onClose,
  onNew,
}: TabBarProps) {
  return (
    <div className="firefox-tabbar flex items-end gap-1 px-2 pt-2 bg-gray-950/60 border-b border-gray-700/50 flex-shrink-0 overflow-x-auto">
      {tabs.map((tab) => {
        const active = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            title={tab.title}
            className={`firefox-tab ${
              active ? "firefox-tab--active" : ""
            } group flex items-center gap-2 min-w-[8.5rem] max-w-[15rem] rounded-t-md cursor-pointer ${
              active
                ? "bg-gray-800 text-gray-50 border-t border-x border-gray-600/60"
                : "bg-gray-900/45 text-gray-400 hover:bg-gray-800/70 hover:text-gray-200"
            }`}
          >
            <span className="truncate flex-1 min-w-0 leading-none">{tab.title}</span>
            <button
              type="button"
              aria-label={`Close ${tab.title}`}
              onClick={(event) => {
                event.stopPropagation();
                onClose(tab.id);
              }}
              className="firefox-tab-close rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 t-xs leading-none"
            >
              ✕
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={onNew}
        title="New tab"
        aria-label="New tab"
        className="chrome-button press mb-0.5 ml-1 w-8 h-8 rounded-md flex items-center justify-center text-gray-400 text-lg leading-none flex-shrink-0"
      >
        +
      </button>
    </div>
  );
}
