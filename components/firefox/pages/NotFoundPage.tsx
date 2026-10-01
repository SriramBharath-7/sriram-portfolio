"use client";

import { ROUTE_META, START_URL } from "@/lib/browser/route-meta";
import type { PageProps } from "@/lib/browser/types";

/** Browser-style error page for unknown internal URLs. */
export default function NotFoundPage({ navigate }: PageProps) {
  return (
    <div className="p-10 flex flex-col items-center text-center">
      <div className="text-5xl mb-4">🦊</div>
      <h2 className="text-xl font-semibold text-gray-100 mb-2">
        Hmm. We&apos;re having trouble finding that site.
      </h2>
      <p className="text-gray-400 t-lg max-w-md mb-6">
        The address you entered is not a page inside this portfolio. Check the
        spelling, or pick one of the pages below.
      </p>

      <div className="flex flex-wrap gap-2 justify-center max-w-xl">
        {ROUTE_META.filter((route) => route.url !== START_URL).map((route) => (
          <button
            key={route.url}
            onClick={() => navigate(route.url)}
            className="t-lg px-3 py-1.5 rounded-md bg-gray-800/60 border border-purple-500/25 text-purple-200 hover:border-purple-500/50 hover:bg-gray-800/90 transition-colors"
          >
            {route.icon} {route.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigate(START_URL)}
        className="mt-6 px-4 py-2 bg-purple-600/60 hover:bg-purple-600/80 text-white rounded-md t-lg"
      >
        Back to start page
      </button>
    </div>
  );
}
