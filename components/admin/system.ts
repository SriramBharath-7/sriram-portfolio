import { getSupabaseEnv, isSupabaseConfigured } from "@/lib/supabase/env";

/** What the system bar shows about the content store connection. */
export interface SystemInfo {
  configured: boolean;
  /** Supabase project host, e.g. abc.supabase.co. */
  host: string | null;
}

export function systemInfo(): SystemInfo {
  const configured = isSupabaseConfigured();
  if (!configured) return { configured, host: null };
  try {
    return { configured, host: new URL(getSupabaseEnv().url).host };
  } catch {
    return { configured, host: null };
  }
}

/** Supabase dashboard link for a hosted project (abc.supabase.co), else null. */
export function supabaseDashboardUrl(host: string | null): string | null {
  const match = host?.match(/^([a-z0-9]+)\.supabase\.co$/);
  return match ? `https://supabase.com/dashboard/project/${match[1]}` : null;
}
