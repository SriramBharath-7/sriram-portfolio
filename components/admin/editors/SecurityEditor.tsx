"use client";

import type { CtfContent, ToolsContent } from "@/content/types";
import { Card, TextAreaField, TextField } from "../ui";
import { StringListEditor } from "../lists";
import { SaveBar } from "../SaveBar";
import { useDocumentEditor } from "../useDocumentEditor";

export default function SecurityEditor({ ctf, tools }: { ctf: CtfContent; tools: ToolsContent }) {
  const ctfEditor = useDocumentEditor<CtfContent>({ docKey: "ctf", label: "CTF", initial: ctf });
  const toolsEditor = useDocumentEditor<ToolsContent>({ docKey: "tools", label: "Tools", initial: tools });

  return (
    <div className="adm-stack">
      <Card doc="ctf" icon="security" title="CTF & writeups" description="The ctf command and ~/writeups/ctf.txt.">
        <div className="flex flex-col gap-6">
          <div className="adm-form-grid">
            <TextField label="Headline" {...ctfEditor.field("headline")} />
            <TextField label="Intro line" {...ctfEditor.field("intro")} placeholder="e.g. Currently learning and participating in:" />
          </div>
          <StringListEditor
            label="Focus areas"
            items={ctfEditor.value.focusAreas}
            onChange={(items) => ctfEditor.set("focusAreas", items)}
            itemErrors={(i) => ctfEditor.issue(`focusAreas.${i}`)}
            placeholder="Add a focus area and press Enter"
          />
          <TextAreaField label="Closing line (optional)" rows={2} {...ctfEditor.field("closing")} />
        </div>
      </Card>

      <Card doc="tools" icon="apps" title="Security tools & learning projects" description="The Tools page in Firefox, the tools command and tools.txt.">
        <div className="flex flex-col gap-6">
          <div className="adm-form-grid">
            <TextField label="Headline" {...toolsEditor.field("headline")} />
            <TextField label="Intro line" {...toolsEditor.field("intro")} placeholder="e.g. Learning and experimenting with:" />
          </div>
          <StringListEditor
            label="Items"
            items={toolsEditor.value.items}
            onChange={(items) => toolsEditor.set("items", items)}
            itemErrors={(i) => toolsEditor.issue(`items.${i}`)}
            placeholder="Add a tool or project and press Enter"
          />
          <TextAreaField label="Closing line (optional)" rows={2} {...toolsEditor.field("closing")} />
        </div>
      </Card>

      <SaveBar editors={[ctfEditor, toolsEditor]} />
    </div>
  );
}
