import type { ProjectsConfig } from "./types";
import { profile } from "./profile";

export const projects: ProjectsConfig = {
  githubUsername: profile.githubUsername,
  excludeForks: true,
  repos: [{ name: "OS_PORTFOLIO", hidden: true }],
};
