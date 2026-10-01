import "server-only";
import { GithubFetchError, fetchGithubRepos } from "@/lib/github/fetch";
import type { Repo } from "@/lib/github/types";

/**
 * Every repository (including forks, archived and hidden ones) so the admin
 * can decide what the portfolio shows. Shares the public route's 10 minute
 * cache to stay within GitHub's rate limit.
 */
export async function listRepositoriesForAdmin(
  username: string
): Promise<{ repos: Repo[] } | { error: string }> {
  try {
    return { repos: await fetchGithubRepos(username) };
  } catch (error) {
    return {
      error: error instanceof GithubFetchError ? error.message : "Could not load repositories.",
    };
  }
}
