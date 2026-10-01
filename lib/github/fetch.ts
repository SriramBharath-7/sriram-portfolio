import type { ProjectsConfig } from "@/content/types";
import type { Repo } from "./types";

const PER_PAGE = 100;
const MAX_PAGES = 5;

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
}

/** Failure with a message that is safe to show visitors. */
export class GithubFetchError extends Error {}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Server-side only. The token is never sent to the client.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  return headers;
}

function normalize(repo: GitHubRepo): Repo {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    homepage: repo.homepage && repo.homepage.trim() !== "" ? repo.homepage : null,
    language: repo.language,
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    topics: repo.topics ?? [],
    updatedAt: repo.updated_at,
    fork: repo.fork,
    archived: repo.archived,
  };
}

/**
 * Every public repository of a user, unfiltered. GitHub stays the source of
 * truth; responses are cached for `revalidate` seconds to respect rate limits.
 */
export async function fetchGithubRepos(username: string, revalidate = 600): Promise<Repo[]> {
  const collected: GitHubRepo[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    let response: Response;
    try {
      response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=${PER_PAGE}&page=${page}`,
        { headers: buildHeaders(), next: { revalidate } }
      );
    } catch {
      throw new GithubFetchError("Could not reach GitHub. Check your connection and retry.");
    }

    if (!response.ok) {
      throw new GithubFetchError(
        response.status === 403
          ? "GitHub rate limit reached. Try again shortly."
          : `GitHub responded with ${response.status}`
      );
    }

    const batch: GitHubRepo[] = await response.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    collected.push(...batch);
    if (batch.length < PER_PAGE) break;
  }

  return collected.map(normalize);
}

/**
 * Applies the portfolio's metadata to the live list: drops forks (when
 * configured), archived and hidden repositories, swaps in description / demo
 * overrides, and lists featured repositories first in their configured order,
 * then everything else by stars and recency.
 */
export function applyRepoOverrides(
  repos: Repo[],
  config: Pick<ProjectsConfig, "excludeForks" | "repos">
): Repo[] {
  const overrides = new Map(
    config.repos.map((override, index) => [override.name.toLowerCase(), { ...override, index }])
  );

  const visible = repos.flatMap((repo) => {
    const override = overrides.get(repo.name.toLowerCase());
    if ((config.excludeForks && repo.fork) || repo.archived || override?.hidden) return [];
    if (!override) return [repo];
    return [
      {
        ...repo,
        description: override.description || repo.description,
        homepage: override.homepage || repo.homepage,
        ...(override.featured ? { featured: true } : {}),
      },
    ];
  });

  const featuredRank = (repo: Repo) =>
    repo.featured ? overrides.get(repo.name.toLowerCase())!.index : Infinity;

  return visible.sort(
    (a, b) =>
      (a.featured === b.featured ? 0 : a.featured ? -1 : 1) ||
      (a.featured ? featuredRank(a) - featuredRank(b) : 0) ||
      b.stars - a.stars ||
      Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
  );
}
