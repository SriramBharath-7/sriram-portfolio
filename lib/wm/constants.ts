/**
 * Window-manager constants. Geometry that depends on the responsive scale
 * (top-bar height, UI scale) is read live from CSS — see ./metrics.ts.
 */

/** Small gap so a window never sits flush against the top bar. */
export const WAYBAR_PADDING = 4;

/** Lowest z-index handed out to windows. Keeps them above desktop chrome. */
export const BASE_Z_INDEX = 40;

/** Minimum window size at the 1080p design scale; multiplied by the UI scale. */
export const MIN_WINDOW_WIDTH = 380;
export const MIN_WINDOW_HEIGHT = 260;
