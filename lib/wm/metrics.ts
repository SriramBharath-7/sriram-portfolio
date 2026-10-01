/**
 * Live desktop metrics read from CSS, so window geometry in JS always matches
 * the responsive scale defined in app/globals.css (fluid `html` font-size +
 * rem tokens). Nothing here is hard-coded per resolution.
 */

/** Top-bar height before the taskbar mounts (and during SSR): 3rem at 16px. */
export const DEFAULT_TOP_INSET = 48;

/** Root font size in px — the single responsive knob. */
export function getRootFontSize(): number {
  if (typeof document === "undefined") return 16;
  const size = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return size > 0 ? size : 16;
}

/** Global UI scale relative to the 1080p design size (16px root). */
export function getUiScale(): number {
  return getRootFontSize() / 16;
}

/**
 * Current top-bar height in px. Measures the rendered taskbar; falls back to
 * the `--topbar-h` token, then to the 1080p default.
 */
export function getTopInset(): number {
  if (typeof document === "undefined") return DEFAULT_TOP_INSET;

  const bar = document.querySelector<HTMLElement>(".taskbar");
  const measured = bar?.getBoundingClientRect().height ?? 0;
  if (measured > 0) return measured;

  const token = getComputedStyle(document.documentElement)
    .getPropertyValue("--topbar-h")
    .trim();
  const rem = parseFloat(token);
  if (token.endsWith("rem") && rem > 0) return rem * getRootFontSize();

  return DEFAULT_TOP_INSET;
}
