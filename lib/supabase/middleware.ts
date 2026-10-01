import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

/**
 * Refreshes the Supabase session for one request and reports the user.
 * Any refreshed auth cookies (and the no-cache headers Supabase requires with
 * them) are already applied to the returned response.
 */
export async function updateSession(
  request: NextRequest
): Promise<{ response: NextResponse; user: User | null }> {
  const { url, anonKey } = getSupabaseEnv();
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // getUser() validates the session with the Auth server and refreshes it when
  // needed. Nothing may run between client creation and this call.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { response, user };
}

/** Redirect that keeps any cookies/headers the session refresh produced. */
export function redirectWithSession(
  request: NextRequest,
  session: NextResponse,
  pathname: string
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  const redirect = NextResponse.redirect(url);
  session.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  ["cache-control", "expires", "pragma"].forEach((header) => {
    const value = session.headers.get(header);
    if (value) redirect.headers.set(header, value);
  });
  return redirect;
}
