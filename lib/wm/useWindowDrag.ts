"use client";

import { useCallback, useEffect, useRef } from "react";
import { WAYBAR_PADDING } from "./constants";
import { getTopInset } from "./metrics";
import { useWindowManager } from "./WindowManagerProvider";
import type { WindowInstance } from "./types";

/**
 * Titlebar drag handler shared by every window.
 *
 * Position lives in the window manager, so dragging dispatches MOVE rather than
 * mutating element styles. Listeners are attached to the document only while a
 * drag is in progress and are always torn down on unmount.
 */
export function useWindowDrag(win: WindowInstance | undefined) {
  const { moveWindow, focusWindow } = useWindowManager();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanupRef.current?.(), []);

  return useCallback(
    (event: React.MouseEvent) => {
      if (!win || win.maximized) return;
      event.preventDefault();
      focusWindow(win.id);

      const startX = event.clientX;
      const startY = event.clientY;
      const originX = win.rect.x;
      const originY = win.rect.y;
      const { width, height } = win.rect;

      const minY = getTopInset() + WAYBAR_PADDING;
      const maxX = Math.max(0, window.innerWidth - width);
      const maxY = Math.max(minY, window.innerHeight - height);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();
        const nextX = Math.max(
          0,
          Math.min(maxX, originX + (moveEvent.clientX - startX))
        );
        const nextY = Math.max(
          minY,
          Math.min(maxY, originY + (moveEvent.clientY - startY))
        );
        moveWindow(win.id, nextX, nextY);
      };

      const cleanup = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", cleanup);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        cleanupRef.current = null;
      };

      cleanupRef.current = cleanup;
      document.body.style.cursor = "move";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", cleanup);
    },
    [win, moveWindow, focusWindow]
  );
}
