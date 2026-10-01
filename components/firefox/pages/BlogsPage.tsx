"use client";

import { useEffect, useState } from "react";
import type { PageProps } from "@/lib/browser/types";
import PageShell, { Card } from "./PageShell";

interface BlogPost {
  id: string;
  title: string;
  url: string;
  coverImage?: string | null;
  publishedAt?: string | null;
  tags?: string[];
  source: "devto" | "medium";
}

export default function BlogsPage({ reloadNonce }: PageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/api/blogs", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { posts: [] }))
      .then((data) => {
        if (cancelled) return;
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load blogs");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadNonce]);

  return (
    <PageShell
      icon="📝"
      title="Latest Blogs"
      subtitle="From DEV.to and Medium"
      accent="pink"
    >
      {error && (
        <div className="bg-red-900/30 text-red-300 p-3 rounded border border-red-500/30 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="cq-grid cq-grid-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden border border-pink-500/15 bg-gray-900/40 animate-pulse"
            >
              <div className="h-40 bg-gray-800/60" />
              <div className="p-4">
                <div className="h-4 w-4/5 bg-gray-700/50 rounded mb-2" />
                <div className="h-3 w-1/3 bg-gray-700/40 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="text-center py-10 border-pink-500/20">
          <div className="text-3xl mb-3">✍️</div>
          <div className="text-gray-200">No posts published yet</div>
        </Card>
      ) : (
        <div className="cq-grid cq-grid-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden border border-pink-500/20 hover:border-pink-500/50 bg-gray-900/40 shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="h-40 bg-gradient-to-br from-gray-800/60 to-gray-900/60 relative overflow-hidden">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-pink-300/60 text-4xl">
                    ✍️
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 left-2 t-sm px-2 py-0.5 rounded-full bg-pink-600/30 text-pink-200 border border-pink-500/30">
                  {post.source === "devto" ? "DEV.to" : "Medium"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="t-xl font-semibold text-white line-clamp-2 group-hover:text-pink-300 transition-colors">
                  {post.title}
                </h3>
                {post.publishedAt && (
                  <div className="mt-2 t-sm text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="t-xs px-2 py-0.5 rounded-full bg-pink-900/30 text-pink-200 border border-pink-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </PageShell>
  );
}
