import type { Metadata } from "next";
import Link from "next/link";
import { assembleContent, DOCUMENT_KEYS, type DocumentKey, type PortfolioDocuments } from "@/content/documents";
import { hasDatabaseAdminRights } from "@/lib/admin/auth";
import { loadAdminDocuments } from "@/lib/admin/data";
import { listRepositoriesForAdmin } from "@/lib/admin/github";
import { applyRepoOverrides } from "@/lib/github/fetch";
import { pathFromPublicUrl } from "@/lib/supabase/storage";
import { runCommand } from "@/lib/terminal/execute";
import { ALL_COMMANDS } from "@/lib/terminal/registry";
import { HOME } from "@/lib/vfs";
import { Icon, type IconName } from "@/components/admin/icons";
import { Badge, Notice, PageHeader, StatusDot } from "@/components/admin/ui";
import RelativeTime from "@/components/admin/RelativeTime";
import { DOCUMENT_SECTIONS } from "@/components/admin/sections";
import { supabaseDashboardUrl, systemInfo } from "@/components/admin/system";
import { Metric, ModuleFoot, ModuleLink, PanelBar, Stat, VisitorTerminal } from "@/components/admin/overview";

export const metadata: Metadata = { title: "Command Center" };

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

const plural = (count: number, word: string, many = `${word}s`) => `${count} ${count === 1 ? word : many}`;

/** Runs the terminal's own neofetch on the stored content: exactly what visitors get. */
function neofetchFor(documents: PortfolioDocuments) {
  const noop = () => {};
  const lines = runCommand("neofetch", {
    content: assembleContent(documents),
    cwd: HOME,
    history: [],
    setCwd: noop,
    clearScreen: noop,
    openApp: noop,
    openExternal: noop,
    exit: noop,
  });
  const output = lines.find((line) => line.kind === "neofetch");
  return output?.kind === "neofetch" ? output : null;
}

export default async function CommandCenterPage() {
  const payload = await loadAdminDocuments();
  const { documents, meta } = payload;
  const username = documents.profile.githubUsername;

  const [live, adminRole] = await Promise.all([
    listRepositoriesForAdmin(username),
    payload.configured ? hasDatabaseAdminRights() : Promise.resolve(false),
  ]);

  const { host } = systemInfo();
  const dashboard = supabaseDashboardUrl(host);
  const storedKeys = DOCUMENT_KEYS.filter((key) => meta[key]?.stored);
  const invalidKeys = DOCUMENT_KEYS.filter((key) => meta[key]?.invalid);
  // Most recent writes first, never-saved documents last.
  const storeOrder: DocumentKey[] = [
    ...DOCUMENT_KEYS.filter((key) => meta[key]?.updatedAt).sort((a, b) =>
      meta[b].updatedAt! > meta[a].updatedAt! ? 1 : -1
    ),
    ...DOCUMENT_KEYS.filter((key) => !meta[key]?.updatedAt),
  ];
  const lastKey = meta[storeOrder[0]]?.updatedAt ? storeOrder[0] : undefined;

  const { profile, about, certifications, skills, education, commands, apps, settings, projects, ctf, tools, blog } =
    documents;
  const skillCount = skills.groups.reduce((total, group) => total + group.items.length, 0);
  const largestGroup = Math.max(1, ...skills.groups.map((group) => group.items.length));
  const latestCert = [...certifications]
    .filter((cert) => cert.completed || cert.issued)
    .sort((a, b) => ((b.completed || b.issued)! > (a.completed || a.issued)! ? 1 : -1))[0];
  const certsInStorage = certifications.filter((cert) => pathFromPublicUrl(cert.image) !== null).length;
  const enabledCommands = commands.filter((command) => command.enabled).length;
  const visibleSocials = profile.socials.filter((social) => social.enabled !== false).length;
  const featured = projects.repos.filter((repo) => repo.featured);
  const hidden = projects.repos.filter((repo) => repo.hidden).length;
  const repos = "repos" in live ? live.repos : null;
  const visibleRepos = repos ? applyRepoOverrides(repos, projects).length : null;
  const firstName = profile.name.split(" ")[0] || profile.name;
  const neofetch = neofetchFor(documents);

  const launchers: { href: string; icon: IconName; title: string; hint: string; external?: boolean }[] = [
    { href: "/admin/certifications", icon: "certifications", title: "Certificates", hint: "add · reorder · upload" },
    { href: "/admin/commands", icon: "commands", title: "Terminal commands", hint: "custom shell commands" },
    { href: "/admin/profile", icon: "profile", title: "Profile & About", hint: "whoami · about.txt" },
    { href: "/admin/apps", icon: "apps", title: "Desktop apps", hint: "icons · taskbar" },
    ...(dashboard
      ? [{ href: dashboard, icon: "database" as IconName, title: "Supabase dashboard", hint: host ?? "", external: true }]
      : []),
    { href: "/", icon: "external", title: "Live portfolio", hint: "opens in a new tab", external: true },
  ];

  return (
    <>
      <PageHeader
        title="Command Center"
        description={`Welcome back, ${firstName}. Everything here feeds the live Kali desktop — the terminal, its filesystem and Firefox all read the same content.`}
        actions={
          <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn--primary">
            <Icon name="external" size={17} />
            Open portfolio
          </a>
        }
      />

      {payload.error && (
        <Notice tone="danger" title="Could not read the database">
          {payload.error}
        </Notice>
      )}

      <section className="adm-panel adm-stats mb-5" aria-label="System status">
        <Stat
          label="Data source"
          tone={payload.source === "supabase" ? "success" : "warning"}
          live={payload.source === "supabase"}
          value={payload.source === "supabase" ? "Supabase" : "Static fallback"}
          detail={host ?? "content/*.ts defaults"}
        />
        <Stat
          label="Write access"
          tone={adminRole ? "success" : "warning"}
          value={adminRole ? "RLS verified" : "Not verified"}
          detail={adminRole ? "admin_users · saves accepted" : "add your user to admin_users"}
        />
        <Stat
          label="Content store"
          tone={invalidKeys.length ? "danger" : storedKeys.length === DOCUMENT_KEYS.length ? "success" : "accent"}
          value={
            <>
              {storedKeys.length}
              <small> / {DOCUMENT_KEYS.length} stored</small>
            </>
          }
          detail={
            invalidKeys.length
              ? `${invalidKeys.length} invalid · using defaults`
              : storedKeys.length === DOCUMENT_KEYS.length
              ? "every section saved"
              : `${DOCUMENT_KEYS.length - storedKeys.length} on built-in defaults`
          }
        >
          <div className="adm-segbar mt-2.5" aria-hidden="true">
            {DOCUMENT_KEYS.map((key, i) => (
              <span
                key={key}
                title={DOCUMENT_SECTIONS[key].label}
                data-state={meta[key]?.invalid ? "invalid" : meta[key]?.stored ? "stored" : "default"}
                style={{ "--i": i } as React.CSSProperties}
              />
            ))}
          </div>
        </Stat>
        <Stat
          label="GitHub"
          tone={repos ? "success" : "warning"}
          value={repos ? plural(repos.length, "repo") : "Unavailable"}
          detail={repos ? `api · ${username}` : "error" in live ? live.error : "not reachable"}
        />
        <Stat
          label="Last write"
          tone={lastKey ? "accent" : "neutral"}
          value={<RelativeTime iso={payload.lastUpdated} fallback="Never" />}
          detail={lastKey ? DOCUMENT_SECTIONS[lastKey].label : "nothing saved yet"}
        />
      </section>

      <div className="adm-grid">
        <div className="adm-col adm-span-7">
          {neofetch && <VisitorTerminal logo={neofetch.logo} rows={neofetch.rows} />}

          <section className="adm-panel" aria-label="Quick launch">
            <PanelBar icon="activity" title="Quick launch" />
            <div className="adm-panel-body">
              <div className="adm-launch">
                {launchers.map((item) => {
                  const body = (
                    <>
                      <span className="adm-panel-icon">
                        <Icon name={item.icon} size={17} />
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.hint}</small>
                      </span>
                      <Icon name={item.external ? "external" : "arrowRight"} size={15} />
                    </>
                  );
                  return item.external ? (
                    <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="adm-launch-btn">
                      {body}
                    </a>
                  ) : (
                    <Link key={item.href} href={item.href} prefetch={false} className="adm-launch-btn">
                      {body}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <section className="adm-panel adm-span-5 flex flex-col" aria-label="Content store">
          <PanelBar icon="database" title="Content store" tag="portfolio_documents">
            <Badge tone={invalidKeys.length ? "danger" : "success"}>
              {storedKeys.length}/{DOCUMENT_KEYS.length}
            </Badge>
          </PanelBar>
          <div className="adm-store">
            {storeOrder.map((key) => {
              const state = meta[key];
              return (
                <Link key={key} href={DOCUMENT_SECTIONS[key].href} prefetch={false} className="adm-store-row">
                  <StatusDot tone={state?.invalid ? "danger" : state?.stored ? "success" : "neutral"} />
                  <span className="adm-store-name">{key}</span>
                  <span className="adm-store-label">
                    {DOCUMENT_SECTIONS[key].label}
                    {state?.invalid ? " · invalid, using defaults" : state?.stored ? "" : " · built-in default"}
                  </span>
                  <span className="adm-store-time">
                    <RelativeTime iso={state?.updatedAt ?? null} fallback="never" />
                  </span>
                  <Icon name="chevron" size={15} />
                </Link>
              );
            })}
          </div>
          <p className="adm-store-foot">
            <span>
              <StatusDot tone="success" /> stored
            </span>
            <span>
              <StatusDot tone="neutral" /> built-in default
            </span>
            <span>
              <StatusDot tone="danger" /> invalid
            </span>
            <span className="ml-auto">latest write first</span>
          </p>
        </section>
      </div>

      <p className="adm-section-label mt-10">Modules</p>

      <div className="adm-grid adm-stagger">
        <ModuleLink index={0} href="/admin/certifications" icon="certifications" title="Certifications" tag="certifications">
          <Metric value={certifications.length} unit={certifications.length === 1 ? "certificate" : "certificates"} />
          {certifications.length > 0 && (
            <div className="adm-thumbs" aria-hidden="true">
              {certifications.slice(0, 4).map((cert) => (
                <span key={cert.id} title={cert.title}>
                  {cert.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cert.image} alt="" loading="lazy" />
                  )}
                </span>
              ))}
            </div>
          )}
          <p className="text-[length:var(--fs-sm)] adm-muted truncate">
            {latestCert
              ? `Latest: ${latestCert.title} · ${formatDate(latestCert.completed || latestCert.issued)}`
              : "No dated certificates"}
          </p>
          <ModuleFoot>
            {certsInStorage} in supabase storage · {certifications.length - certsInStorage} static
          </ModuleFoot>
        </ModuleLink>

        <ModuleLink index={1} href="/admin/projects" icon="projects" title="Projects" tag="github + overrides">
          <Metric value={visibleRepos ?? "—"} unit={repos ? `of ${repos.length} repositories visible` : "GitHub unavailable"} />
          <ul className="flex flex-col gap-1.5 text-[length:var(--fs-sm)]">
            {featured.length === 0 ? (
              <li className="adm-muted">No featured repositories · sorted by stars</li>
            ) : (
              featured.slice(0, 3).map((repo) => (
                <li key={repo.name} className="flex items-center gap-2 min-w-0">
                  <Icon name="star" size={14} className="text-[var(--warn)]" />
                  <span className="truncate adm-mono text-[length:var(--fs-xs)] text-[var(--text-2)]">{repo.name}</span>
                </li>
              ))
            )}
          </ul>
          <ModuleFoot>
            github.com/{username} · {hidden} hidden · forks {projects.excludeForks ? "hidden" : "shown"}
          </ModuleFoot>
        </ModuleLink>

        <ModuleLink index={2} href="/admin/commands" icon="commands" title="Terminal commands" tag="commands">
          <Metric value={enabledCommands} unit={`of ${commands.length} custom enabled`} />
          {commands.length > 0 ? (
            <dl className="adm-help">
              {commands.slice(0, 4).map((command) => (
                <div key={command.id || command.name} className="contents">
                  <dt data-off={!command.enabled}>{command.name}</dt>
                  <dd>{command.description || "—"}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[length:var(--fs-sm)] adm-muted">No custom commands yet.</p>
          )}
          <ModuleFoot>{ALL_COMMANDS.length} built-in commands · protected</ModuleFoot>
        </ModuleLink>

        <ModuleLink index={3} href="/admin/skills" icon="skills" title="Skills" tag="skills">
          <Metric value={skillCount} unit={`skills in ${plural(skills.groups.length, "group")}`} />
          <div className="adm-hbars">
            {skills.groups.slice(0, 4).map((group) => (
              <div key={group.id} className="adm-hbar">
                <span>{group.title || "Untitled group"}</span>
                <span>{group.items.length}</span>
                <i style={{ "--w": `${(group.items.length / largestGroup) * 100}%` } as React.CSSProperties} />
              </div>
            ))}
          </div>
          <ModuleFoot>focus · {skills.interests.join(", ") || "—"}</ModuleFoot>
        </ModuleLink>

        <section className="adm-panel adm-span-4 flex flex-col" style={{ "--i": 4 } as React.CSSProperties}>
          <PanelBar icon="apps" title="Desktop" tag="apps + settings" />
          <div className="adm-panel-body flex flex-1 flex-col gap-4">
            <Link href="/admin/apps" prefetch={false} className="adm-dock" aria-label="Applications">
              {apps.map((app) => (
                <span key={app.id} className="adm-dock-app" data-off={!app.enabled} title={app.name}>
                  <span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={app.icon} alt="" />
                    {app.enabled && app.showOnDesktop && <StatusDot tone="success" />}
                  </span>
                  <span>{app.name}</span>
                </span>
              ))}
            </Link>
            <dl className="adm-kv">
              <dt>welcome</dt>
              <dd>
                <StatusDot tone={settings.welcome.enabled ? "success" : "neutral"} />
                <span>{settings.welcome.enabled ? settings.welcome.title : "popup off"}</span>
              </dd>
              <dt>widget</dt>
              <dd>
                <StatusDot tone={settings.githubWidget.enabled ? "success" : "neutral"} />
                <span>{settings.githubWidget.enabled ? settings.githubWidget.label : "GitHub widget off"}</span>
              </dd>
              <dt>boot</dt>
              <dd>
                <span>{plural(settings.boot.messages.length, "message")}</span>
              </dd>
              <dt>motd</dt>
              <dd>
                <span>{plural(settings.terminal.motd.length, "line")}</span>
              </dd>
            </dl>
            <p className="mt-auto pt-3 border-t border-[var(--line)] flex gap-4 adm-mono text-[length:var(--fs-xs)]">
              <Link href="/admin/apps" prefetch={false} className="adm-link">
                apps →
              </Link>
              <Link href="/admin/settings" prefetch={false} className="adm-link">
                settings →
              </Link>
            </p>
          </div>
        </section>

        <section className="adm-panel adm-span-4 flex flex-col" style={{ "--i": 5 } as React.CSSProperties}>
          <PanelBar icon="profile" title="Profile & pages" tag="profile" />
          <div className="adm-panel-body flex flex-1 flex-col gap-3">
            <div className="min-w-0">
              <p className="font-semibold truncate">{profile.name}</p>
              <p className="text-[length:var(--fs-sm)] adm-muted truncate">
                {profile.role} · {profile.status}
              </p>
            </div>
            <div className="adm-store !p-0 -mx-2">
              {[
                { href: "/admin/profile", name: "about", value: plural(about.sections.length, "section") },
                {
                  href: "/admin/education",
                  name: "education",
                  value: `${plural(education.entries.length, "entry", "entries")} · ${plural(education.goals.length, "goal")}`,
                },
                {
                  href: "/admin/security",
                  name: "ctf + tools",
                  value: `${plural(ctf.focusAreas.length, "area")} · ${plural(tools.items.length, "tool")}`,
                },
                { href: "/admin/socials", name: "socials", value: `${visibleSocials} of ${profile.socials.length} visible` },
                {
                  href: "/admin/settings",
                  name: "blog",
                  value: [blog.devtoUsername && "dev.to", blog.mediumHandle && "medium"].filter(Boolean).join(" · ") || "no sources",
                },
              ].map((row) => (
                <Link key={row.name} href={row.href} prefetch={false} className="adm-store-row !grid-cols-[7rem_minmax(0,1fr)_auto]">
                  <span className="adm-store-name">{row.name}</span>
                  <span className="adm-store-label">{row.value}</span>
                  <Icon name="chevron" size={15} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
