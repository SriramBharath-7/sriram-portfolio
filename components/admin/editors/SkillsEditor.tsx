"use client";

import type { SkillGroup, SkillItem, Skills } from "@/content/types";
import { Button, Card, EmptyLine, TextField } from "../ui";
import { ItemCard, SortableList, StringListEditor, SubItem, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import { uniqueId, useDocumentEditor, type DocumentEditor } from "../useDocumentEditor";
import { HighlightSelect } from "./shared";

function SkillItems({ editor, groupIndex }: { editor: DocumentEditor<Skills>; groupIndex: number }) {
  const path = `groups.${groupIndex}.items`;
  const items = editor.list<SkillItem>(path);

  return (
    <div>
      <p className="adm-label">Skills in this group</p>
      {items.items.length > 0 && (
        <SortableList items={items.items} getKey={(_, index) => String(index)} onMove={items.move} tight className="mb-3">
          {(item, index, controls) => (
            <SubItem
              controls={controls}
              invalid={editor.issuesUnder(`${path}.${index}`) > 0}
              onRemove={() => items.remove(index)}
              removeLabel="Remove skill"
            >
              <div className="adm-subgrid">
                <TextField label="Name" {...editor.field(`${path}.${index}.name`)} />
                <TextField label="Description (optional)" {...editor.field(`${path}.${index}.description`)} />
                <HighlightSelect
                  value={item.highlightClass}
                  onChange={(value) => editor.set(`${path}.${index}.highlightClass`, value)}
                  error={editor.issue(`${path}.${index}.highlightClass`)}
                />
              </div>
            </SubItem>
          )}
        </SortableList>
      )}
      <Button
        size="sm"
        icon="plus"
        onClick={() => {
          const taken = editor.value.groups.flatMap((group) => group.items.map((skill) => skill.id));
          items.add({ id: uniqueId("skill", taken, "skill"), name: "", description: "" });
        }}
      >
        Add skill
      </Button>
    </div>
  );
}

export default function SkillsEditor({ skills }: { skills: Skills }) {
  const editor = useDocumentEditor<Skills>({ docKey: "skills", label: "Skills", initial: skills });
  const groups = editor.list<SkillGroup>("groups");
  const open = useOpenItem();

  return (
    <div className="adm-stack">
      <Card doc="skills" icon="layers" title="Page">
        <div className="adm-form-grid">
          <TextField label="Headline" {...editor.field("headline")} />
          <TextField label="Intro line" {...editor.field("intro")} placeholder="e.g. Learning and practicing:" />
        </div>
      </Card>

      <Card
        doc="skills.groups"
        icon="skills"
        title="Skill groups"
        description="For example Languages, Cybersecurity areas, Tools & technologies, Currently learning."
        actions={
          <Button
            size="sm"
            icon="plus"
            onClick={() => {
              const id = uniqueId("group", groups.items.map((group) => group.id), "group");
              groups.add({ id, title: "", items: [] });
              open.open(String(groups.items.length));
            }}
          >
            Add group
          </Button>
        }
      >
        {groups.items.length === 0 && <EmptyLine>No groups yet.</EmptyLine>}
        <SortableList
          items={groups.items}
          getKey={(_, index) => String(index)}
          onMove={(from, to) => {
            groups.move(from, to);
            open.open(String(to));
          }}
        >
          {(group, index, controls) => (
            <ItemCard
              title={group.title || "Untitled group"}
              subtitle={`${group.items.length} skill${group.items.length === 1 ? "" : "s"}`}
              controls={controls}
              open={open.isOpen(String(index))}
              onToggle={() => open.toggle(String(index))}
              onDelete={() => groups.remove(index)}
              deleteConfirm={`Delete the “${group.title || "untitled"}” group and its skills?`}
              errorCount={editor.issuesUnder(`groups.${index}`)}
            >
              <TextField label="Group title" {...editor.field(`groups.${index}.title`)} placeholder="e.g. Languages & Scripting" />
              <SkillItems editor={editor} groupIndex={index} />
            </ItemCard>
          )}
        </SortableList>
      </Card>

      <Card doc="skills.interests" icon="activity" title="Areas of interest" description="Chips on the Skills page; also the Focus line in neofetch.">
        <StringListEditor
          label="Interests"
          items={editor.value.interests}
          onChange={(items) => editor.set("interests", items)}
          itemErrors={(i) => editor.issue(`interests.${i}`)}
          placeholder="Add an interest and press Enter"
        />
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
