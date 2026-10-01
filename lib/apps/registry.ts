import type { AppDefinition } from "./types";

/**
 * Every window application the code can render.
 *
 * Window geometry and behaviour live here; display name, icon, visibility and
 * order come from the admin-editable app config (content/apps.ts or Supabase),
 * merged by resolveApps(). Adding a new window app still means adding an entry
 * here plus a renderer in the window host.
 */
export const APP_REGISTRY: AppDefinition[] = [
  {
    id: "terminal",
    name: "Terminal",
    title: "kali@kali: ~",
    icon: "/assets/svg/terminal.svg",
    kind: "terminal",
    enabled: true,
    showOnDesktop: true,
    showInTaskbar: true,
    singleton: true,
    positionStrategy: "center",
    defaultSize: {
      small: { widthVw: 96, heightVh: 70, maxWidthPx: 720 },
      medium: { widthVw: 88, heightVh: 72, maxWidthPx: 900 },
      large: { widthVw: 66, heightVh: 72, maxWidthPx: 1200 },
    },
    minSize: { width: 420, height: 280 },
  },
  {
    id: "firefox",
    name: "Firefox",
    title: "Mozilla Firefox",
    icon: "/assets/svg/firefox.svg",
    kind: "browser",
    enabled: true,
    showOnDesktop: true,
    showInTaskbar: true,
    singleton: true,
    positionStrategy: "center",
    defaultSize: {
      small: { widthVw: 96, heightVh: 82, maxWidthPx: 760 },
      medium: { widthVw: 92, heightVh: 84, maxWidthPx: 980 },
      large: { widthVw: 80, heightVh: 84, maxWidthPx: 1500 },
    },
    minSize: { width: 480, height: 340 },
  },
];

