import "server-only";
import { DEFAULT_DOCUMENTS, DOCUMENT_KEYS, type DocumentKey } from "@/content";
import { resolveStoredDocuments } from "@/content/schema";
import { DOCUMENTS_TABLE, rowsToStoredDocuments, type StoredRow } from "@/lib/content/repository";
import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";
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

/**
 * Read-only checks for the post-sign-in access sequence: does the database
 * answer, does RLS recognise this user as an admin, how much content is
 * stored. Runs once per sign-in, never on normal navigation.
 */
export async function loadAccessChecks(): Promise<{
  host: string | null;
  database: "ok" | "error";
  adminRole: boolean;
  documents: number | null;
  totalDocuments: number;
}> {
  const supabase = createSupabaseServerClient();
  const [role, rows] = await Promise.all([
    supabase.rpc("is_admin"),
    supabase.from(DOCUMENTS_TABLE).select("key", { count: "exact", head: true }),
  ]);

  let host: string | null = null;
  try {
    host = new URL(getSupabaseEnv().url).host;
  } catch {
    host = null;
  }

  return {
    host,
    database: role.error && rows.error ? "error" : "ok",
    adminRole: !role.error && role.data === true,
    documents: rows.error ? null : rows.count ?? 0,
    totalDocuments: DOCUMENT_KEYS.length,
  };
}
