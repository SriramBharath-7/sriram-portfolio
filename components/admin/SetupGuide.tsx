import Image from "next/image";
import kaliLogo from "@/public/assets/svg/kali-logo.png";
import { Icon } from "./icons";
import { Notice, StatusDot } from "./ui";

/** Shown on /admin/login when the Supabase environment variables are missing. */
export default function SetupGuide() {
  const steps = [
    "Create a free Supabase project.",
    "Run supabase/migrations/0001_portfolio_cms.sql, then supabase/seed.sql, in the SQL editor.",
    "Create your user in Authentication → Users and add it to admin_users (see the guide).",
    "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and ADMIN_EMAILS in .env.local.",
    "Restart the dev server and come back here.",
  ];

  return (
    <div className="adm-window">
      <div className="adm-window-bar">
        <Icon name="server" size={14} />
        <span>setup — content store offline</span>
        <StatusDot tone="warning" live />
      </div>
      <div className="adm-login-body">
        <div className="adm-login-hero">
          <Image src={kaliLogo} alt="" width={52} height={52} priority />
          <div>
            <h1>Control Center</h1>
            <p>kali · restricted administration</p>
          </div>
        </div>

        <Notice tone="warning" title="Supabase is not configured yet">
          The public portfolio keeps running on the built-in static content. Sign-in and editing need a Supabase
          project.
        </Notice>

        <ol className="adm-steps mt-6">
          {steps.map((step) => (
            <li key={step}>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <div className="adm-login-foot !justify-start">
          <span>
            <Icon name="info" size={14} />
            full walkthrough: <code className="text-[var(--text-2)]">docs/SUPABASE_SETUP.md</code>
          </span>
        </div>
      </div>
    </div>
  );
}
