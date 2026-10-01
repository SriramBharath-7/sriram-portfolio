"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  getViewport,
  resolveDefaultRect,
  resolveMaximizedRect,
  type DesktopApp,
} from "@/lib/apps";
import { initialWindowManagerState, windowManagerReducer } from "./reducer";
import type { LaunchProps, WindowInstance } from "./types";

interface WindowManagerContextValue {
  windows: WindowInstance[];
  /** Desktop apps and shortcuts in display order (registry merged with admin config). */
  apps: DesktopApp[];
  openWindow: (appId: string, launchProps?: LaunchProps) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(null);

export function WindowManagerProvider({
  apps,
  children,
}: {
  apps: DesktopApp[];
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    windowManagerReducer,
    initialWindowManagerState
  );

  useEffect(() => {
    // The root font size (and so the top bar) is viewport-driven, so a resize
    // can change the UI scale as well as the available space.
    const handleResize = () => {
      dispatch({ type: "CLAMP_TO_VIEWPORT", viewport: getViewport() });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openWindow = useCallback(
    (appId: string, launchProps?: LaunchProps) => {
      const launch = (id: string, props?: LaunchProps): void => {
        const app = apps.find((entry) => entry.id === id);
        if (!app || !app.enabled) return;

        // Shortcuts never get a window of their own.
        if (app.kind === "link") {
          if (app.url && /^https?:\/\//i.test(app.url)) {
            window.open(app.url, "_blank", "noopener,noreferrer");
          }
          return;
        }
        if (app.kind === "route") {
          if (app.url) launch("firefox", { url: app.url });
          return;
        }

        const definition = app.window;
        if (!definition) return;
        // Firefox opened without a target starts on its configured start page.
        const withStart =
          app.kind === "browser" && app.url && typeof props?.url !== "string"
            ? { ...props, url: app.url }
            : props;

        dispatch({
          type: "OPEN",
          payload: {
            appId: app.id,
            title: definition.title,
            rect: resolveDefaultRect(definition, getViewport()),
            launchProps: withStart,
            singleton: definition.singleton,
          },
        });
      };
      launch(appId, launchProps);
    },
    [apps]
  );

  const closeWindow = useCallback((id: string) => dispatch({ type: "CLOSE", id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: "FOCUS", id }), []);
  const minimizeWindow = useCallback(
    (id: string) => dispatch({ type: "MINIMIZE", id }),
    []
  );
  const restoreWindow = useCallback(
    (id: string) => dispatch({ type: "RESTORE", id }),
    []
  );
  const maximizeWindow = useCallback((id: string) => {
    dispatch({
      type: "TOGGLE_MAXIMIZE",
      id,
      maximizedRect: resolveMaximizedRect(getViewport()),
    });
  }, []);
  const moveWindow = useCallback(
    (id: string, x: number, y: number) => dispatch({ type: "MOVE", id, x, y }),
    []
  );
  const resizeWindow = useCallback(
    (id: string, width: number, height: number) =>
      dispatch({ type: "RESIZE", id, width, height }),
    []
  );

  const value = useMemo<WindowManagerContextValue>(
    () => ({
      windows: state.windows,
      apps,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      restoreWindow,
      maximizeWindow,
      moveWindow,
      resizeWindow,
    }),
    [
      state.windows,
      apps,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      restoreWindow,
      maximizeWindow,
      moveWindow,
      resizeWindow,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager(): WindowManagerContextValue {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used inside a WindowManagerProvider");
  }
  return context;
}

/** The window instance for an app, or undefined when it is not open. */
export function useAppWindow(appId: string): WindowInstance | undefined {
  const { windows } = useWindowManager();
  return windows.find((w) => w.appId === appId);
}
