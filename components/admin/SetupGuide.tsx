/** Shown on /admin/login when Supabase environment variables are missing. */
export default function SetupGuide() {
  const steps = [
    "Create a free Supabase project.",
    "Run supabase/migrations/0001_portfolio_cms.sql, then supabase/seed.sql, in the SQL editor.",
    "Create your user in Authentication → Users and add it to admin_users (see the guide).",
    "Put NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY and ADMIN_EMAILS in .env.local.",
    "Restart the dev server and come back here.",
  ];

  return (
    <div className="adm-card p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="adm-badge adm-badge--warning">Setup needed</span>
      </div>
      <p className="font-medium">Supabase is not configured yet.</p>
      <p className="adm-muted text-[13px] mt-1">
        The public portfolio keeps working from the built-in static content. Sign-in and editing need a
        Supabase project:
      </p>
      <ol className="mt-4 space-y-2 text-[13px] list-decimal pl-5">
        {steps.map((step) => (
          <li key={step} className="adm-muted">
            {step}
          </li>
        ))}
      </ol>
      <p className="text-[12px] adm-faint mt-4">
        Full walkthrough: <code className="font-mono text-[#c9d1de]">docs/SUPABASE_SETUP.md</code>
      </p>
    </div>
  );
}
