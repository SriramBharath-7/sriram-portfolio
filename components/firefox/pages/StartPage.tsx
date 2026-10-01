"use client";

import { useState } from "react";
import { usePortfolioContent } from "@/lib/content/provider";
import { ROUTE_META } from "@/lib/browser/route-meta";
import type { PageProps } from "@/lib/browser/types";

function resolveQuery(query: string): string {
  const trimmed = query.trim();
  if (trimmed === "") return "";
  if (/^(https?:\/\/|home:\/\/|mailto:)/i.test(trimmed)) return trimmed;
  if (/^[\w-]+\.[a-z]{2,}/i.test(trimmed)) return `https://${trimmed}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`;
}

export default function StartPage({ navigate }: PageProps) {
  const { profile } = usePortfolioContent();
  const [query, setQuery] = useState("");
  const tiles = ROUTE_META.filter((route) => route.showOnStart);

  const go = () => {
    const target = resolveQuery(query);
    if (target) navigate(target);
  };

  return (
    <div className="p-6">
      <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-lg border border-purple-500/30 shadow-lg mb-6">
        <h1 className="text-2xl leading-tight font-bold text-white mb-2">
          Hi, I&apos;m {profile.name} 👋
        </h1>
        <p className="text-gray-300 t-lg mt-1">{profile.tagline}</p>
      </div>

      <div className="bg-gray-800/50 rounded-lg border border-purple-500/20 p-4 mb-6">
        <div className="t-lg text-gray-400 mb-2">Quick Search</div>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") go();
            }}
            placeholder="Type a URL, a home:// page, or search the web"
            className="address-bar flex-1 bg-gray-900/60 text-gray-200 px-3.5 h-10 rounded-md border border-gray-700/50 outline-none t-lg min-w-0"
          />
          <button
            onClick={go}
            className="press px-5 h-10 bg-purple-600/70 hover:bg-purple-600/90 text-white rounded-md t-lg transition-colors flex-shrink-0"
          >
            Go
          </button>
        </div>
      </div>

      <div className="t-sm uppercase tracking-wide text-gray-500 mb-3">
        Portfolio
      </div>
      <div className="cq-grid cq-grid-3 mb-6">
        {tiles.map((route) => (
          <button
            key={route.url}
            onClick={() => navigate(route.url)}
            className="press group relative overflow-hidden rounded-lg p-5 text-left bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(124,58,237,0.2)]"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.22),transparent_45%)]" />
            <div className="relative flex items-start gap-3">
              <span className="text-xl leading-none">{route.icon}</span>
              <div className="min-w-0">
                <div className="text-purple-300 font-semibold mb-0.5">{route.label}</div>
                <div className="text-gray-400 t-lg">{route.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="t-sm uppercase tracking-wide text-gray-500 mb-3">
        Elsewhere
      </div>
      <div className="cq-grid cq-grid-3">
        {profile.socials.map((social) => (
          <button
            key={social.id}
            onClick={() => navigate(social.url)}
            className="press group rounded-lg p-5 text-left bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-1"
          >
            <div className="text-purple-300 font-semibold mb-1">{social.label}</div>
            <div className="text-gray-400 t-lg break-all">
              {social.handle ?? social.url}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
