import type { Metadata } from "next";
import Link from "next/link";
import { DOCUMENT_KEYS } from "@/content/documents";
import { loadAdminDocuments } from "@/lib/admin/data";
import { Icon, type IconName } from "@/components/admin/icons";
import { Badge, Card, Notice, PageHeader } from "@/components/admin/ui";
import RelativeTime from "@/components/admin/RelativeTime";
import { DOCUMENT_SECTIONS } from "@/components/admin/sections";

export const metadata: Metadata = { title: "Overview" };

function Stat({
  icon,
  label,
  value,
  detail,
  href,
}: {
  icon: IconName;
  label: string;
  value: string | number;
  detail?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="adm-card p-4 flex items-start gap-3 hover:border-[var(--border-strong)] transition-colors"
    >
      <span className="w-9 h-9 rounded-lg bg-[var(--surface-3)] text-[var(--accent)] flex items-center justify-center">
        <Icon name={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] adm-muted">{label}</span>
        <span className="block text-[22px] font-semibold leading-tight mt-0.5">{value}</span>
        {detail && <span className="block text-[12px] adm-faint mt-0.5">{detail}</span>}
      </span>
    </Link>
  );
}

export default async function OverviewPage() {
  const payload = await loadAdminDocuments();
  const { documents, meta } = payload;

  const skillCount = documents.skills.groups.reduce((total, group) => total + group.items.length, 0);
  const enabledCommands = documents.commands.filter((command) => command.enabled).length;
  const enabledApps = documents.apps.filter((app) => app.enabled).length;
  const visibleSocials = documents.profile.socials.filter((social) => social.enabled !== false).length;
  const featuredRepos = documents.projects.repos.filter((repo) => repo.featured).length;
  const storedCount = DOCUMENT_KEYS.filter((key) => meta[key]?.stored).length;

  return (
    <>
      <PageHeader
        title="Overview"
        description={`Welcome back. Everything here feeds the Kali desktop: terminal, virtual filesystem and Firefox read the same data.`}
        actions={
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn">
            <Icon name="external" size={16} />
            Open portfolio
          </a>
        }
      />

      {payload.error && (
        <div className="mb-6">
          <Notice tone="danger" title="Could not read the database">
            {payload.error}
          </Notice>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <Stat icon="certifications" label="Certifications" value={documents.certifications.length} href="/admin/certifications" />
        <Stat icon="skills" label="Skills" value={skillCount} detail={`${documents.skills.groups.length} groups`} href="/admin/skills" />
        <Stat
          icon="commands"
          label="Custom commands"
          value={documents.commands.length}
          detail={`${enabledCommands} enabled`}
          href="/admin/commands"
        />
        <Stat
          icon="apps"
          label="Enabled apps"
          value={`${enabledApps} / ${documents.apps.length}`}
          href="/admin/apps"
        />
        <Stat icon="socials" label="Visible social links" value={visibleSocials} href="/admin/socials" />
        <Stat
          icon="projects"
          label="Featured repositories"
          value={featuredRepos}
          detail="Live from GitHub"
          href="/admin/projects"
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <Card title="Content" description="One stored document per area. Defaults are used until you save.">
          <ul className="divide-y divide-[var(--border)] -my-2">
            {DOCUMENT_KEYS.map((key) => {
              const info = meta[key];
              return (
                <li key={key} className="flex items-center gap-3 py-2.5">
                  <Link href={DOCUMENT_SECTIONS[key].href} prefetch={false} className="flex-1 min-w-0 hover:text-white">
                    {DOCUMENT_SECTIONS[key].label}
                  </Link>
                  {info?.invalid ? (
                    <Badge tone="danger">Invalid · using default</Badge>
                  ) : info?.stored ? (
                    <Badge tone="success">Saved</Badge>
                  ) : (
                    <Badge>Default</Badge>
                  )}
                  <span className="w-24 text-right text-[12px] adm-faint">
                    <RelativeTime iso={info?.updatedAt ?? null} />
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card title="Status">
            <dl className="space-y-3 text-[13px]">
              <div>
                <dt className="adm-faint text-[12px]">Data source</dt>
                <dd className="mt-0.5">
                  {payload.source === "supabase" ? (
                    <Badge tone="success">Supabase</Badge>
                  ) : (
                    <Badge tone="warning">Static fallback</Badge>
                  )}
                </dd>
              </div>
              <div>
                <dt className="adm-faint text-[12px]">Last content update</dt>
                <dd className="mt-0.5">
                  <RelativeTime iso={payload.lastUpdated} fallback="Never" />
                </dd>
              </div>
              <div>
                <dt className="adm-faint text-[12px]">Stored documents</dt>
                <dd className="mt-0.5">
                  {storedCount} of {DOCUMENT_KEYS.length}
                </dd>
              </div>
            </dl>
          </Card>

          <Card title="Quick actions">
            <div className="flex flex-col gap-2">
              <Link href="/admin/certifications" prefetch={false} className="adm-btn justify-start">
                <Icon name="plus" size={16} />
                Add a certification
              </Link>
              <Link href="/admin/commands" prefetch={false} className="adm-btn justify-start">
                <Icon name="commands" size={16} />
                New terminal command
              </Link>
              <Link href="/admin/profile" prefetch={false} className="adm-btn justify-start">
                <Icon name="profile" size={16} />
                Edit profile
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
