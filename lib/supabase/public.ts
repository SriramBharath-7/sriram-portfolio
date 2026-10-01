import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

/**
 * Cookie-less anonymous client for public reads. It never carries a session,
 * so it can run inside `unstable_cache`.
 *
 * Do not pass `cache: "no-store"` to its fetch: inside `unstable_cache` Next
 * already forces nested fetches past the fetch cache, while an explicit
 * no-store fetch aborts static generation of the page (and the repository
 * would then silently fall back to the static defaults).
 */
export function createSupabasePublicClient() {
  const { url, anonKey } = getSupabaseEnv();

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
