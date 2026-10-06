"use client";

import type { About, AboutBullet, AboutSection, Profile } from "@/content/types";
import { Button, Card, TextAreaField, TextField } from "../ui";
import { ItemCard, SortableList, SubItem, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import { uniqueId, useDocumentEditor, type DocumentEditor } from "../useDocumentEditor";
import { HighlightSelect, preview } from "./shared";

type Identity = Omit<Profile, "socials">;

function BulletsEditor({
  editor,
  path,
}: {
  editor: DocumentEditor<About>;
  path: string;
}) {
  const bullets = editor.list<AboutBullet>(path);

  return (
    <div>
      <p className="adm-label">Bullet points</p>
      {bullets.items.length > 0 && (
        <SortableList items={bullets.items} getKey={(_, index) => String(index)} onMove={bullets.move} tight className="mb-3">
          {(bullet, index, controls) => (
            <SubItem
              controls={controls}
              invalid={editor.issuesUnder(`${path}.${index}`) > 0}
              onRemove={() => bullets.remove(index)}
              removeLabel="Remove bullet"
            >
              <div className="adm-subgrid">
                <TextField label="Label" {...editor.field(`${path}.${index}.label`)} />
                <TextField label="Description (optional)" {...editor.field(`${path}.${index}.description`)} />
                <HighlightSelect
                  value={bullet.highlightClass}
                  onChange={(value) => editor.set(`${path}.${index}.highlightClass`, value)}
                  error={editor.issue(`${path}.${index}.highlightClass`)}
                />
              </div>
            </SubItem>
          )}
        </SortableList>
      )}
      <Button size="sm" icon="plus" onClick={() => bullets.add({ label: "" })}>
        Add bullet
      </Button>
    </div>
  );
}

export default function ProfileEditor({ profile, about }: { profile: Profile; about: About }) {
  const { socials: _socials, ...identity } = profile;
  const identityEditor = useDocumentEditor<Identity>({
    docKey: "profile",
    label: "Profile",
    initial: identity,
    base: profile,
  });
  const aboutEditor = useDocumentEditor<About>({ docKey: "about", label: "About", initial: about });
  const sections = aboutEditor.list<AboutSection>("sections");
  const open = useOpenItem();

  const addSection = () => {
    const id = uniqueId("section", sections.items.map((section) => section.id), "section");
    sections.add({ id, title: "", body: "" });
    open.open(String(sections.items.length));
  };

  return (
    <div className="adm-stack">
      <Card doc="profile" icon="profile" title="Identity" description="Used by whoami, neofetch, the Start page, About page and about.txt.">
        <div className="adm-form-grid">
          <TextField label="Name" {...identityEditor.field("name")} />
          <TextField label="Role" {...identityEditor.field("role")} placeholder="e.g. College Student (CSE)" />
          <TextAreaField
            label="Tagline"
            className="adm-col-full"
            rows={2}
            {...identityEditor.field("tagline")}
            hint="One line under your name on the Firefox start page."
          />
          <TextField label="Status" {...identityEditor.field("status")} hint="Shown by whoami." />
          <TextField label="Email" type="email" {...identityEditor.field("email")} hint="Used by contact and neofetch." />
          <TextField
            label="GitHub username"
            {...identityEditor.field("githubUsername")}
            hint="Drives the live Projects page and neofetch."
            mono
          />
        </div>
      </Card>

      <Card
        doc="about"
        icon="layers"
        title="About"
        description="The About page in Firefox, the about command and about.txt all render these sections."
        actions={
          <Button size="sm" icon="plus" onClick={addSection}>
            Add section
          </Button>
        }
      >
        <TextField
          label="Headline"
          {...aboutEditor.field("headline")}
          hint="Shown at the top of the About page and the about command."
          className="mb-6"
        />

        <SortableList
          items={sections.items}
          getKey={(_, index) => String(index)}
          onMove={(from, to) => {
            sections.move(from, to);
            open.open(String(to));
          }}
        >
          {(section, index, controls) => {
            const base = `sections.${index}`;
            const bulletCount = section.bullets?.length ?? 0;
            return (
              <ItemCard
                title={section.title || "Untitled section"}
                subtitle={
                  section.body
                    ? preview(section.body)
                    : bulletCount > 0
                    ? `${bulletCount} bullet point${bulletCount === 1 ? "" : "s"}`
                    : "Empty"
                }
                controls={controls}
                open={open.isOpen(String(index))}
                onToggle={() => open.toggle(String(index))}
                onDelete={() => sections.remove(index)}
                deleteConfirm={`Delete the “${section.title || "untitled"}” section?`}
                errorCount={aboutEditor.issuesUnder(base)}
              >
                <TextField label="Title" {...aboutEditor.field(`${base}.title`)} placeholder="e.g. ABOUT ME" />
                <TextAreaField
                  label="Paragraph (optional)"
                  rows={4}
                  {...aboutEditor.field(`${base}.body`)}
                  hint="Use a paragraph, bullet points, or both."
                />
                <BulletsEditor editor={aboutEditor} path={`${base}.bullets`} />
              </ItemCard>
            );
          }}
        </SortableList>
      </Card>

      <SaveBar editors={[identityEditor, aboutEditor]} />
    </div>
  );
}
