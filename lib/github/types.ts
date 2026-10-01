/** Normalized repository shape returned by /api/github. */
export interface Repo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  /** Raw GitHub flags; the public route already filters on them. */
  fork?: boolean;
  archived?: boolean;
  /** Pinned in the admin dashboard; listed first. */
  featured?: boolean;
}

export interface ReposResponse {
  username: string;
  repos: Repo[];
}

export interface ReposError {
  error: string;
}
