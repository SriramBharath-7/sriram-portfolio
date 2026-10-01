"use client";

import type { AppConfig, CommandResponse, ContentSection, CustomCommand } from "@/content/types";
import { CONTENT_SECTIONS } from "@/content/schema";
import { Badge, Button, Card, EmptyState, Notice, SelectField, TextAreaField, TextField, Toggle } from "../ui";
import { ItemCard, StringListEditor, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import { useDocumentEditor } from "../useDocumentEditor";
import { RouteSelect } from "./shared";

const RESPONSE_TYPES: { value: CommandResponse["type"]; label: string }[] = [
  { value: "text", label: "Print text" },
  { value: "content", label: "Print a portfolio section" },
  { value: "route", label: "Open a page in Firefox" },
  { value: "app", label: "Open a desktop app" },
  { value: "url", label: "Open an external link" },
];

const SECTION_LABELS: Record<ContentSection, string> = {
  about: "About",
  skills: "Skills",
  education: "Education",
  certifications: "Certifications list",
  ctf: "CTF focus",
  tools: "Security tools",
  contact: "Contact details",
  whoami: "whoami card",
};

function defaultResponse(type: CommandResponse["type"], apps: AppConfig[]): CommandResponse {
  switch (type) {
    case "text":
      return { type, text: "" };
    case "content":
      return { type, section: "about" };
    case "route":
      return { type, url: "home://about" };
    case "app":
      return { type, appId: apps[0]?.id ?? "firefox" };
    case "url":
      return { type, url: "https://" };
  }
}

function describe(response: CommandResponse, apps: AppConfig[]): string {
  switch (response.type) {
    case "text":
      return response.text ? response.text.split("\n")[0] : "Prints nothing yet";
    case "content":
      return `Prints the ${SECTION_LABELS[response.section]} section`;
    case "route":
      return `Opens Firefox at ${response.url}`;
    case "app":
      return `Opens ${apps.find((app) => app.id === response.appId)?.name ?? response.appId}`;
    case "url":
      return `Opens ${response.url} in a new tab`;
  }
}

function Preview({ command, apps }: { command: CustomCommand; apps: AppConfig[] }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[#06080d] px-4 py-3 font-mono text-[12.5px] leading-relaxed">
      <div>
        <span className="text-[#5aa9ff]">┌──(</span>
        <span className="text-[#5aa9ff] font-bold">kali㉿kali</span>
        <span className="text-[#5aa9ff]">)-[</span>
        <span className="text-white font-semibold">~</span>
        <span className="text-[#5aa9ff]">]</span>
      </div>
      <div>
        <span className="text-[#5aa9ff] font-bold">└─$</span> <span className="text-[#d6dae2]">{command.name || "command"}</span>
      </div>
      <div className="text-[#8b93a3] whitespace-pre-wrap">
        {command.response.type === "text" ? command.response.text || " " : describe(command.response, apps)}
      </div>
    </div>
  );
}

export default function CommandsEditor({
  commands,
  apps,
  reserved,
}: {
  commands: CustomCommand[];
  apps: AppConfig[];
  /** Built-in command names and aliases; custom commands may not reuse them. */
  reserved: string[];
}) {
  const editor = useDocumentEditor<CustomCommand[]>({ docKey: "commands", label: "Commands", initial: commands });
  const list = editor.list<CustomCommand>("");
  const open = useOpenItem();
  const reservedSet = new Set(reserved);
  const appOptions = apps.map((app) => ({ value: app.id, label: `${app.name}${app.enabled ? "" : " (disabled)"}` }));

  const reservedError = (name: string) =>
    reservedSet.has(name.trim().toLowerCase()) ? `"${name}" is a built-in command` : undefined;

  const add = () => {
    list.add({
      id: "",
      name: "",
      aliases: [],
      description: "",
      help: "",
      enabled: true,
      response: { type: "text", text: "" },
    });
    open.open(String(list.items.length));
  };

  return (
    <div className="space-y-5">
      <Notice tone="accent" title="Safe by design">
        Custom commands are declarative: they print text or content, or open a page, app or link. Nothing you
        enter here is executed as code, and built-in commands like ls, cd and cat cannot be replaced.
      </Notice>

      <Card
        title="Custom commands"
        description="Listed under “Custom” in help, with tab completion. Run name --help to see the help text."
        actions={
          <Button size="sm" variant="primary" icon="plus" onClick={add}>
            New command
          </Button>
        }
      >
        {list.items.length === 0 ? (
          <EmptyState
            icon="commands"
            title="No custom commands"
            description="Create shortcuts like resume, github or quote without writing code."
            action={<Button icon="plus" onClick={add}>New command</Button>}
          />
        ) : (
          <div className="space-y-2.5">
            {list.items.map((command, index) => {
              const base = String(index);
              const nameError = editor.issue(`${base}.name`) ?? editor.issue(`${base}.id`) ?? reservedError(command.name);
              const aliasesError =
                editor.issue(`${base}.aliases`) ??
                command.aliases.map(reservedError).find(Boolean);
              return (
                <ItemCard
                  key={index}
                  title={<span className="font-mono">{command.name || "new-command"}</span>}
                  subtitle={command.description || describe(command.response, apps)}
                  badges={command.enabled ? <Badge tone="success">Enabled</Badge> : <Badge>Disabled</Badge>}
                  open={open.isOpen(base)}
                  onToggle={() => open.toggle(base)}
                  onDelete={() => list.remove(index)}
                  deleteConfirm={`Delete the ${command.name || "new"} command?`}
                  errorCount={editor.issuesUnder(base) || (reservedError(command.name) ? 1 : 0)}
                >
                  <Toggle
                    label="Enabled"
                    description="Disabled commands are kept but not available in the terminal."
                    checked={command.enabled}
                    onChange={(checked) => editor.set(`${base}.enabled`, checked)}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextField
                      label="Command name"
                      value={command.name}
                      onChange={(value) => {
                        const name = value.toLowerCase().replace(/\s+/g, "");
                        editor.set(`${base}.name`, name);
                        editor.set(`${base}.id`, name);
                      }}
                      error={nameError}
                      placeholder="e.g. resume"
                      mono
                    />
                    <TextField label="Description" {...editor.field(`${base}.description`)} placeholder="e.g. Open my résumé" hint="One line, shown by help." />
                  </div>

                  <StringListEditor
                    label="Aliases"
                    items={command.aliases}
                    onChange={(items) => editor.set(`${base}.aliases`, items.map((item) => item.toLowerCase().replace(/\s+/g, "")))}
                    error={aliasesError}
                    itemErrors={(i) => editor.issue(`${base}.aliases.${i}`)}
                    placeholder="Add an alias and press Enter"
                    mono
                  />

                  <TextAreaField
                    label="Help text (optional)"
                    rows={2}
                    {...editor.field(`${base}.help`)}
                    hint={`Printed by: ${command.name || "name"} --help`}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <SelectField
                      label="What it does"
                      value={command.response.type}
                      onChange={(type) =>
                        editor.set(`${base}.response`, defaultResponse(type as CommandResponse["type"], apps))
                      }
                      options={RESPONSE_TYPES}
                    />
                    {command.response.type === "content" && (
                      <SelectField
                        label="Section"
                        value={command.response.section}
                        onChange={(section) => editor.set(`${base}.response.section`, section)}
                        options={CONTENT_SECTIONS.map((section) => ({ value: section, label: SECTION_LABELS[section] }))}
                        error={editor.issue(`${base}.response.section`)}
                      />
                    )}
                    {command.response.type === "route" && (
                      <RouteSelect
                        value={command.response.url}
                        onChange={(url) => editor.set(`${base}.response.url`, url)}
                        error={editor.issue(`${base}.response.url`)}
                      />
                    )}
                    {command.response.type === "app" && (
                      <SelectField
                        label="App"
                        value={command.response.appId}
                        onChange={(appId) => editor.set(`${base}.response.appId`, appId)}
                        options={appOptions}
                        error={editor.issue(`${base}.response.appId`)}
                      />
                    )}
                    {command.response.type === "url" && (
                      <TextField
                        label="URL"
                        type="url"
                        {...editor.field(`${base}.response.url`)}
                        placeholder="https://… or mailto:…"
                      />
                    )}
                  </div>
                  {command.response.type === "text" && (
                    <TextAreaField label="Text to print" rows={4} mono {...editor.field(`${base}.response.text`)} />
                  )}

                  <div>
                    <p className="adm-label">Preview</p>
                    <Preview command={command} apps={apps} />
                  </div>
                </ItemCard>
              );
            })}
          </div>
        )}
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
