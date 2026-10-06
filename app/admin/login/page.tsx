import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import kaliLogo from "@/public/assets/svg/kali-logo.png";
import { Icon } from "@/components/admin/icons";
import LoginForm from "@/components/admin/LoginForm";
import SetupGuide from "@/components/admin/SetupGuide";
import SystemClock from "@/components/admin/SystemClock";
import { StatusDot } from "@/components/admin/ui";
import Wallpaper from "@/components/admin/Wallpaper";
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
    <div className="adm-login">
      <Wallpaper variant="login" />

      <header className="adm-bar">
        <span className="adm-bar-logo" aria-hidden="true">
          <Image src={kaliLogo} alt="" width={24} height={24} priority />
        </span>
        <p className="adm-bar-brand">
          <strong>kali</strong>
          <span>tty1 · admin console</span>
        </p>
        <div className="adm-bar-tray">
          <span className="adm-tray">
            <StatusDot tone="warning" />
            <span className="adm-tray-label">locked</span>
          </span>
          <SystemClock />
        </div>
      </header>

      <main className="adm-login-stage">
        <div className="adm-login-card">
          {configured ? (
            <LoginForm
              initialError={searchParams.error === "unauthorized" ? "This account is not authorized." : undefined}
            />
          ) : (
            <SetupGuide />
          )}
        </div>

        <a href="/" className="adm-login-back">
          <Icon name="arrowLeft" size={15} />
          back to the portfolio
        </a>
      </main>
    </div>
  );
}
