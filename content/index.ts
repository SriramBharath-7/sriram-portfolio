/**
 * Static portfolio content: the defaults that seed the database and the
 * fallback used when Supabase is not configured.
 *
 * Runtime consumers (terminal, browser, virtual filesystem) should read the
 * live content from `usePortfolioContent()` / `getPortfolioContent()` rather
 * than these constants, so admin edits reach every view.
 */
import { DEFAULT_DOCUMENTS, assembleContent } from "./documents";
import type { PortfolioContent } from "./types";

export const content: PortfolioContent = assembleContent(DEFAULT_DOCUMENTS);

export const {
  profile,
  about,
  education,
  skills,
  certifications,
  ctf,
  tools,
  blog,
  projects,
  bookmarks,
  apps,
  commands,
  settings,
} = content;

export {
  DEFAULT_DOCUMENTS,
  DOCUMENT_KEYS,
  assembleContent,
  isDocumentKey,
  withDefaults,
} from "./documents";
export type { DocumentKey, PortfolioDocuments, ProjectsDocument } from "./documents";
export * from "./types";
