import type { AppConfig } from "./types";

/**
 * Desktop applications in display order. The two window apps are built into
 * the code (see lib/apps/registry.ts); this list only carries their editable
 * metadata. Extra entries of kind "link" or "route" are pure shortcuts.
 */
export const apps: AppConfig[] = [
  {
    id: "terminal",
    kind: "terminal",
    name: "Terminal",
    icon: "/assets/svg/terminal.svg",
    enabled: true,
    showOnDesktop: true,
    showInTaskbar: true,
  },
  {
    id: "firefox",
    kind: "browser",
    name: "Firefox",
    icon: "/assets/svg/firefox.svg",
    enabled: true,
    showOnDesktop: true,
    showInTaskbar: true,
    url: "home://start",
  },
];
