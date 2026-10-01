import type { ComponentType } from "react";

export interface PageProps {
  /** Navigate this tab to another URL (internal or external). */
  navigate: (url: string) => void;
  /** Increments when the user hits refresh; data-fetching pages watch it. */
  reloadNonce: number;
}

export interface RouteDefinition {
  /** Canonical internal URL, e.g. "home://projects". */
  url: string;
  /** Window and tab title. */
  title: string;
  /** Short label used by the start page and quick links. */
  label: string;
  description: string;
  icon: string;
  component: ComponentType<PageProps>;
  /** Whether the start page surfaces this route as a tile. */
  showOnStart: boolean;
}

export interface Tab {
  id: string;
  url: string;
  title: string;
  /** Previously visited URLs, most recent last. */
  back: string[];
  /** URLs to redo, most recent first. */
  forward: string[];
  /** Bumped by refresh so pages can refetch. */
  reloadNonce: number;
}

export interface BrowserState {
  tabs: Tab[];
  activeTabId: string;
}

export type BrowserAction =
  | { type: "NAVIGATE"; tabId: string; url: string; title: string }
  | { type: "BACK"; tabId: string; title: (url: string) => string }
  | { type: "FORWARD"; tabId: string; title: (url: string) => string }
  | { type: "REFRESH"; tabId: string }
  | { type: "NEW_TAB"; url: string; title: string }
  | { type: "CLOSE_TAB"; tabId: string; fallbackUrl: string; fallbackTitle: string }
  | { type: "SWITCH_TAB"; tabId: string };
