"use client";

import { useMemo, useState } from "react";
import type { ProjectsDocument } from "@/content/documents";
import type { RepoOverride } from "@/content/types";
import type { Repo } from "@/lib/github/types";
import { Badge, Card, IconButton, Notice, TextField, Toggle } from "../ui";
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
    <div className="space-y-5">
      <Card title="Source" description={`Repositories are fetched live from github.com/${username}. Change the username on the Profile page.`}>
        <Toggle
          label="Hide forks"
          description="Forked repositories are left out of the Projects page."
          checked={editor.value.excludeForks}
          onChange={(checked) => editor.set("excludeForks", checked)}
        />
      </Card>

      <Card title="Featured" description="Pinned to the top of the Projects page in this order. Star a repository below to feature it.">
        {featured.length === 0 ? (
          <p className="adm-muted text-[13px]">No featured repositories. The page sorts by stars, then last update.</p>
        ) : (
          <SortableList items={featured} getKey={(override) => override.name} onMove={moveFeatured} className="space-y-2">
            {(override, index, controls) => (
              <div
                className="adm-item flex items-center gap-2 px-2.5 py-2"
                data-dragging={controls.isDragging}
                data-drop-target={controls.isDropTarget}
              >
                <button {...controls.handleProps} className="adm-handle w-7 h-7 flex items-center justify-center">
                  <Icon name="grip" size={16} />
                </button>
                <span className="w-6 text-center text-[12px] adm-faint">{index + 1}</span>
                <span className="flex-1 min-w-0">
                  <span className="block font-medium truncate">{override.name}</span>
                  <span className="block text-[12px] adm-faint truncate">
                    {override.description || repoFor(override.name)?.description || "No description"}
                  </span>
                </span>
                {!liveNames.has(override.name) && repos && <Badge tone="warning">Not on GitHub</Badge>}
                <IconButton icon="up" label="Move up" onClick={controls.moveUp} disabled={!controls.moveUp} />
                <IconButton icon="down" label="Move down" onClick={controls.moveDown} disabled={!controls.moveDown} />
                <IconButton icon="x" label="Unfeature" onClick={() => patch(override.name, { featured: false })} />
              </div>
            )}
          </SortableList>
        )}
      </Card>

      <Card
        title="All repositories"
        description="Hide, feature, or fill in a missing description or demo link. GitHub stays the source of truth."
        actions={
          repos && repos.length > 6 ? (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter…"
              aria-label="Filter repositories"
              className="adm-input h-8 w-44"
            />
          ) : undefined
        }
      >
        {repoError && (
          <div className="mb-4">
            <Notice tone="warning" title="Could not load repositories from GitHub">
              {repoError} Existing settings below are kept and still saved.
            </Notice>
          </div>
        )}

        {repos && repos.length === 0 && <p className="adm-muted text-[13px]">No public repositories found for {username}.</p>}

        <ul className="space-y-2">
          {visibleRepos.map((repo) => {
            const override = byName.get(repo.name);
            const hiddenByFork = editor.value.excludeForks && repo.fork;
            const hidden = override?.hidden || hiddenByFork || repo.archived;
            const isOpen = expanded === repo.name;
            const index = overrides.findIndex((o) => o.name === repo.name);
            return (
              <li key={repo.id} className="adm-item" data-open={isOpen}>
                <div className="flex items-center gap-2 px-3 py-2">
                  <button
                    type="button"
                    className="flex-1 min-w-0 text-left flex items-center gap-2.5"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : repo.name)}
                  >
                    <Icon name="chevron" size={15} className={`adm-faint transition-transform ${isOpen ? "rotate-90" : ""}`} />
                    <span className="min-w-0">
                      <span className={`block font-medium truncate ${hidden ? "adm-faint line-through" : ""}`}>{repo.name}</span>
                      <span className="block text-[12px] adm-faint truncate">
                        {override?.description || repo.description || "No description"}
                      </span>
                    </span>
                  </button>
                  <span className="hidden sm:inline text-[12px] adm-faint w-14 text-right">★ {repo.stars}</span>
                  {repo.fork && <Badge>Fork</Badge>}
                  {repo.archived && <Badge>Archived</Badge>}
                  {(override?.description || override?.homepage) && <Badge tone="accent">Edited</Badge>}
                  <IconButton
                    icon="star"
                    label={override?.featured ? "Unfeature" : "Feature"}
                    onClick={() => patch(repo.name, { featured: !override?.featured })}
                    className={override?.featured ? "!text-[var(--warning)]" : ""}
                  />
                  <IconButton
                    icon={override?.hidden ? "eyeOff" : "eye"}
                    label={override?.hidden ? "Show on portfolio" : "Hide from portfolio"}
                    onClick={() => patch(repo.name, { hidden: !override?.hidden })}
                    className={override?.hidden ? "!text-[var(--danger)]" : ""}
                  />
                </div>
                {isOpen && (
                  <div className="px-4 pb-4 pt-3 border-t border-[var(--border)] grid sm:grid-cols-2 gap-4">
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
                    />
                    <p className="sm:col-span-2 text-[12px] adm-faint">
                      {hiddenByFork ? "Hidden because forks are excluded. " : ""}
                      {repo.archived ? "Archived repositories are never listed. " : ""}
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                        Open on GitHub ↗
                      </a>
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {stale.length > 0 && (
          <div className="mt-5">
            <p className="adm-label">Settings for repositories no longer on GitHub</p>
            <ul className="space-y-1.5">
              {stale.map((override) => (
                <li key={override.name} className="flex items-center gap-2 text-[13px]">
                  <span className="flex-1 truncate adm-muted">{override.name}</span>
                  <button
                    type="button"
                    className="adm-btn adm-btn--sm adm-btn--ghost"
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
