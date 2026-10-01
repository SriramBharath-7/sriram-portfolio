import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import SetupGuide from "@/components/admin/SetupGuide";
import { getAdminUser } from "@/lib/admin/auth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const configured = isSupabaseConfigured();
  if (configured && (await getAdminUser())) redirect("/admin");

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-7">
          <div className="mx-auto w-11 h-11 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 11V8a6 6 0 1112 0v3M5 11h14v10H5V11z" />
            </svg>
          </div>
          <h1 className="text-[22px] font-semibold tracking-tight">Portfolio Control Center</h1>
          <p className="adm-muted mt-1">Private area. Sign in with your admin account.</p>
        </div>

        {configured ? (
          <div className="adm-card p-6">
            <LoginForm initialError={searchParams.error === "unauthorized" ? "This account is not authorized." : undefined} />
          </div>
        ) : (
          <SetupGuide />
        )}

        <p className="text-center text-[12px] adm-faint mt-6">
          <a href="/" className="hover:text-[var(--text)]">
            ← Back to the portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
