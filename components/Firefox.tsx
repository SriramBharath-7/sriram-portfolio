"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { usePortfolioContent } from "@/lib/content/provider";
import { useWindowDrag, useWindowManager } from "@/lib/wm";
import {
  activeTab as selectActiveTab,
  browserReducer,
  createInitialState,
} from "@/lib/browser/reducer";
import {
  NotFoundPage,
  START_URL,
  getRoute,
  isExternal,
  titleForUrl,
} from "@/lib/browser/routes";
import TabBar from "./firefox/TabBar";
import Toolbar from "./firefox/Toolbar";
import WindowControls from "./desktop/WindowControls";

interface FirefoxProps {
  /** Window manager instance this browser is rendered into. */
  windowId: string;
}

/** Reads the URL a launch request asked for, falling back to the start page. */
function urlFromLaunchProps(launchProps: Record<string, unknown>): string {
  const url = launchProps.url;
  return typeof url === "string" && url.length > 0 ? url : START_URL;
}

export default function Firefox({ windowId }: FirefoxProps) {
  const { windows, closeWindow, focusWindow, minimizeWindow, maximizeWindow } =
    useWindowManager();
  const win = windows.find((w) => w.id === windowId);
  const onTitlebarMouseDown = useWindowDrag(win);
  const { profile, bookmarks: defaultBookmarks } = usePortfolioContent();

  const initialUrl = urlFromLaunchProps(win?.launchProps ?? {});
  const [state, dispatch] = useReducer(browserReducer, undefined, () =>
    createInitialState(initialUrl, titleForUrl(initialUrl))
  );
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    defaultBookmarks.map((bookmark) => bookmark.url)
  );

  const tab = selectActiveTab(state);

  /** Internal URLs navigate in place; anything external opens a real tab. */
  const navigate = useCallback(
    (url: string) => {
      if (!url) return;
      if (url.startsWith("mailto:")) {
        window.location.href = url;
        return;
      }
      if (isExternal(url)) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
      dispatch({ type: "NAVIGATE", tabId: tab.id, url, title: titleForUrl(url) });
    },
    [tab.id]
  );

  // Respond to launch requests from the terminal or desktop while already open.
  const launchNonce = win?.launchNonce ?? 0;
  const launchProps = win?.launchProps;
  useEffect(() => {
    if (launchNonce <= 1) return;
    navigate(urlFromLaunchProps(launchProps ?? {}));
    // Only the nonce should retrigger this; navigate changes on tab switch and
    // would otherwise replay the launch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchNonce]);

  const route = getRoute(tab.url);
  const PageComponent = route?.component ?? NotFoundPage;

  const windowTitle = useMemo(
    () => `${titleForUrl(tab.url)} — ${profile.name} — Mozilla Firefox`,
    [tab.url, profile.name]
  );

  if (!win) return null;

  return (
    <div
      className={`firefox-window window-enter bg-gray-900/70 backdrop-blur-sm border overflow-hidden flex flex-col fixed ${
        win.focused
          ? "border-slate-700/80 ring-1 ring-purple-500/25"
          : "border-slate-800/80 window-unfocused"
      } ${win.maximized ? "firefox-maximized" : "rounded-lg"}`}
      style={{
        transition: win.maximized
          ? "none"
          : "transform 300ms ease-out, opacity 300ms ease-out, border-radius 300ms ease-out",
        width: `${win.rect.width}px`,
        height: `${win.rect.height}px`,
        maxWidth: "100%",
        top: `${win.rect.y}px`,
        left: `${win.rect.x}px`,
        boxShadow: win.maximized
          ? "none"
          : win.focused
          ? "0 24px 64px rgba(0, 0, 0, 0.65)"
          : "0 12px 36px rgba(0, 0, 0, 0.5)",
        display: win.minimized ? "none" : "flex",
        zIndex: win.zIndex,
      }}
      onMouseDown={() => focusWindow(windowId)}
    >
      <div
        className="firefox-titlebar bg-gray-950/95 flex items-center cursor-move flex-shrink-0 border-b border-gray-800/80 select-none"
        onMouseDown={onTitlebarMouseDown}
      >
        <div className="flex items-center w-full">
          <div className="flex-1" />
          <div className="firefox-title flex-shrink-0 text-gray-200/95 t-md font-medium truncate max-w-[60%]">
            {windowTitle}
          </div>
          <WindowControls
            onMinimize={() => minimizeWindow(windowId)}
            onMaximize={() => maximizeWindow(windowId)}
            onClose={() => closeWindow(windowId)}
          />
        </div>
      </div>

      <TabBar
        tabs={state.tabs}
        activeTabId={state.activeTabId}
        onSelect={(tabId) => dispatch({ type: "SWITCH_TAB", tabId })}
        onClose={(tabId) =>
          dispatch({
            type: "CLOSE_TAB",
            tabId,
            fallbackUrl: START_URL,
            fallbackTitle: titleForUrl(START_URL),
          })
        }
        onNew={() =>
          dispatch({
            type: "NEW_TAB",
            url: START_URL,
            title: titleForUrl(START_URL),
          })
        }
      />

      <Toolbar
        url={tab.url}
        canGoBack={tab.back.length > 0}
        canGoForward={tab.forward.length > 0}
        isBookmarked={bookmarks.includes(tab.url)}
        onBack={() => dispatch({ type: "BACK", tabId: tab.id, title: titleForUrl })}
        onForward={() => dispatch({ type: "FORWARD", tabId: tab.id, title: titleForUrl })}
        onRefresh={() => dispatch({ type: "REFRESH", tabId: tab.id })}
        onNavigate={navigate}
        onToggleBookmark={() =>
          setBookmarks((current) =>
            current.includes(tab.url)
              ? current.filter((entry) => entry !== tab.url)
              : [...current, tab.url]
          )
        }
      />

      <div
        className="browser-content flex-1 bg-transparent overflow-auto custom-scrollbar"
        style={{ overscrollBehavior: "contain" }}
      >
        <PageComponent
          key={`${tab.id}:${tab.url}:${tab.reloadNonce}`}
          navigate={navigate}
          reloadNonce={tab.reloadNonce}
        />
      </div>
    </div>
  );
}
