import "server-only";
import { DEFAULT_DOCUMENTS, DOCUMENT_KEYS, type DocumentKey } from "@/content";
import { resolveStoredDocuments } from "@/content/schema";
import { DOCUMENTS_TABLE, rowsToStoredDocuments, type StoredRow } from "@/lib/content/repository";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminDocumentsPayload, DocumentMeta } from "./types";

function buildMeta(rows: StoredRow[], invalid: DocumentKey[]): Record<DocumentKey, DocumentMeta> {
  const byKey = new Map(rows.map((row) => [row.key, row]));
  return Object.fromEntries(
    DOCUMENT_KEYS.map((key) => [
      key,
      {
        updatedAt: byKey.get(key)?.updated_at ?? null,
        stored: byKey.has(key),
        invalid: invalid.includes(key),
      },
    ])
  ) as Record<DocumentKey, DocumentMeta>;
}

/**
 * Fresh (uncached) document set for the admin editors, plus per-document
 * status. Never throws: a read failure returns the defaults with `error` set
 * so the UI can warn and refuse to save over data it could not load.
 */
export async function loadAdminDocuments(): Promise<AdminDocumentsPayload> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      source: "static",
      documents: DEFAULT_DOCUMENTS,
      meta: buildMeta([], []),
      lastUpdated: null,
    };
  }

  const { data, error } = await createSupabaseServerClient()
    .from(DOCUMENTS_TABLE)
    .select("key, data, updated_at");

  if (error) {
    return {
      configured: true,
      source: "static",
      documents: DEFAULT_DOCUMENTS,
      meta: buildMeta([], []),
      lastUpdated: null,
      error: `Could not read content from Supabase: ${error.message}`,
    };
  }

  const rows: StoredRow[] = data ?? [];
  const { documents, invalid } = resolveStoredDocuments(rowsToStoredDocuments(rows));
  const lastUpdated = rows.reduce<string | null>(
    (latest, row) => (row.updated_at && (!latest || row.updated_at > latest) ? row.updated_at : latest),
    null
  );

  return {
    configured: true,
    source: "supabase",
    documents,
    meta: buildMeta(rows, invalid),
    lastUpdated,
  };
}
