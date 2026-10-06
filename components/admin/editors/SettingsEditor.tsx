"use client";

import type { BlogConfig, SiteSettings } from "@/content/types";
import { Card, TextAreaField, TextField, Toggle } from "../ui";
import { StringListEditor } from "../lists";
import { SaveBar } from "../SaveBar";
import { useDocumentEditor } from "../useDocumentEditor";

export default function SettingsEditor({ settings, blog }: { settings: SiteSettings; blog: BlogConfig }) {
  const editor = useDocumentEditor<SiteSettings>({ docKey: "settings", label: "Settings", initial: settings });
  const blogEditor = useDocumentEditor<BlogConfig>({ docKey: "blog", label: "Blog", initial: blog });
  const welcome = editor.value.welcome;

  return (
    <div className="adm-stack">
      <Card doc="settings.welcome" icon="overview" title="Welcome popup" description="The card shown in the middle of the desktop after the boot screen.">
        <div className="flex flex-col gap-5">
          <Toggle
            label="Show the welcome popup"
            checked={welcome.enabled}
            onChange={(checked) => editor.set("welcome.enabled", checked)}
          />
          <div className="adm-form-grid">
            <TextField label="Title" {...editor.field("welcome.title")} />
            <TextField label="Box heading" {...editor.field("welcome.heading")} />
            <TextAreaField
              label="Message"
              className="adm-col-full"
              rows={2}
              {...editor.field("welcome.message")}
              hint="Wrap words in **double asterisks** to highlight them and `backticks` for a command."
            />
            <TextField label="Call to action" {...editor.field("welcome.callToAction")} />
            <TextField
              label="Auto-close after (seconds)"
              type="number"
              value={String(welcome.autoCloseSeconds)}
              onChange={(value) => editor.set("welcome.autoCloseSeconds", value === "" ? 0 : Number(value))}
              error={editor.issue("welcome.autoCloseSeconds")}
              hint="Between 2 and 30."
            />
          </div>
        </div>
      </Card>

      <Card doc="settings.boot" icon="server" title="Boot screen" description="Status lines that rotate above the circular loader.">
        <StringListEditor
          label="Loading messages"
          items={editor.value.boot.messages}
          onChange={(items) => editor.set("boot.messages", items)}
          error={editor.issue("boot.messages")}
          itemErrors={(i) => editor.issue(`boot.messages.${i}`)}
        />
      </Card>

      <Card doc="settings.terminal" icon="commands" title="Terminal" description="Lines printed when a terminal window opens.">
        <StringListEditor
          label="Message of the day"
          items={editor.value.terminal.motd}
          onChange={(items) => editor.set("terminal.motd", items)}
          itemErrors={(i) => editor.issue(`terminal.motd.${i}`)}
          placeholder="Add a line and press Enter"
          mono
        />
      </Card>

      <Card doc="settings.githubWidget" icon="star" title="GitHub widget" description="The “Star on GitHub” button in the bottom-right corner of the desktop.">
        <div className="flex flex-col gap-5">
          <Toggle
            label="Show the widget"
            checked={editor.value.githubWidget.enabled}
            onChange={(checked) => editor.set("githubWidget.enabled", checked)}
          />
          <div className="adm-form-grid">
            <TextField label="Label" {...editor.field("githubWidget.label")} />
            <TextField label="Caption" {...editor.field("githubWidget.caption")} />
            <TextField label="Link" type="url" className="adm-col-full" {...editor.field("githubWidget.url")} mono />
          </div>
        </div>
      </Card>

      <Card doc="blog" icon="globe" title="Blog sources" description="The Blogs page merges posts from both accounts.">
        <div className="adm-form-grid">
          <TextField label="DEV.to username" {...blogEditor.field("devtoUsername")} mono />
          <TextField label="Medium handle" {...blogEditor.field("mediumHandle")} placeholder="e.g. @you" mono />
        </div>
      </Card>

      <SaveBar editors={[editor, blogEditor]} />
    </div>
  );
}
