import type { AppConfig } from "@/content/types";
import { APP_REGISTRY } from "./registry";
import type { AppDefinition } from "./types";

/**
 * A desktop entry: admin-editable metadata plus, for window apps, the
 * code-defined window definition (sizes, title, singleton) from the registry.
 */
export interface DesktopApp extends AppConfig {
  window?: AppDefinition;
}

/**
 * Merges the stored app configuration with the code registry. Window apps
 * keep their registry behaviour and take only safe metadata from the config;
 * an entry for a window app the code no longer has is dropped. Shortcuts
 * (link / route) need no registry entry and never open a window.
 */
export function resolveApps(config: AppConfig[]): DesktopApp[] {
  return config.flatMap<DesktopApp>((app) => {
    if (app.kind === "link" || app.kind === "route") {
      return [{ ...app, showInTaskbar: false }];
    }
    const definition = APP_REGISTRY.find((entry) => entry.id === app.id && entry.kind === app.kind);
    if (!definition) return [];
    return [
      {
        ...app,
        window: {
          ...definition,
          name: app.name,
          icon: app.icon,
          enabled: app.enabled,
          showOnDesktop: app.showOnDesktop,
          showInTaskbar: app.showInTaskbar,
        },
      },
    ];
  });
}
