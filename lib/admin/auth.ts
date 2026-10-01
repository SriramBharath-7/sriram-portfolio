import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { isAllowedAdminEmail, isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AdminUser {
  id: string;
  email: string;
}

/**
 * The signed-in admin, or null. getUser() checks the session with the Auth
 * server (cookies alone are not trusted) and the email must be in
 * ADMIN_EMAILS. Cached per request so layout + page share one lookup.
 */
export const getAdminUser = cache(async (): Promise<AdminUser | null> => {
  if (!isSupabaseConfigured()) return null;

  const {
    data: { user },
    error,
  } = await createSupabaseServerClient().auth.getUser();

  if (error || !user?.email || !isAllowedAdminEmail(user.email)) return null;
  return { id: user.id, email: user.email };
});

/**
 * Whether Row Level Security also recognizes the signed-in user (a row in
 * admin_users). An allowlisted email without it can sign in but not save.
 */
export async function hasDatabaseAdminRights(): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;
  const { data, error } = await createSupabaseServerClient().rpc("is_admin");
  return !error && data === true;
}

/** For admin pages and layouts: sends anyone who is not the admin to the login page. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
