"use client";

import { useMemo, useState } from "react";
import type { ProjectsDocument } from "@/content/documents";
import type { RepoOverride } from "@/content/types";
import type { Repo } from "@/lib/github/types";
import { Badge, Card, EmptyLine, IconButton, Notice, TextField, Toggle } from "../ui";
import { Icon } from "../icons";
import { SortableList } from "../lists";
import { SaveBar } from "../SaveBar";
import { useDocumentEditor } from "../useDocumentEditor";

type LiveRepo = Repo & { fork?: boolean; archived?: boolean };

function isEmpty(override: RepoOverride): boolean {
  return !override.hidden && !override.featured && !override.description?.trim() && !override.homepage?.trim();
}

/** Featured first (their order is the display order), empty overrides dropped. */
function normalize(repos: RepoOverride[]): RepoOverride[] {
  const kept = repos.filter((repo) => !isEmpty(repo));
  return [...kept.filter((repo) => repo.featured), ...kept.filter((repo) => !repo.featured)];
}

export default function ProjectsEditor({
  projects,
  username,
  repos,
  repoError,
}: {
  projects: ProjectsDocument;
  username: string;
  repos: LiveRepo[] | null;
  repoError?: string;
}) {
  const editor = useDocumentEditor<ProjectsDocument>({ docKey: "projects", label: "Projects", initial: projects });
  const overrides = editor.value.repos;
  const [expanded, setExpanded] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const byName = useMemo(() => new Map(overrides.map((override) => [override.name, override])), [overrides]);
  const featured = overrides.filter((override) => override.featured);
  const liveNames = useMemo(() => new Set((repos ?? []).map((repo) => repo.name)), [repos]);
  const stale = repos ? overrides.filter((override) => !liveNames.has(override.name)) : [];

  const writeRepos = (next: RepoOverride[]) => editor.set("repos", normalize(next));

  const patch = (name: string, change: Partial<RepoOverride>) => {
    const existing = byName.get(name);
    const updated: RepoOverride = { ...(existing ?? { name }), ...change };
    const others = overrides.filter((override) => override.name !== name);
    if (change.featured && !existing?.featured) {
      // A newly featured repo goes to the end of the featured list.
      writeRepos([...others.filter((o) => o.featured), updated, ...others.filter((o) => !o.featured)]);
    } else if (existing) {
      writeRepos(overrides.map((override) => (override.name === name ? updated : override)));
    } else {
      writeRepos([...overrides, updated]);
    }
  };

  const moveFeatured = (from: number, to: number) => {
    const next = featured.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    writeRepos([...next, ...overrides.filter((override) => !override.featured)]);
  };

  const visibleRepos = (repos ?? []).filter((repo) => repo.name.toLowerCase().includes(query.trim().toLowerCase()));
  const repoFor = (name: string) => repos?.find((repo) => repo.name === name);

  return (
    <div className="adm-stack">
      <Card doc="projects" icon="globe" title="Source" description={`Repositories are fetched live from github.com/${username}. Change the username on the Profile page.`}>
        <Toggle
          label="Hide forks"
          description="Forked repositories are left out of the Projects page."
          checked={editor.value.excludeForks}
          onChange={(checked) => editor.set("excludeForks", checked)}
        />
      </Card>

      <Card doc="projects.repos" icon="star" title="Featured" description="Pinned to the top of the Projects page in this order. Star a repository below to feature it.">
        {featured.length === 0 ? (
          <EmptyLine>No featured repositories. The page sorts by stars, then last update.</EmptyLine>
        ) : (
          <SortableList items={featured} getKey={(override) => override.name} onMove={moveFeatured} tight>
            {(override, index, controls) => (
              <div className="adm-item" data-dragging={controls.isDragging} data-flash={controls.flash}>
                <div className="adm-item-head">
                  <button {...controls.handleProps} className="adm-handle">
                    <Icon name="grip" size={16} />
                  </button>
                  <span className="adm-item-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon name="star" size={16} className="text-[var(--warn)]" />
                  <span className="min-w-0 flex-1 px-1">
                    <span className="adm-item-title adm-mono !text-[length:var(--fs-sm)]">{override.name}</span>
                    <span className="adm-item-sub">
                      {override.description || repoFor(override.name)?.description || "No description"}
                    </span>
                  </span>
                  {!liveNames.has(override.name) && repos && <Badge tone="warning">Not on GitHub</Badge>}
                  <div className="adm-item-actions">
                    <IconButton icon="up" label="Move up" className="adm-move" onClick={controls.moveUp} disabled={!controls.moveUp} />
                    <IconButton
                      icon="down"
                      label="Move down"
                      className="adm-move"
                      onClick={controls.moveDown}
                      disabled={!controls.moveDown}
                    />
                    <IconButton icon="x" label="Unfeature" remove onClick={() => patch(override.name, { featured: false })} />
                  </div>
                </div>
              </div>
            )}
          </SortableList>
        )}
      </Card>

      <Card
        doc="projects.repos + github"
        icon="projects"
        title="All repositories"
        description="Hide, feature, or fill in a missing description or demo link. GitHub stays the source of truth."
        actions={
          repos && repos.length > 6 ? (
            <div className="adm-input-wrap w-[min(15rem,100%)]">
              <span className="adm-input-icon">
                <Icon name="search" size={15} />
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter repositories…"
                aria-label="Filter repositories"
                spellCheck={false}
                className="adm-input adm-input--icon adm-input--mono !h-[var(--control-sm)]"
              />
            </div>
          ) : undefined
        }
      >
        {repoError && (
          <div className="mb-5">
            <Notice tone="warning" title="Could not load repositories from GitHub">
              {repoError} Existing settings below are kept and still saved.
            </Notice>
          </div>
        )}

        {repos && repos.length === 0 && <EmptyLine>No public repositories found for {username}.</EmptyLine>}
        {repos && repos.length > 0 && visibleRepos.length === 0 && <EmptyLine>No repository matches “{query}”.</EmptyLine>}

        <ul className="adm-sortable adm-sortable--tight">
          {visibleRepos.map((repo) => {
            const override = byName.get(repo.name);
            const hiddenByFork = editor.value.excludeForks && repo.fork;
            const hidden = override?.hidden || hiddenByFork || repo.archived;
            const isOpen = expanded === repo.name;
            const index = overrides.findIndex((o) => o.name === repo.name);
            return (
              <li key={repo.id} className="adm-item" data-open={isOpen}>
                <div className="adm-item-head !min-h-[3.25rem] !pl-2">
                  <button
                    type="button"
                    className="adm-item-toggle"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : repo.name)}
                  >
                    <Icon name="chevron" size={15} className="adm-chevron" />
                    <span className="min-w-0">
                      <span className={`adm-item-title adm-mono !text-[length:var(--fs-sm)] ${hidden ? "!text-[var(--faint)] line-through" : ""}`}>
                        {repo.name}
                      </span>
                      <span className="adm-item-sub">{override?.description || repo.description || "No description"}</span>
                    </span>
                  </button>
                  <span className="hidden sm:inline adm-mono text-[length:var(--fs-xs)] adm-faint w-14 text-right">★ {repo.stars}</span>
                  <div className="adm-item-tags">
                    {repo.fork && <Badge>Fork</Badge>}
                    {repo.archived && <Badge>Archived</Badge>}
                    {(override?.description || override?.homepage) && <Badge tone="accent">Edited</Badge>}
                  </div>
                  <div className="flex items-center gap-0.5">
                    <IconButton
                      icon="star"
                      label={override?.featured ? "Unfeature" : "Feature"}
                      aria-pressed={Boolean(override?.featured)}
                      onClick={() => patch(repo.name, { featured: !override?.featured })}
                      className={override?.featured ? "!text-[var(--warn)] !bg-[var(--warn-soft)]" : ""}
                    />
                    <IconButton
                      icon={override?.hidden ? "eyeOff" : "eye"}
                      label={override?.hidden ? "Show on portfolio" : "Hide from portfolio"}
                      aria-pressed={Boolean(override?.hidden)}
                      onClick={() => patch(repo.name, { hidden: !override?.hidden })}
                      className={override?.hidden ? "!text-[var(--danger)] !bg-[var(--danger-soft)]" : ""}
                    />
                  </div>
                </div>
                {isOpen && (
                  <div className="adm-item-body">
                    <div className="adm-form-grid">
                      <TextField
                        label="Description override"
                        value={override?.description ?? ""}
                        onChange={(value) => patch(repo.name, { description: value })}
                        placeholder={repo.description ?? "No GitHub description"}
                        error={index >= 0 ? editor.issue(`repos.${index}.description`) : undefined}
                        hint="Leave empty to use the GitHub description."
                      />
                      <TextField
                        label="Demo URL override"
                        type="url"
                        value={override?.homepage ?? ""}
                        onChange={(value) => patch(repo.name, { homepage: value })}
                        placeholder={repo.homepage ?? "https://…"}
                        error={index >= 0 ? editor.issue(`repos.${index}.homepage`) : undefined}
                        hint="Leave empty to use the GitHub homepage."
                        mono
                      />
                    </div>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[length:var(--fs-xs)] adm-faint">
                      {hiddenByFork && <span>Hidden because forks are excluded.</span>}
                      {repo.archived && <span>Archived repositories are never listed.</span>}
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="adm-link inline-flex items-center gap-1">
                        Open on GitHub
                        <Icon name="external" size={13} />
                      </a>
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {stale.length > 0 && (
          <div className="mt-6">
            <p className="adm-label">Settings for repositories no longer on GitHub</p>
            <ul className="flex flex-col gap-1.5">
              {stale.map((override) => (
                <li key={override.name} className="flex items-center gap-2 text-[length:var(--fs-sm)]">
                  <span className="flex-1 truncate adm-mono adm-muted">{override.name}</span>
                  <button
                    type="button"
                    className="adm-btn adm-btn--sm adm-btn--danger"
                    onClick={() => writeRepos(overrides.filter((o) => o.name !== override.name))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
