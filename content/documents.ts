/**
 * Stored document model.
 *
 * Each key is one editable document (one row in Supabase, one admin page or
 * card). The static modules in this folder are the defaults: they seed the
 * database and are served whenever Supabase is not configured, so the site is
 * never blank. `assembleContent` turns documents into the `PortfolioContent`
 * every consumer reads, deriving anything that would otherwise be duplicated.
 */
import { profile } from "./profile";
import { about } from "./about";
import { education } from "./education";
import { skills } from "./skills";
import { certifications } from "./certifications";
import { ctf } from "./ctf";
import { tools } from "./tools";
import { blog } from "./blog";
import { projects } from "./projects";
import { apps } from "./apps";
import { commands } from "./commands";
import { settings } from "./settings";
import type {
  About,
  AppConfig,
  BlogConfig,
  Bookmark,
  Certification,
  CtfContent,
  CustomCommand,
  Education,
  PortfolioContent,
  Profile,
  ProjectsConfig,
  Skills,
  SiteSettings,
  ToolsContent,
} from "./types";

/** `githubUsername` is derived from the profile, so it is not stored here. */
export type ProjectsDocument = Omit<ProjectsConfig, "githubUsername">;

export interface PortfolioDocuments {
  profile: Profile;
  about: About;
  education: Education;
  skills: Skills;
  certifications: Certification[];
  ctf: CtfContent;
  tools: ToolsContent;
  blog: BlogConfig;
  projects: ProjectsDocument;
  apps: AppConfig[];
  commands: CustomCommand[];
  settings: SiteSettings;
}

export type DocumentKey = keyof PortfolioDocuments;

export const DOCUMENT_KEYS: DocumentKey[] = [
  "profile",
  "about",
  "education",
  "skills",
  "certifications",
  "ctf",
  "tools",
  "blog",
  "projects",
  "apps",
  "commands",
  "settings",
];

export function isDocumentKey(value: unknown): value is DocumentKey {
  return typeof value === "string" && (DOCUMENT_KEYS as string[]).includes(value);
}

const { githubUsername: _derived, ...projectsDocument } = projects;

export const DEFAULT_DOCUMENTS: PortfolioDocuments = {
  profile,
  about,
  education,
  skills,
  certifications,
  ctf,
  tools,
  blog,
  projects: projectsDocument,
  apps,
  commands,
  settings,
};

function bookmarksFrom(socials: Profile["socials"]): Bookmark[] {
  return socials
    .filter((social) => social.enabled !== false && /^https?:\/\//i.test(social.url))
    .map((social) => ({ id: social.id, label: social.label, url: social.url }));
}

/** Built-in window apps can be edited but never removed; restore any that are missing. */
function withBuiltinApps(list: AppConfig[]): AppConfig[] {
  const builtins = DEFAULT_DOCUMENTS.apps.filter(
    (app) => app.kind === "terminal" || app.kind === "browser"
  );
  const missing = builtins.filter((builtin) => !list.some((app) => app.id === builtin.id));
  return [...list, ...missing];
}

/** Builds the runtime content every consumer reads from a full document set. */
export function assembleContent(documents: PortfolioDocuments): PortfolioContent {
  const visibleSocials = documents.profile.socials.filter((social) => social.enabled !== false);

  return {
    profile: { ...documents.profile, socials: visibleSocials },
    about: documents.about,
    education: documents.education,
    skills: documents.skills,
    certifications: documents.certifications,
    ctf: documents.ctf,
    tools: documents.tools,
    blog: documents.blog,
    projects: { ...documents.projects, githubUsername: documents.profile.githubUsername },
    bookmarks: bookmarksFrom(visibleSocials),
    apps: withBuiltinApps(documents.apps),
    commands: documents.commands,
    settings: documents.settings,
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Lays stored data over the defaults so fields added to a document after it
 * was saved pick up their default instead of invalidating the whole row.
 * Arrays are taken as stored; only plain objects are merged.
 */
export function withDefaults(defaults: unknown, stored: unknown): unknown {
  if (!isPlainObject(defaults) || !isPlainObject(stored)) return stored;
  const merged: Record<string, unknown> = { ...defaults };
  for (const [key, value] of Object.entries(stored)) {
    merged[key] = key in defaults ? withDefaults(defaults[key], value) : value;
  }
  return merged;
}
