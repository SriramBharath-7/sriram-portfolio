/**
 * Portfolio content types.
 *
 * These are the single source of truth for editable portfolio data. They are
 * intentionally shaped like database records: every collection item carries a
 * stable string `id`, dates are ISO-8601 strings, and presentation concerns are
 * limited to optional `highlightClass` hints that map to existing CSS classes.
 *
 * The admin dashboard stores these exact shapes as documents (see
 * `content/documents.ts`), so the terminal, the virtual filesystem and the
 * browser all read the same data whether it comes from Supabase or from the
 * static defaults in this folder.
 */

/** ISO-8601 date, e.g. "2025-04-22". Empty string means "not applicable". */
export type ISODate = string;

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  /** Display handle, e.g. "@srirambharath7". Falls back to the URL host. */
  handle?: string;
  /** Hidden links stay stored but are not shown anywhere. Defaults to true. */
  enabled?: boolean;
}

export interface Profile {
  name: string;
  /** Short role line, e.g. "College Student (CSE)". */
  role: string;
  /** One-line headline used across the terminal and browser start page. */
  tagline: string;
  /** Shown by the `whoami` command. */
  status: string;
  email: string;
  /** Drives the live Projects page, neofetch and the projects README. */
  githubUsername: string;
  socials: SocialLink[];
}

export interface AboutBullet {
  label: string;
  description?: string;
  /** Existing terminal CSS class, e.g. "lang-python" or "skill-highlight". */
  highlightClass?: string;
}

export interface AboutSection {
  id: string;
  title: string;
  /** Paragraph body. Mutually exclusive with `bullets` in practice. */
  body?: string;
  bullets?: AboutBullet[];
}

export interface About {
  headline: string;
  sections: AboutSection[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution?: string;
  status: string;
  coursework: string[];
  notes?: string;
}

export interface EducationGoal {
  id: string;
  title: string;
  description?: string;
}

export interface Education {
  headline: string;
  entries: EducationEntry[];
  goals: EducationGoal[];
}

export interface SkillItem {
  id: string;
  name: string;
  description?: string;
  highlightClass?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: SkillItem[];
}

export interface Skills {
  headline: string;
  intro: string;
  groups: SkillGroup[];
  /** Free-form interest line shown after the groups. */
  interests: string[];
}

export interface Certification {
  id: string;
  title: string;
  provider?: string;
  status: string;
  issued?: ISODate;
  completed?: ISODate;
  expires?: ISODate;
  description: string;
  /** Public path or absolute URL (e.g. Supabase Storage) of the certificate image. */
  image: string;
  credentialUrl?: string;
}

export interface CtfContent {
  headline: string;
  intro: string;
  focusAreas: string[];
  closing?: string;
}

export interface ToolsContent {
  headline: string;
  intro: string;
  items: string[];
  closing?: string;
}

export interface BlogConfig {
  devtoUsername: string;
  mediumHandle: string;
}

/**
 * Portfolio-specific metadata layered over a live GitHub repository. GitHub
 * stays the source of truth for the repository itself; this only decides how
 * the portfolio presents it.
 */
export interface RepoOverride {
  /** Repository name exactly as GitHub reports it. */
  name: string;
  hidden?: boolean;
  /** Featured repositories are listed first, in the order they appear here. */
  featured?: boolean;
  /** Replaces a missing or weak GitHub description. */
  description?: string;
  /** Replaces the GitHub "homepage" field as the demo link. */
  homepage?: string;
}

export interface ProjectsConfig {
  /** Always mirrors `profile.githubUsername`; derived, never stored separately. */
  githubUsername: string;
  excludeForks: boolean;
  repos: RepoOverride[];
}

export interface Bookmark {
  id: string;
  label: string;
  url: string;
}

/**
 * How a desktop application behaves. "terminal" and "browser" are built-in
 * React apps; "link" and "route" are shortcuts that need no new code.
 */
export type AppKind = "terminal" | "browser" | "link" | "route";

/** Admin-editable metadata for a desktop application or shortcut. */
export interface AppConfig {
  id: string;
  kind: AppKind;
  name: string;
  /** Public path or absolute URL of the icon. */
  icon: string;
  enabled: boolean;
  showOnDesktop: boolean;
  /** Only meaningful for window apps; shortcuts never open a window. */
  showInTaskbar: boolean;
  /**
   * browser: start page (home://...); route: internal page Firefox opens;
   * link: external https:// URL opened in a new tab.
   */
  url?: string;
}

/** Portfolio sections a custom command may print. */
export type ContentSection =
  | "about"
  | "skills"
  | "education"
  | "certifications"
  | "ctf"
  | "tools"
  | "contact"
  | "whoami";

/**
 * What a custom terminal command does. Purely declarative: nothing stored in
 * the database is ever executed as code.
 */
export type CommandResponse =
  | { type: "text"; text: string }
  | { type: "content"; section: ContentSection }
  | { type: "route"; url: string }
  | { type: "app"; appId: string }
  | { type: "url"; url: string };

export interface CustomCommand {
  id: string;
  /** Lowercase command name, e.g. "resume". */
  name: string;
  aliases: string[];
  /** One-line summary shown by `help`. */
  description: string;
  /** Longer text printed by `<name> --help`. */
  help?: string;
  enabled: boolean;
  response: CommandResponse;
}

export interface WelcomeSettings {
  enabled: boolean;
  title: string;
  heading: string;
  /** Supports `code` and **highlight** inline markers. */
  message: string;
  callToAction: string;
  autoCloseSeconds: number;
}

export interface SiteSettings {
  welcome: WelcomeSettings;
  boot: {
    /** Rotating status lines on the loading screen. */
    messages: string[];
  };
  terminal: {
    /** Lines printed when a terminal window opens. */
    motd: string[];
  };
  githubWidget: {
    enabled: boolean;
    url: string;
    label: string;
    caption: string;
  };
}

export interface PortfolioContent {
  profile: Profile;
  about: About;
  education: Education;
  skills: Skills;
  certifications: Certification[];
  ctf: CtfContent;
  tools: ToolsContent;
  blog: BlogConfig;
  projects: ProjectsConfig;
  /** Derived from enabled http(s) social links. */
  bookmarks: Bookmark[];
  apps: AppConfig[];
  commands: CustomCommand[];
  settings: SiteSettings;
}
