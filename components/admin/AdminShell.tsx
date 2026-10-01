"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/lib/admin/actions";
import { AdminFeedbackProvider, useFeedback } from "./feedback";
import { Icon, type IconName } from "./icons";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}

const NAV: { title?: string; items: NavItem[] }[] = [
  { items: [{ href: "/admin", label: "Overview", icon: "overview" }] },
  {
    title: "Portfolio",
    items: [
      { href: "/admin/profile", label: "Profile & About", icon: "profile" },
      { href: "/admin/education", label: "Education", icon: "education" },
      { href: "/admin/skills", label: "Skills", icon: "skills" },
      { href: "/admin/certifications", label: "Certifications", icon: "certifications" },
      { href: "/admin/security", label: "CTF & Tools", icon: "security" },
      { href: "/admin/socials", label: "Socials", icon: "socials" },
      { href: "/admin/projects", label: "Projects", icon: "projects" },
    ],
  },
  {
    title: "Desktop",
    items: [
      { href: "/admin/commands", label: "Terminal commands", icon: "commands" },
      { href: "/admin/apps", label: "Applications", icon: "apps" },
      { href: "/admin/settings", label: "Settings", icon: "settings" },
    ],
  },
];

function NavLinks() {
  const pathname = usePathname();
  const { hasUnsavedChanges } = useFeedback();

  const guard = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasUnsavedChanges() && !window.confirm("You have unsaved changes on this page. Leave without saving?")) {
      event.preventDefault();
    }
  };

  return (
    <nav aria-label="Admin sections" className="flex md:flex-col gap-1 md:gap-5 overflow-x-auto md:overflow-visible">
      {NAV.map((group, index) => (
        <div key={group.title ?? index} className="flex md:flex-col gap-1 md:gap-0.5">
          {group.title && (
            <p className="hidden md:block px-2.5 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] adm-faint">
              {group.title}
            </p>
          )}
          {group.items.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                onClick={guard}
                aria-current={active ? "page" : undefined}
                className="adm-nav-link whitespace-nowrap"
              >
                <Icon name={item.icon} size={17} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <AdminFeedbackProvider>
      <div className="md:flex min-h-screen">
        <aside className="md:w-64 md:flex-shrink-0 md:h-screen md:sticky md:top-0 border-b md:border-b-0 md:border-r border-[var(--border)] bg-[var(--surface)] flex flex-col">
          <div className="flex items-center gap-2.5 px-5 h-16 flex-shrink-0">
            <span className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
              <Icon name="lock" size={17} />
            </span>
            <div className="leading-tight">
              <p className="font-semibold text-[14px]">Control Center</p>
              <p className="text-[11.5px] adm-faint">Portfolio admin</p>
            </div>
          </div>

          <div className="px-3 pb-3 md:pb-0 md:flex-1 md:overflow-y-auto">
            <NavLinks />
          </div>

          <div className="hidden md:block p-3 border-t border-[var(--border)]">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="adm-nav-link mb-1"
            >
              <Icon name="external" size={17} />
              <span>View portfolio</span>
            </a>
            <div className="flex items-center gap-2 px-2.5 pt-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] adm-faint">Signed in as</p>
                <p className="text-[12.5px] truncate" title={email}>
                  {email}
                </p>
              </div>
              <form action={signOutAction}>
                <button type="submit" className="adm-btn adm-btn--ghost adm-btn--icon" aria-label="Sign out" title="Sign out">
                  <Icon name="logout" size={16} />
                </button>
              </form>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="md:hidden flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
            <p className="text-[12.5px] adm-muted truncate">{email}</p>
            <form action={signOutAction}>
              <button type="submit" className="adm-btn adm-btn--sm">
                Sign out
              </button>
            </form>
          </div>
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">{children}</div>
        </main>
      </div>
    </AdminFeedbackProvider>
  );
}
