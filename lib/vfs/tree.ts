/**
 * Builds the virtual filesystem tree from the portfolio content layer.
 * The tree is derived, never hand-maintained, so editing content (in the
 * admin dashboard or the static defaults) updates the filesystem automatically.
 */
import type { PortfolioContent } from "@/content/types";
import { HOME, join } from "./paths";
import { buildMetadata } from "./metadata";
import type { VfsDirectory, VfsFile, VfsNode } from "./types";
import {
  serializeAbout,
  serializeCertification,
  serializeContact,
  serializeCtf,
  serializeEducation,
  serializeProjectsReadme,
  serializeSkills,
  serializeTools,
} from "./serialize";

function file(
  parentPath: string,
  name: string,
  body: string,
  appUrl?: string
): VfsFile {
  const path = join(parentPath, name);
  return {
    type: "file",
    name,
    path,
    content: body,
    appUrl,
    meta: buildMetadata(path, "file", body.length, 1),
  };
}

function directory(
  parentPath: string,
  name: string,
  build: (path: string) => VfsNode[]
): VfsDirectory {
  const path = join(parentPath, name);
  const children = build(path);
  const subdirectories = children.filter((child) => child.type === "directory");
  return {
    type: "directory",
    name,
    path,
    children,
    // Unix convention: a directory's link count is 2 plus one per subdirectory.
    meta: buildMetadata(path, "directory", 0, 2 + subdirectories.length),
  };
}

function buildHome(content: PortfolioContent): VfsDirectory {
  const { profile, about, education, skills, certifications, ctf, tools, projects } = content;

  const children: VfsNode[] = [
    file(HOME, "about.txt", serializeAbout(about, profile)),
    file(HOME, "education.txt", serializeEducation(education)),
    file(HOME, "skills.txt", serializeSkills(skills)),
    file(HOME, "contact.txt", serializeContact(profile)),
    file(HOME, "tools.txt", serializeTools(tools)),
    directory(HOME, "certifications", (dir) =>
      certifications.map((cert) =>
        file(
          dir,
          `${cert.id}.txt`,
          serializeCertification(cert),
          "home://certifications"
        )
      )
    ),
    directory(HOME, "projects", (dir) => [
      file(
        dir,
        "README.txt",
        serializeProjectsReadme(projects.githubUsername),
        `https://github.com/${projects.githubUsername}`
      ),
    ]),
    directory(HOME, "writeups", (dir) => [
      file(dir, "ctf.txt", serializeCtf(ctf)),
    ]),
  ];

  const subdirectories = children.filter((child) => child.type === "directory");

  return {
    type: "directory",
    name: "sriram",
    path: HOME,
    children,
    meta: buildMetadata(HOME, "directory", 0, 2 + subdirectories.length),
  };
}

/** Builds the full tree from "/" down for one content snapshot. */
export function buildTree(content: PortfolioContent): VfsDirectory {
  const home = buildHome(content);
  const homeDir: VfsDirectory = {
    type: "directory",
    name: "home",
    path: "/home",
    children: [home],
    meta: buildMetadata("/home", "directory", 0, 3),
  };
  return {
    type: "directory",
    name: "/",
    path: "/",
    children: [homeDir],
    meta: buildMetadata("/", "directory", 0, 3),
  };
}
