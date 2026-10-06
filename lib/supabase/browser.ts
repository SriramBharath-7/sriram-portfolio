import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

/**
 * Admin-only browser client (certificate uploads). Shares the auth cookies
 * with the server; @supabase/ssr returns the same instance on every call.
 */
export function getSupabaseBrowserClient() {
  const { url, publishableKey } = getSupabaseEnv();
  return createBrowserClient(url, publishableKey);
}
