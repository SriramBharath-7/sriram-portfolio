import "server-only";
import { unstable_cache } from "next/cache";
import {
  DEFAULT_DOCUMENTS,
  assembleContent,
  isDocumentKey,
  type DocumentKey,
  type PortfolioDocuments,
} from "@/content";
import { resolveStoredDocuments } from "@/content/schema";
import type { PortfolioContent } from "@/content/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";

/**
 * Server-side content repository: the one place the public site reads
 * portfolio data from.
 *
 * Supabase configured  -> stored documents (validated, cached, tag-revalidated)
 * Supabase missing     -> the static defaults in content/
 */

/** Cache tag every admin save revalidates. */
export const CONTENT_TAG = "portfolio-content";
export const DOCUMENTS_TABLE = "portfolio_documents";

export interface StoredRow {
  key: string;
  data: unknown;
  updated_at?: string | null;
}

/** Keyed view of raw rows; unknown keys are ignored. */
export function rowsToStoredDocuments(rows: StoredRow[]): Partial<Record<DocumentKey, unknown>> {
  const stored: Partial<Record<DocumentKey, unknown>> = {};
  for (const row of rows) {
    if (isDocumentKey(row.key)) stored[row.key] = row.data;
  }
  return stored;
}

// Throws on failure so a failed read is never cached; the caller falls back.
const readStoredRows = unstable_cache(
  async (): Promise<StoredRow[]> => {
    const { data, error } = await createSupabasePublicClient()
      .from(DOCUMENTS_TABLE)
      .select("key, data");
    if (error) throw new Error(error.message);
    return data ?? [];
  },
  ["portfolio-documents"],
  { tags: [CONTENT_TAG], revalidate: 3600 }
);

export function getContentSource(): "supabase" | "static" {
  return isSupabaseConfigured() ? "supabase" : "static";
}

export async function getPortfolioDocuments(): Promise<PortfolioDocuments> {
  if (!isSupabaseConfigured()) return DEFAULT_DOCUMENTS;

  try {
    const { documents, invalid } = resolveStoredDocuments(
      rowsToStoredDocuments(await readStoredRows())
    );
    if (invalid.length > 0) {
      console.warn(`[content] Invalid stored documents, using defaults for: ${invalid.join(", ")}`);
    }
    return documents;
  } catch (error) {
    console.warn("[content] Supabase read failed, serving static defaults:", error);
    return DEFAULT_DOCUMENTS;
  }
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  return assembleContent(await getPortfolioDocuments());
}
