"use client";

import { createContext, useContext } from "react";
import type { PortfolioContent } from "@/content/types";

const PortfolioContentContext = createContext<PortfolioContent | null>(null);

/**
 * Makes the runtime portfolio content available to every desktop app. The
 * terminal, the virtual filesystem and the browser pages all read this one
 * object, so an admin edit shows up identically everywhere.
 */
export function PortfolioContentProvider({
  content,
  children,
}: {
  content: PortfolioContent;
  children: React.ReactNode;
}) {
  return (
    <PortfolioContentContext.Provider value={content}>{children}</PortfolioContentContext.Provider>
  );
}

export function usePortfolioContent(): PortfolioContent {
  const content = useContext(PortfolioContentContext);
  if (!content) {
    throw new Error("usePortfolioContent must be used inside a PortfolioContentProvider");
  }
  return content;
}
