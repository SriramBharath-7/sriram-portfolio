/**
 * Validation schemas for every stored portfolio document.
 *
 * Used in two places: the admin save action validates input before writing,
 * and the repository validates what it reads back so a malformed row falls
 * back to the static default instead of breaking the public desktop.
 */
import { z } from "zod";
import { INTERNAL_URLS } from "@/lib/browser/route-meta";
import type {
  About,
  AppConfig,
  BlogConfig,
  Certification,
  CtfContent,
  CustomCommand,
  Education,
  Profile,
  Skills,
  SiteSettings,
  ToolsContent,
} from "./types";
import {
  DEFAULT_DOCUMENTS,
  DOCUMENT_KEYS,
  withDefaults,
  type DocumentKey,
  type PortfolioDocuments,
  type ProjectsDocument,
} from "./documents";

/** CSS classes the terminal and browser already style (see globals.css). */
export const HIGHLIGHT_CLASSES = [
  "skill-highlight",
  "lang-python",
  "lang-bash",
  "lang-ps",
  "lang-java",
  "lang-html",
  "lang-markdown",
] as const;

export const CONTENT_SECTIONS = [
  "about",
  "skills",
  "education",
  "certifications",
  "ctf",
  "tools",
  "contact",
  "whoami",
] as const;

const ID_PATTERN = /^[a-z0-9][a-z0-9_-]*$/;
const COMMAND_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;

function isUrl(value: string, protocols: string[]): boolean {
  try {
    return protocols.includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const required = (max: number, label: string) =>
  z.string().trim().min(1, `${label} is required`).max(max, `${label} is too long`);

const optionalText = (max: number) => z.string().trim().max(max).optional();

const id = z
  .string()
  .trim()
  .min(1, "ID is required")
  .max(64, "ID is too long")
  .regex(ID_PATTERN, "Use lowercase letters, numbers, - or _");

const httpUrl = z
  .string()
  .trim()
  .max(1000)
  .refine((value) => isUrl(value, ["http:", "https:"]), "Must be an http(s) URL");

/** Optional URL where an empty string means "none". */
const optionalHttpUrl = z.union([z.literal(""), httpUrl]).optional();

const isoDate = z
  .union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")])
  .optional();

/** Site-relative path ("/assets/...") or absolute https URL. */
const assetPath = z
  .string()
  .trim()
  .min(1, "Required")
  .max(1000)
  .refine(
    (value) => (value.startsWith("/") && !value.startsWith("//")) || isUrl(value, ["https:"]),
    "Use a /public path or an https URL"
  );

const internalRoute = z
  .string()
  .trim()
  .refine((value) => INTERNAL_URLS.includes(value), "Pick one of the internal pages");

const highlightClass = z.enum(HIGHLIGHT_CLASSES).optional();

/** Adds an issue for every item whose `field` repeats an earlier one. */
function unique<T>(field: keyof T & string, label: string) {
  return (items: T[], ctx: z.RefinementCtx) => {
    const seen = new Set<unknown>();
    items.forEach((item, index) => {
      const value = item[field];
      if (seen.has(value)) {
        ctx.addIssue({ code: "custom", path: [index, field], message: `Duplicate ${label}` });
      }
      seen.add(value);
    });
  };
}

const socialLink = z.object({
  id,
  label: required(60, "Label"),
  url: z
    .string()
    .trim()
    .max(1000)
    .refine((value) => isUrl(value, ["http:", "https:", "mailto:"]), "Use an http(s) or mailto: URL"),
  handle: optionalText(160),
  enabled: z.boolean().optional(),
});

export const profileSchema = z.object({
  name: required(80, "Name"),
  role: required(120, "Role"),
  tagline: required(240, "Tagline"),
  status: required(60, "Status"),
  email: z.email("Enter a valid email").max(254),
  githubUsername: z
    .string()
    .trim()
    .min(1, "GitHub username is required")
    .max(39)
    .regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/, "Not a valid GitHub username"),
  socials: z.array(socialLink).max(20).superRefine(unique("id", "ID")),
}) satisfies z.ZodType<Profile>;

const aboutBullet = z.object({
  label: required(160, "Label"),
  description: optionalText(400),
  highlightClass,
});

export const aboutSchema = z.object({
  headline: required(160, "Headline"),
  sections: z
    .array(
      z.object({
        id,
        title: required(80, "Title"),
        body: optionalText(4000),
        bullets: z.array(aboutBullet).max(50).optional(),
      })
    )
    .max(30)
    .superRefine(unique("id", "ID")),
}) satisfies z.ZodType<About>;

export const educationSchema = z.object({
  headline: required(160, "Headline"),
  entries: z
    .array(
      z.object({
        id,
        degree: required(160, "Degree"),
        institution: optionalText(160),
        status: required(60, "Status"),
        coursework: z.array(required(120, "Course")).max(50),
        notes: optionalText(1000),
      })
    )
    .max(30)
    .superRefine(unique("id", "ID")),
  goals: z
    .array(
      z.object({
        id,
        title: required(160, "Goal"),
        description: optionalText(400),
      })
    )
    .max(30)
    .superRefine(unique("id", "ID")),
}) satisfies z.ZodType<Education>;

export const skillsSchema = z.object({
  headline: required(160, "Headline"),
  intro: z.string().trim().max(240),
  groups: z
    .array(
      z.object({
        id,
        title: required(80, "Group title"),
        items: z
          .array(
            z.object({
              id,
              name: required(80, "Skill name"),
              description: optionalText(400),
              highlightClass,
            })
          )
          .max(60)
          .superRefine(unique("id", "ID")),
      })
    )
    .max(20)
    .superRefine(unique("id", "ID")),
  interests: z.array(required(80, "Interest")).max(50),
}) satisfies z.ZodType<Skills>;

export const certificationSchema = z.object({
  id,
  title: required(160, "Title"),
  provider: optionalText(120),
  status: required(40, "Status"),
  issued: isoDate,
  completed: isoDate,
  expires: isoDate,
  description: required(1000, "Description"),
  image: assetPath,
  credentialUrl: optionalHttpUrl,
}) satisfies z.ZodType<Certification>;

export const certificationsSchema = z
  .array(certificationSchema)
  .max(100)
  .superRefine(unique("id", "ID"));

export const ctfSchema = z.object({
  headline: required(160, "Headline"),
  intro: z.string().trim().max(240),
  focusAreas: z.array(required(200, "Focus area")).max(50),
  closing: optionalText(600),
}) satisfies z.ZodType<CtfContent>;

export const toolsSchema = z.object({
  headline: required(160, "Headline"),
  intro: z.string().trim().max(240),
  items: z.array(required(200, "Item")).max(50),
  closing: optionalText(600),
}) satisfies z.ZodType<ToolsContent>;

export const blogSchema = z.object({
  devtoUsername: z.string().trim().max(60),
  mediumHandle: z.string().trim().max(60),
}) satisfies z.ZodType<BlogConfig>;

export const projectsSchema = z.object({
  excludeForks: z.boolean(),
  repos: z
    .array(
      z.object({
        name: required(100, "Repository name"),
        hidden: z.boolean().optional(),
        featured: z.boolean().optional(),
        description: optionalText(400),
        homepage: optionalHttpUrl,
      })
    )
    .max(300)
    .superRefine(unique("name", "repository")),
}) satisfies z.ZodType<ProjectsDocument>;

const appConfig = z
  .object({
    id,
    kind: z.enum(["terminal", "browser", "link", "route"]),
    name: required(40, "Name"),
    icon: assetPath,
    enabled: z.boolean(),
    showOnDesktop: z.boolean(),
    showInTaskbar: z.boolean(),
    url: z.string().trim().max(1000).optional(),
  })
  .superRefine((app, ctx) => {
    const issue = (message: string) => ctx.addIssue({ code: "custom", path: ["url"], message });
    if (app.kind === "link" && !(app.url && isUrl(app.url, ["https:", "http:"]))) {
      issue("Shortcut links need an http(s) URL");
    }
    if (app.kind === "route" && !(app.url && INTERNAL_URLS.includes(app.url))) {
      issue("Pick one of the internal pages");
    }
    if (app.kind === "browser" && app.url && !INTERNAL_URLS.includes(app.url)) {
      issue("The start page must be an internal page");
    }
  });

/** Built-in window apps: they must exist exactly once and keep their kind. */
export const BUILTIN_APPS: Record<string, AppConfig["kind"]> = {
  terminal: "terminal",
  firefox: "browser",
};

export const appsSchema = z
  .array(appConfig)
  .max(30)
  .superRefine(unique("id", "ID"))
  .superRefine((apps, ctx) => {
    for (const [builtinId, kind] of Object.entries(BUILTIN_APPS)) {
      const index = apps.findIndex((app) => app.id === builtinId);
      if (index === -1) {
        ctx.addIssue({ code: "custom", path: [], message: `The ${builtinId} app cannot be removed` });
      } else if (apps[index].kind !== kind) {
        ctx.addIssue({ code: "custom", path: [index, "kind"], message: "Built-in apps keep their type" });
      }
    }
    apps.forEach((app, index) => {
      const builtin = app.kind === "terminal" || app.kind === "browser";
      if (builtin && !(app.id in BUILTIN_APPS)) {
        ctx.addIssue({
          code: "custom",
          path: [index, "kind"],
          message: "New apps must be link or route shortcuts",
        });
      }
    });
  }) satisfies z.ZodType<AppConfig[]>;

const commandName = z
  .string()
  .trim()
  .toLowerCase()
  .regex(COMMAND_PATTERN, "Lowercase letters, numbers, - or _, starting with a letter");

const commandResponse = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), text: required(4000, "Text") }),
  z.object({ type: z.literal("content"), section: z.enum(CONTENT_SECTIONS) }),
  z.object({ type: z.literal("route"), url: internalRoute }),
  z.object({ type: z.literal("app"), appId: id }),
  z.object({
    type: z.literal("url"),
    url: z
      .string()
      .trim()
      .max(1000)
      .refine((value) => isUrl(value, ["http:", "https:", "mailto:"]), "Use an http(s) or mailto: URL"),
  }),
]);

export const commandsSchema = z
  .array(
    z.object({
      id,
      name: commandName,
      aliases: z.array(commandName).max(10),
      description: required(160, "Description"),
      help: optionalText(2000),
      enabled: z.boolean(),
      response: commandResponse,
    })
  )
  .max(100)
  .superRefine(unique("id", "ID"))
  .superRefine((commands, ctx) => {
    // Names and aliases share one namespace.
    const seen = new Map<string, number>();
    commands.forEach((command, index) => {
      [command.name, ...command.aliases].forEach((name, position) => {
        if (seen.has(name)) {
          ctx.addIssue({
            code: "custom",
            path: position === 0 ? [index, "name"] : [index, "aliases"],
            message: `"${name}" is already used by another command`,
          });
        }
        seen.set(name, index);
      });
    });
  }) satisfies z.ZodType<CustomCommand[]>;

export const settingsSchema = z.object({
  welcome: z.object({
    enabled: z.boolean(),
    title: required(80, "Title"),
    heading: required(80, "Heading"),
    message: required(400, "Message"),
    callToAction: z.string().trim().max(120),
    autoCloseSeconds: z.number().int().min(2).max(30),
  }),
  boot: z.object({
    messages: z.array(required(120, "Message")).min(1, "Add at least one message").max(10),
  }),
  terminal: z.object({
    motd: z.array(z.string().trim().max(200)).max(10),
  }),
  githubWidget: z.object({
    enabled: z.boolean(),
    url: httpUrl,
    label: required(60, "Label"),
    caption: z.string().trim().max(80),
  }),
}) satisfies z.ZodType<SiteSettings>;

export const documentSchemas: { [K in DocumentKey]: z.ZodType<PortfolioDocuments[K]> } = {
  profile: profileSchema,
  about: aboutSchema,
  education: educationSchema,
  skills: skillsSchema,
  certifications: certificationsSchema,
  ctf: ctfSchema,
  tools: toolsSchema,
  blog: blogSchema,
  projects: projectsSchema,
  apps: appsSchema,
  commands: commandsSchema,
  settings: settingsSchema,
};

export interface ValidationIssue {
  /** Dotted path inside the document, e.g. "sections.2.title". Empty for document-level issues. */
  path: string;
  message: string;
}

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; issues: ValidationIssue[] };

/** Validates and normalizes (trims, lowercases command names) one document. */
export function validateDocument<K extends DocumentKey>(
  key: K,
  value: unknown
): ValidationResult<PortfolioDocuments[K]> {
  const result = documentSchemas[key].safeParse(value);
  if (result.success) return { ok: true, value: result.data };
  return {
    ok: false,
    issues: result.error.issues.map((issue) => ({
      path: issue.path.map(String).join("."),
      message: issue.message,
    })),
  };
}

/**
 * Turns raw stored rows into a complete, valid document set. Missing keys use
 * the static default; a row that fails validation also falls back (and is
 * reported in `invalid`) so one bad row can never blank the public site.
 */
export function resolveStoredDocuments(stored: Partial<Record<DocumentKey, unknown>>): {
  documents: PortfolioDocuments;
  invalid: DocumentKey[];
} {
  const documents = { ...DEFAULT_DOCUMENTS };
  const invalid: DocumentKey[] = [];

  for (const key of DOCUMENT_KEYS) {
    if (stored[key] === undefined || stored[key] === null) continue;
    const result = validateDocument(key, withDefaults(DEFAULT_DOCUMENTS[key], stored[key]));
    if (result.ok) {
      (documents as Record<DocumentKey, unknown>)[key] = result.value;
    } else {
      invalid.push(key);
    }
  }

  return { documents, invalid };
}
