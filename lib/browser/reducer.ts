import type { BrowserAction, BrowserState, Tab } from "./types";

let tabCounter = 0;

export function createTab(url: string, title: string): Tab {
  tabCounter += 1;
  return {
    id: `tab-${tabCounter}`,
    url,
    title,
    back: [],
    forward: [],
    reloadNonce: 0,
  };
}

export function createInitialState(url: string, title: string): BrowserState {
  const tab = createTab(url, title);
  return { tabs: [tab], activeTabId: tab.id };
}

function updateTab(
  state: BrowserState,
  tabId: string,
  update: (tab: Tab) => Tab
): BrowserState {
  return {
    ...state,
    tabs: state.tabs.map((tab) => (tab.id === tabId ? update(tab) : tab)),
  };
}

export function browserReducer(
  state: BrowserState,
  action: BrowserAction
): BrowserState {
  switch (action.type) {
    case "NAVIGATE":
      return updateTab(state, action.tabId, (tab) =>
        tab.url === action.url
          ? tab
          : {
              ...tab,
              back: [...tab.back, tab.url],
              forward: [],
              url: action.url,
              title: action.title,
            }
      );

    case "BACK":
      return updateTab(state, action.tabId, (tab) => {
        if (tab.back.length === 0) return tab;
        const previous = tab.back[tab.back.length - 1];
        return {
          ...tab,
          back: tab.back.slice(0, -1),
          forward: [tab.url, ...tab.forward],
          url: previous,
          title: action.title(previous),
        };
      });

    case "FORWARD":
      return updateTab(state, action.tabId, (tab) => {
        if (tab.forward.length === 0) return tab;
        const next = tab.forward[0];
        return {
          ...tab,
          back: [...tab.back, tab.url],
          forward: tab.forward.slice(1),
          url: next,
          title: action.title(next),
        };
      });

    case "REFRESH":
      return updateTab(state, action.tabId, (tab) => ({
        ...tab,
        reloadNonce: tab.reloadNonce + 1,
      }));

    case "NEW_TAB": {
      const tab = createTab(action.url, action.title);
      return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }

    case "CLOSE_TAB": {
      const index = state.tabs.findIndex((tab) => tab.id === action.tabId);
      if (index === -1) return state;

      const tabs = state.tabs.filter((tab) => tab.id !== action.tabId);

      // Closing the last tab leaves a fresh start tab, like a real browser
      // window that stays open.
      if (tabs.length === 0) {
        const fresh = createTab(action.fallbackUrl, action.fallbackTitle);
        return { tabs: [fresh], activeTabId: fresh.id };
      }

      if (state.activeTabId !== action.tabId) return { ...state, tabs };

      const neighbour = tabs[Math.min(index, tabs.length - 1)];
      return { tabs, activeTabId: neighbour.id };
    }

    case "SWITCH_TAB":
      return state.tabs.some((tab) => tab.id === action.tabId)
        ? { ...state, activeTabId: action.tabId }
        : state;

    default:
      return state;
  }
}

export function activeTab(state: BrowserState): Tab {
  return state.tabs.find((tab) => tab.id === state.activeTabId) ?? state.tabs[0];
}
