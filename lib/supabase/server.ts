import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./env";

/**
 * Per-request client bound to the visitor's auth cookies. Used by the admin
 * dashboard and its server actions, so every write runs as the signed-in user
 * and Row Level Security decides what is allowed.
 */
export function createSupabaseServerClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Components cannot set cookies; the middleware refreshes the
          // session on every /admin request, so this is safe to ignore.
        }
      },
    },
  });
}
