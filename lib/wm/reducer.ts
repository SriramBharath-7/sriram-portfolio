import {
  BASE_Z_INDEX,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  WAYBAR_PADDING,
} from "./constants";
import type {
  Rect,
  Viewport,
  WindowInstance,
  WindowManagerAction,
  WindowManagerState,
} from "./types";

export const initialWindowManagerState: WindowManagerState = {
  windows: [],
  nextZIndex: BASE_Z_INDEX,
};

/** Keeps a window fully on screen and below the top bar. */
export function clampRect(rect: Rect, viewport: Viewport): Rect {
  const minY = viewport.topInset + WAYBAR_PADDING;
  const minWidth = MIN_WINDOW_WIDTH * viewport.scale;
  const minHeight = MIN_WINDOW_HEIGHT * viewport.scale;
  const width = Math.min(Math.max(rect.width, minWidth), viewport.width);
  const height = Math.min(
    Math.max(rect.height, minHeight),
    Math.max(viewport.height - minY, minHeight)
  );
  return {
    width,
    height,
    x: Math.max(0, Math.min(rect.x, viewport.width - width)),
    y: Math.max(minY, Math.min(rect.y, Math.max(minY, viewport.height - height))),
  };
}

/** Marks one window focused and raises it above every other window. */
function focus(state: WindowManagerState, id: string): WindowManagerState {
  const target = state.windows.find((w) => w.id === id);
  if (!target) return state;
  if (target.focused && target.zIndex === state.nextZIndex - 1 && !target.minimized) {
    return state;
  }

  return {
    nextZIndex: state.nextZIndex + 1,
    windows: state.windows.map((w) =>
      w.id === id
        ? { ...w, focused: true, minimized: false, zIndex: state.nextZIndex }
        : { ...w, focused: false }
    ),
  };
}

export function windowManagerReducer(
  state: WindowManagerState,
  action: WindowManagerAction
): WindowManagerState {
  switch (action.type) {
    case "OPEN": {
      const { appId, title, rect, launchProps = {}, singleton } = action.payload;
      const existing = singleton
        ? state.windows.find((w) => w.appId === appId)
        : undefined;

      if (existing) {
        const raised = focus(
          {
            ...state,
            windows: state.windows.map((w) =>
              w.id === existing.id
                ? {
                    ...w,
                    launchProps: { ...w.launchProps, ...launchProps },
                    launchNonce: w.launchNonce + 1,
                  }
                : w
            ),
          },
          existing.id
        );
        return raised;
      }

      const id = singleton ? appId : `${appId}-${state.nextZIndex}`;
      const created: WindowInstance = {
        id,
        appId,
        title,
        rect,
        zIndex: state.nextZIndex,
        focused: true,
        minimized: false,
        maximized: false,
        prevRect: null,
        launchProps,
        launchNonce: 1,
      };

      return {
        nextZIndex: state.nextZIndex + 1,
        windows: [
          ...state.windows.map((w) => ({ ...w, focused: false })),
          created,
        ],
      };
    }

    case "CLOSE": {
      const windows = state.windows.filter((w) => w.id !== action.id);
      if (windows.length === state.windows.length) return state;
      // Hand focus to the highest remaining window so the desktop never ends
      // up with an open-but-unfocused stack.
      const topmost = windows.reduce<WindowInstance | null>(
        (best, w) => (!w.minimized && (!best || w.zIndex > best.zIndex) ? w : best),
        null
      );
      return {
        ...state,
        windows: windows.map((w) => ({ ...w, focused: w.id === topmost?.id })),
      };
    }

    case "FOCUS":
      return focus(state, action.id);

    case "MINIMIZE": {
      const target = state.windows.find((w) => w.id === action.id);
      if (!target || target.minimized) return state;
      const remaining = state.windows.filter(
        (w) => w.id !== action.id && !w.minimized
      );
      const topmost = remaining.reduce<WindowInstance | null>(
        (best, w) => (!best || w.zIndex > best.zIndex ? w : best),
        null
      );
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, minimized: true, focused: false }
            : { ...w, focused: w.id === topmost?.id }
        ),
      };
    }

    case "RESTORE":
      return focus(state, action.id);

    case "TOGGLE_MAXIMIZE": {
      const target = state.windows.find((w) => w.id === action.id);
      if (!target) return state;
      const next = target.maximized
        ? {
            ...target,
            maximized: false,
            rect: target.prevRect ?? target.rect,
            prevRect: null,
          }
        : {
            ...target,
            maximized: true,
            prevRect: target.rect,
            rect: action.maximizedRect,
          };
      return focus(
        {
          ...state,
          windows: state.windows.map((w) => (w.id === action.id ? next : w)),
        },
        action.id
      );
    }

    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, rect: { ...w.rect, x: action.x, y: action.y } }
            : w
        ),
      };

    case "RESIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? {
                ...w,
                rect: {
                  ...w.rect,
                  width: Math.max(action.width, MIN_WINDOW_WIDTH),
                  height: Math.max(action.height, MIN_WINDOW_HEIGHT),
                },
              }
            : w
        ),
      };

    case "CLAMP_TO_VIEWPORT": {
      const { viewport } = action;
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.maximized
            ? {
                ...w,
                rect: {
                  x: 0,
                  y: viewport.topInset,
                  width: viewport.width,
                  height: viewport.height - viewport.topInset,
                },
              }
            : { ...w, rect: clampRect(w.rect, viewport) }
        ),
      };
    }

    default:
      return state;
  }
}
