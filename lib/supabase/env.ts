/**
 * Supabase configuration. Safe to import anywhere (server, middleware, browser):
 * only the NEXT_PUBLIC_* values are ever inlined into client bundles, and
 * ADMIN_EMAILS is read on the server only.
 *
 * The app uses Supabase's publishable key (sb_publishable_...) everywhere:
 * browser, auth, database and storage. Writes are authorized by the signed-in
 * user's session plus Row Level Security, so no secret / service-role key
 * exists in this project.
 */

export interface SupabaseEnv {
  url: string;
  publishableKey: string;
}

/** Each variable is referenced literally so Next.js can inline it at build time. */
function readEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  return url && publishableKey ? { url: url.replace(/\/+$/, ""), publishableKey } : null;
}

/** False means "serve the static content and show the admin setup screen". */
export function isSupabaseConfigured(): boolean {
  return readEnv() !== null;
}

export function getSupabaseEnv(): SupabaseEnv {
  const env = readEnv();
  if (!env) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }
  return env;
}

/** Lowercased emails allowed into /admin, from the comma-separated ADMIN_EMAILS. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/** Deny by default: an empty ADMIN_EMAILS lets nobody in. */
export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}
