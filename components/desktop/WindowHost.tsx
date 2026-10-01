"use client";

import Terminal from "@/components/Terminal";
import Firefox from "@/components/Firefox";
import { useWindowManager } from "@/lib/wm";

/**
 * Renders one component per open window. Adding an app means adding a registry
 * entry and one case here; nothing else on the desktop needs to change.
 */
export default function WindowHost() {
  const { windows } = useWindowManager();

  return (
    <>
      {windows.map((win) => {
        switch (win.appId) {
          case "terminal":
            return <Terminal key={win.id} windowId={win.id} />;
          case "firefox":
            return <Firefox key={win.id} windowId={win.id} />;
          default:
            return null;
        }
      })}
    </>
  );
}
