/** How the desktop should launch and render an application. */
export type AppKind = "terminal" | "browser";

export type PositionStrategy = "center" | "cascade";

export interface SizePreset {
  widthVw: number;
  heightVh: number;
  maxWidthPx: number;
}

/** Default window size per viewport breakpoint. */
export interface ResponsiveSize {
  small: SizePreset;
  medium: SizePreset;
  large: SizePreset;
}

export interface AppDefinition {
  id: string;
  name: string;
  /** Window titlebar text. */
  title: string;
  /** Public path to the desktop/taskbar icon. */
  icon: string;
  kind: AppKind;
  enabled: boolean;
  showOnDesktop: boolean;
  showInTaskbar: boolean;
  /** When true, launching again focuses the existing window instead of stacking. */
  singleton: boolean;
  defaultSize: ResponsiveSize;
  minSize?: { width: number; height: number };
  positionStrategy: PositionStrategy;
}
