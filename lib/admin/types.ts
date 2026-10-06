import type { DocumentKey, PortfolioDocuments } from "@/content";
import type { ValidationIssue } from "@/content/schema";

export type SaveResult<T = unknown> =
  | { ok: true; updatedAt: string; value: T }
  | { ok: false; error: string; issues?: ValidationIssue[] };

export interface AuthFormState {
  error?: string;
}

export interface DocumentMeta {
  updatedAt: string | null;
  /** False when the row does not exist yet and the static default is shown. */
  stored: boolean;
  /** True when the stored row failed validation and the default is shown instead. */
  invalid: boolean;
}

export interface AdminDocumentsPayload {
  configured: boolean;
  source: "supabase" | "static";
  documents: PortfolioDocuments;
  meta: Record<DocumentKey, DocumentMeta>;
  lastUpdated: string | null;
  /** Set when the database could not be read; editors must not save over it. */
  error?: string;
}

/** Set by a successful sign-in; tells the dashboard to play its access sequence once. */
export const ACCESS_COOKIE = "cc-access";

/** Real checks shown by the post-sign-in access sequence. */
export interface AccessReport {
  email: string;
  /** Supabase project host, e.g. abc.supabase.co. */
  host: string | null;
  /** Whether the database answered at all. */
  database: "ok" | "error";
  /** is_admin(): Row Level Security will accept this user's writes. */
  adminRole: boolean;
  /** Stored content documents, or null when they could not be counted. */
  documents: number | null;
  totalDocuments: number;
  modules: number;
}
