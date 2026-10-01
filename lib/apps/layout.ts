import { WAYBAR_PADDING } from "@/lib/wm/constants";
import { DEFAULT_TOP_INSET, getTopInset, getUiScale } from "@/lib/wm/metrics";
import type { Rect, Viewport } from "@/lib/wm/types";
import type { AppDefinition, SizePreset } from "./types";

export type { Viewport };

/**
 * Default windows never get taller than this fraction of their width cap, so a
 * very tall screen gets a landscape window instead of a near-square one.
 */
const MAX_HEIGHT_TO_WIDTH = 0.7;

export function getViewport(): Viewport {
  if (typeof window === "undefined") {
    return { width: 1280, height: 800, scale: 1, topInset: DEFAULT_TOP_INSET };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scale: getUiScale(),
    topInset: getTopInset(),
  };
}

/** Picks the size preset for a viewport width, matching the original breakpoints. */
export function pickSizePreset(app: AppDefinition, viewportWidth: number): SizePreset {
  if (viewportWidth < 768) return app.defaultSize.small;
  if (viewportWidth < 1024) return app.defaultSize.medium;
  return app.defaultSize.large;
}

/**
 * Default geometry for a freshly launched window, centred below the top bar.
 * Proportions come from the preset; the px cap is a 1080p size multiplied by
 * the live UI scale, so windows grow with their content on larger screens.
 */
export function resolveDefaultRect(
  app: AppDefinition,
  viewport: Viewport,
  openWindowCount = 0
): Rect {
  const preset = pickSizePreset(app, viewport.width);
  const maxWidth = preset.maxWidthPx * viewport.scale;
  const width = Math.min((preset.widthVw / 100) * viewport.width, maxWidth);
  const height = Math.min(
    (preset.heightVh / 100) * viewport.height,
    maxWidth * MAX_HEIGHT_TO_WIDTH
  );

  const minY = viewport.topInset + WAYBAR_PADDING;
  let x = Math.max(0, (viewport.width - width) / 2);
  let y = Math.max(minY, (viewport.height - height) / 2);

  if (app.positionStrategy === "cascade") {
    const step = 28 * viewport.scale * openWindowCount;
    x = Math.min(x + step, Math.max(0, viewport.width - width));
    y = Math.min(y + step, Math.max(minY, viewport.height - height));
  }

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

/** Geometry for a maximized window: everything below the top bar. */
export function resolveMaximizedRect(viewport: Viewport): Rect {
  return {
    x: 0,
    y: viewport.topInset,
    width: viewport.width,
    height: viewport.height - viewport.topInset,
  };
}
