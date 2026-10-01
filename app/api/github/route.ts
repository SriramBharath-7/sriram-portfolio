import { NextResponse } from "next/server";
import { getPortfolioContent } from "@/lib/content/repository";
import { GithubFetchError, applyRepoOverrides, fetchGithubRepos } from "@/lib/github/fetch";

/** Cache the upstream response so visitors do not hammer the GitHub API. */
export const revalidate = 600;

export async function GET() {
  const { projects } = await getPortfolioContent();
  const username = projects.githubUsername;

  try {
    const repos = applyRepoOverrides(await fetchGithubRepos(username, revalidate), projects);
    return NextResponse.json({ username, repos });
  } catch (error) {
    const message =
      error instanceof GithubFetchError
        ? error.message
        : "Could not reach GitHub. Check your connection and retry.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
