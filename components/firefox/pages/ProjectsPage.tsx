"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PageProps } from "@/lib/browser/types";
import type { Repo, ReposResponse } from "@/lib/github/types";
import PageShell, { Card } from "./PageShell";

type Status = "loading" | "ready" | "error";

const PAGE_SIZE = 8;

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div className="group relative rounded-lg p-5 bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-purple-500/20 hover:border-purple-500/45 hover:shadow-[0_8px_24px_rgba(124,58,237,0.16)] transition-all hover:-translate-y-0.5 flex flex-col min-w-0">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-purple-200 font-semibold text-base break-words min-w-0">
          {repo.name}
          {repo.featured && (
            <span className="ml-2 align-middle t-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30 font-medium">
              Featured
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2 t-sm text-gray-400 flex-shrink-0">
          <span title="Stars">★ {repo.stars}</span>
          {repo.forks > 0 && <span title="Forks">⑂ {repo.forks}</span>}
        </div>
      </div>

      <p className="text-gray-400 t-lg flex-1 line-clamp-3">
        {repo.description ?? "No description provided."}
      </p>

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="t-xs px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-200 border border-purple-500/20"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/50 t-sm">
        <div className="flex items-center gap-2 text-gray-500">
          {repo.language && <span className="text-gray-300">{repo.language}</span>}
          <span>· {formatDate(repo.updatedAt)}</span>
        </div>
        <div className="flex gap-3">
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-emerald-200"
            >
              Demo
            </a>
          )}
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200"
          >
            Code ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage({ reloadNonce }: PageProps) {
  const [status, setStatus] = useState<Status>("loading");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError("");

    fetch("/api/github")
      .then(async (response) => {
        const body = await response.json();
        if (cancelled) return;
        if (!response.ok) {
          setError(body?.error ?? "Failed to load repositories.");
          setStatus("error");
          return;
        }
        setRepos((body as ReposResponse).repos ?? []);
        setPage(1);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setError("Could not reach the projects service.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [reloadNonce, attempt]);

  const totalPages = Math.max(1, Math.ceil(repos.length / PAGE_SIZE));
  const visible = useMemo(
    () => repos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [repos, page]
  );

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return (
    <PageShell
      icon="📦"
      title="Projects"
      subtitle="Live repositories from GitHub"
      accent="purple"
    >
      {status === "loading" && (
        <div className="cq-grid cq-grid-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg p-4 bg-gray-800/40 border border-gray-700/40 animate-pulse h-40"
            >
              <div className="h-4 w-2/3 bg-gray-700/60 rounded mb-3" />
              <div className="h-3 w-full bg-gray-700/40 rounded mb-2" />
              <div className="h-3 w-4/5 bg-gray-700/40 rounded" />
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <Card className="text-center py-10">
          <div className="text-3xl mb-3">⚠️</div>
          <div className="text-gray-200 mb-1">Could not load projects</div>
          <div className="text-gray-400 t-lg mb-4">{error}</div>
          <button
            onClick={retry}
            className="press px-4 py-2 bg-purple-600/70 hover:bg-purple-600/90 text-white rounded-md t-lg transition-colors"
          >
            Retry
          </button>
        </Card>
      )}

      {status === "ready" && repos.length === 0 && (
        <Card className="text-center py-10">
          <div className="text-3xl mb-3">📭</div>
          <div className="text-gray-200 mb-1">No public repositories yet</div>
          <div className="text-gray-400 t-lg">Check back soon.</div>
        </Card>
      )}

      {status === "ready" && repos.length > 0 && (
        <>
          <div className="cq-grid cq-grid-4">
            {visible.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 t-lg">
            <div className="text-gray-500">
              {repos.length} repositor{repos.length === 1 ? "y" : "ies"}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={page === 1}
                  className="chrome-button press px-3.5 py-1.5 rounded-md border border-gray-700/60 text-gray-300 disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="text-gray-400">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={page === totalPages}
                  className="chrome-button press px-3.5 py-1.5 rounded-md border border-gray-700/60 text-gray-300 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </PageShell>
  );
}
