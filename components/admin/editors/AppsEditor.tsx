"use client";

import type { AppConfig } from "@/content/types";
import { BUILTIN_APPS } from "@/content/schema";
import { Badge, Button, Card, Notice, TextField, Toggle } from "../ui";
import { ItemCard, SortableList, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import { uniqueId, useDocumentEditor } from "../useDocumentEditor";
import { RouteSelect } from "./shared";

const KNOWN_ICONS = [
  "/assets/svg/terminal.svg",
  "/assets/svg/firefox.svg",
  "/assets/svg/tools.svg",
  "/assets/svg/arch-linux-logo.svg",
  "/assets/svg/kali-logo.png",
];

const KIND_LABELS: Record<AppConfig["kind"], string> = {
  terminal: "Built-in window",
  browser: "Built-in window",
  route: "Firefox page shortcut",
  link: "Link shortcut",
};

function AppIcon({ src }: { src: string }) {
  return (
    <span className="w-9 h-9 rounded-lg bg-[var(--surface-3)] flex items-center justify-center flex-shrink-0 overflow-hidden">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="w-6 h-6 object-contain" />
      ) : null}
    </span>
  );
}

function IconPicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <p className="adm-label">Icon</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {KNOWN_ICONS.map((icon) => (
          <button
            key={icon}
            type="button"
            onClick={() => onChange(icon)}
            aria-label={`Use ${icon.split("/").pop()}`}
            aria-pressed={value === icon}
            className={`w-11 h-11 rounded-lg border flex items-center justify-center bg-[var(--surface)] ${
              value === icon ? "border-[var(--accent)] shadow-[0_0_0_3px_var(--accent-soft)]" : "border-[var(--border)] hover:border-[var(--border-strong)]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt="" className="w-7 h-7 object-contain" />
          </button>
        ))}
      </div>
      <TextField
        value={value}
        onChange={onChange}
        error={error}
        placeholder="/assets/svg/my-icon.svg or https://…"
        hint="Pick one above, or use any /public path or https image URL."
        mono
      />
    </div>
  );
}

export default function AppsEditor({ apps }: { apps: AppConfig[] }) {
  const editor = useDocumentEditor<AppConfig[]>({ docKey: "apps", label: "Applications", initial: apps });
  const list = editor.list<AppConfig>("");
  const open = useOpenItem();

  const addShortcut = (kind: "route" | "link") => {
    const id = uniqueId(kind === "route" ? "page-shortcut" : "link-shortcut", list.items.map((app) => app.id));
    list.add({
      id,
      kind,
      name: kind === "route" ? "Certifications" : "Resume",
      icon: kind === "route" ? "/assets/svg/firefox.svg" : "/assets/svg/tools.svg",
      enabled: true,
      showOnDesktop: true,
      showInTaskbar: false,
      url: kind === "route" ? "home://certifications" : "https://",
    });
    open.open(String(list.items.length));
  };

  return (
    <div className="space-y-5">
      <Notice tone="accent" title="What can be managed here">
        Terminal and Firefox are real React apps, so they can be renamed, re-iconed, hidden and reordered but not
        deleted. New entries are shortcuts that open a Firefox page or an external link. An app with its own new
        window still needs code (lib/apps/registry.ts plus a component).
      </Notice>

      <Card
        title="Desktop applications"
        description="Order here is the order of desktop icons."
        actions={
          <div className="flex gap-2">
            <Button size="sm" icon="plus" onClick={() => addShortcut("route")}>
              Page shortcut
            </Button>
            <Button size="sm" icon="plus" onClick={() => addShortcut("link")}>
              Link shortcut
            </Button>
          </div>
        }
      >
        <SortableList
          items={list.items}
          getKey={(_, index) => String(index)}
          onMove={(from, to) => {
            list.move(from, to);
            open.open(String(to));
          }}
        >
          {(app, index, controls) => {
            const base = String(index);
            const builtin = app.id in BUILTIN_APPS;
            const windowApp = app.kind === "terminal" || app.kind === "browser";
            return (
              <ItemCard
                title={app.name || "Untitled"}
                subtitle={app.kind === "link" || app.kind === "route" ? app.url : KIND_LABELS[app.kind]}
                leading={<AppIcon src={app.icon} />}
                badges={
                  <>
                    <Badge tone={builtin ? "accent" : "neutral"}>{KIND_LABELS[app.kind]}</Badge>
                    {!app.enabled && <Badge tone="warning">Disabled</Badge>}
                  </>
                }
                controls={controls}
                open={open.isOpen(base)}
                onToggle={() => open.toggle(base)}
                onDelete={builtin ? undefined : () => list.remove(index)}
                deleteConfirm={`Delete the ${app.name || "untitled"} shortcut?`}
                errorCount={editor.issuesUnder(base)}
              >
                <div className="grid sm:grid-cols-3 gap-4">
                  <Toggle label="Enabled" checked={app.enabled} onChange={(checked) => editor.set(`${base}.enabled`, checked)} />
                  <Toggle
                    label="Desktop icon"
                    checked={app.showOnDesktop}
                    onChange={(checked) => editor.set(`${base}.showOnDesktop`, checked)}
                  />
                  <Toggle
                    label="Taskbar entry"
                    description={windowApp ? "While its window is open" : "Shortcuts open no window"}
                    checked={windowApp && app.showInTaskbar}
                    disabled={!windowApp}
                    onChange={(checked) => editor.set(`${base}.showInTaskbar`, checked)}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <TextField label="Display name" {...editor.field(`${base}.name`)} />
                  {builtin ? (
                    <div>
                      <p className="adm-label">ID</p>
                      <p className="adm-input font-mono text-[13px] adm-muted">{app.id}</p>
                      <p className="adm-hint">Built-in apps keep their ID.</p>
                    </div>
                  ) : (
                    <TextField
                      label="ID"
                      {...editor.field(`${base}.id`)}
                      mono
                      hint="Used by terminal commands that open apps."
                    />
                  )}
                </div>

                {app.kind === "browser" && (
                  <RouteSelect
                    label="Start page"
                    value={app.url}
                    onChange={(url) => editor.set(`${base}.url`, url || undefined)}
                    error={editor.issue(`${base}.url`)}
                    hint="What Firefox shows when opened from the desktop."
                  />
                )}
                {app.kind === "route" && (
                  <RouteSelect value={app.url} onChange={(url) => editor.set(`${base}.url`, url)} error={editor.issue(`${base}.url`)} />
                )}
                {app.kind === "link" && (
                  <TextField label="Link URL" type="url" {...editor.field(`${base}.url`)} placeholder="https://…" hint="Opens in a new browser tab." />
                )}

                <IconPicker value={app.icon} onChange={(icon) => editor.set(`${base}.icon`, icon)} error={editor.issue(`${base}.icon`)} />
              </ItemCard>
            );
          }}
        </SortableList>
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
