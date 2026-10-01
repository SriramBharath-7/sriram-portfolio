/**
 * Supabase configuration. Safe to import anywhere (server, middleware, browser):
 * only the NEXT_PUBLIC_* values are ever inlined into client bundles, and
 * ADMIN_EMAILS is read on the server only.
 */

export interface SupabaseEnv {
  url: string;
  anonKey: string;
}

/** Each variable is referenced literally so Next.js can inline it at build time. */
function readEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  )?.trim();
  return url && anonKey ? { url: url.replace(/\/+$/, ""), anonKey } : null;
}

/** False means "serve the static content and show the admin setup screen". */
export function isSupabaseConfigured(): boolean {
  return readEnv() !== null;
}

export function getSupabaseEnv(): SupabaseEnv {
  const env = readEnv();
  if (!env) {
    throw new Error(
      "Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
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
