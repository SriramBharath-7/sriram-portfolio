"use client";

import { useMemo } from "react";
import ArchLinuxOS from "@/components/ArchLinuxOS";
import WindowHost from "@/components/desktop/WindowHost";
import { resolveApps } from "@/lib/apps";
import { PortfolioContentProvider } from "@/lib/content/provider";
import { WindowManagerProvider } from "@/lib/wm";
import type { PortfolioContent } from "@/content/types";

/** Client root of the public desktop. Receives the runtime content from the server. */
export default function DesktopRoot({ content }: { content: PortfolioContent }) {
  const apps = useMemo(() => resolveApps(content.apps), [content.apps]);

  return (
    <PortfolioContentProvider content={content}>
      <WindowManagerProvider apps={apps}>
        <main className="min-h-screen p-4 font-mono text-green-400 flex items-center justify-center relative overflow-hidden">
          <ArchLinuxOS />
          <WindowHost />
        </main>
      </WindowManagerProvider>
    </PortfolioContentProvider>
  );
}
