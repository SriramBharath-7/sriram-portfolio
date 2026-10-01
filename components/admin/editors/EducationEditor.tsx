"use client";

import type { Education, EducationEntry, EducationGoal } from "@/content/types";
import { Button, Card, TextAreaField, TextField } from "../ui";
import { ItemCard, SortableList, StringListEditor, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import { uniqueId, useDocumentEditor } from "../useDocumentEditor";
import { preview } from "./shared";

export default function EducationEditor({ education }: { education: Education }) {
  const editor = useDocumentEditor<Education>({ docKey: "education", label: "Education", initial: education });
  const entries = editor.list<EducationEntry>("entries");
  const goals = editor.list<EducationGoal>("goals");
  const openEntry = useOpenItem();
  const openGoal = useOpenItem();

  return (
    <div className="space-y-5">
      <Card title="Page">
        <TextField label="Headline" {...editor.field("headline")} hint="Title of the Education page and education.txt." />
      </Card>

      <Card
        title="Education entries"
        description="Degrees, schools and courses, in display order."
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => {
              const id = uniqueId("entry", entries.items.map((entry) => entry.id), "entry");
              entries.add({ id, degree: "", institution: "", status: "Currently pursuing", coursework: [], notes: "" });
              openEntry.open(String(entries.items.length));
            }}
          >
            Add entry
          </Button>
        }
      >
        {entries.items.length === 0 && <p className="adm-muted text-[13px]">No entries yet.</p>}
        <SortableList
          items={entries.items}
          getKey={(_, index) => String(index)}
          onMove={(from, to) => {
            entries.move(from, to);
            openEntry.open(String(to));
          }}
        >
          {(entry, index, controls) => {
            const base = `entries.${index}`;
            return (
              <ItemCard
                title={entry.degree || "Untitled entry"}
                subtitle={[entry.institution, entry.status].filter(Boolean).join(" · ")}
                controls={controls}
                open={openEntry.isOpen(String(index))}
                onToggle={() => openEntry.toggle(String(index))}
                onDelete={() => entries.remove(index)}
                deleteConfirm={`Delete “${entry.degree || "this entry"}”?`}
                errorCount={editor.issuesUnder(base)}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <TextField label="Degree / programme" className="sm:col-span-2" {...editor.field(`${base}.degree`)} />
                  <TextField label="Institution (optional)" {...editor.field(`${base}.institution`)} />
                  <TextField label="Status" {...editor.field(`${base}.status`)} placeholder="e.g. Currently pursuing" />
                </div>
                <StringListEditor
                  label="Relevant coursework"
                  items={entry.coursework}
                  onChange={(items) => editor.set(`${base}.coursework`, items)}
                  itemErrors={(i) => editor.issue(`${base}.coursework.${i}`)}
                  placeholder="Add a course and press Enter"
                />
                <TextAreaField label="Notes (optional)" rows={3} {...editor.field(`${base}.notes`)} />
              </ItemCard>
            );
          }}
        </SortableList>
      </Card>

      <Card
        title="Goals"
        description="Certification and learning goals listed under the entries."
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => {
              const id = uniqueId("goal", goals.items.map((goal) => goal.id), "goal");
              goals.add({ id, title: "", description: "" });
              openGoal.open(String(goals.items.length));
            }}
          >
            Add goal
          </Button>
        }
      >
        {goals.items.length === 0 && <p className="adm-muted text-[13px]">No goals yet.</p>}
        <SortableList
          items={goals.items}
          getKey={(_, index) => String(index)}
          onMove={(from, to) => {
            goals.move(from, to);
            openGoal.open(String(to));
          }}
        >
          {(goal, index, controls) => {
            const base = `goals.${index}`;
            return (
              <ItemCard
                title={goal.title || "Untitled goal"}
                subtitle={preview(goal.description)}
                controls={controls}
                open={openGoal.isOpen(String(index))}
                onToggle={() => openGoal.toggle(String(index))}
                onDelete={() => goals.remove(index)}
                deleteConfirm={`Delete “${goal.title || "this goal"}”?`}
                errorCount={editor.issuesUnder(base)}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <TextField label="Goal" {...editor.field(`${base}.title`)} placeholder="e.g. OSCP" />
                  <TextField label="Detail (optional)" {...editor.field(`${base}.description`)} placeholder="e.g. Long-term goal" />
                </div>
              </ItemCard>
            );
          }}
        </SortableList>
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
