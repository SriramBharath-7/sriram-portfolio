export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Viewport plus the live responsive metrics window geometry depends on. */
export interface Viewport {
  width: number;
  height: number;
  /** Root font size / 16 — the global UI scale (see app/globals.css). */
  scale: number;
  /** Rendered top-bar height in px. */
  topInset: number;
}

/** Arbitrary per-launch payload, e.g. which page the browser should open on. */
export type LaunchProps = Record<string, unknown>;

export interface WindowInstance {
  /** Unique instance id. For singleton apps this equals the app id. */
  id: string;
  appId: string;
  title: string;
  rect: Rect;
  zIndex: number;
  focused: boolean;
  minimized: boolean;
  maximized: boolean;
  /** Geometry to restore to when un-maximizing. Null while not maximized. */
  prevRect: Rect | null;
  launchProps: LaunchProps;
  /**
   * Incremented every time the window is (re)launched. Apps can watch this to
   * react to a new launch request without being remounted.
   */
  launchNonce: number;
}

export interface WindowManagerState {
  windows: WindowInstance[];
  /** Next z-index to hand out. Monotonic. */
  nextZIndex: number;
}

export interface OpenWindowPayload {
  appId: string;
  title: string;
  rect: Rect;
  launchProps?: LaunchProps;
  /** When true, reuses the existing window for this app instead of stacking. */
  singleton: boolean;
}

export type WindowManagerAction =
  | { type: "OPEN"; payload: OpenWindowPayload }
  | { type: "CLOSE"; id: string }
  | { type: "FOCUS"; id: string }
  | { type: "MINIMIZE"; id: string }
  | { type: "RESTORE"; id: string }
  | { type: "TOGGLE_MAXIMIZE"; id: string; maximizedRect: Rect }
  | { type: "MOVE"; id: string; x: number; y: number }
  | { type: "RESIZE"; id: string; width: number; height: number }
  | { type: "CLAMP_TO_VIEWPORT"; viewport: Viewport };
