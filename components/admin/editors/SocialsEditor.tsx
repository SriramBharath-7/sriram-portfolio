"use client";

import type { Profile, SocialLink } from "@/content/types";
import { Badge, Button, Card, ChipButton, EmptyState, TextField, Toggle } from "../ui";
import { ItemCard, SortableList, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import { uniqueId, useDocumentEditor } from "../useDocumentEditor";

const PLACEHOLDER_ID = /^link(-\d+)?$/;

const PRESETS: { label: string; url: string }[] = [
  { label: "GitHub", url: "https://github.com/" },
  { label: "LinkedIn", url: "https://linkedin.com/in/" },
  { label: "X", url: "https://x.com/" },
  { label: "TryHackMe", url: "https://tryhackme.com/p/" },
  { label: "Hack The Box", url: "https://app.hackthebox.com/profile/" },
];

export default function SocialsEditor({ profile }: { profile: Profile }) {
  const editor = useDocumentEditor<{ socials: SocialLink[] }>({
    docKey: "profile",
    label: "Socials",
    initial: { socials: profile.socials },
    base: profile,
  });
  const socials = editor.list<SocialLink>("socials");
  const open = useOpenItem();

  const add = (label = "", url = "") => {
    const taken = socials.items.map((social) => social.id);
    const id = label ? uniqueId(label, taken, "link") : uniqueId("link", taken, "link");
    socials.add({ id, label, url, handle: "", enabled: true });
    open.open(String(socials.items.length));
  };

  const presets = PRESETS.filter((preset) => !socials.items.some((social) => social.label === preset.label));

  return (
    <div className="adm-stack">
      <Card
        doc="profile.socials"
        icon="socials"
        title="Links"
        description="Shown on the Firefox start page, by the contact command and in contact.txt. Web links are also bookmarked in Firefox."
        actions={
          <Button size="sm" icon="plus" onClick={() => add()}>
            Add link
          </Button>
        }
      >
        {socials.items.length === 0 ? (
          <EmptyState icon="socials" title="No links yet" action={<Button icon="plus" onClick={() => add()}>Add link</Button>} />
        ) : (
          <SortableList
            items={socials.items}
            getKey={(_, index) => String(index)}
            onMove={(from, to) => {
              socials.move(from, to);
              open.open(String(to));
            }}
          >
            {(social, index, controls) => {
              const base = `socials.${index}`;
              const enabled = social.enabled !== false;
              return (
                <ItemCard
                  title={social.label || "Untitled link"}
                  subtitle={social.handle || social.url}
                  badges={enabled ? <Badge tone="success">Visible</Badge> : <Badge>Hidden</Badge>}
                  controls={controls}
                  open={open.isOpen(String(index))}
                  onToggle={() => open.toggle(String(index))}
                  onDelete={() => socials.remove(index)}
                  deleteConfirm={`Delete the ${social.label || "untitled"} link?`}
                  errorCount={editor.issuesUnder(base)}
                >
                  <Toggle
                    label="Visible on the portfolio"
                    description="Hidden links stay saved but are not shown anywhere."
                    checked={enabled}
                    onChange={(checked) => editor.set(`${base}.enabled`, checked)}
                  />
                  <div className="adm-form-grid">
                    <div
                      onBlur={() => {
                        if (social.label.trim() && PLACEHOLDER_ID.test(social.id)) {
                          const taken = socials.items.filter((_, i) => i !== index).map((item) => item.id);
                          editor.set(`${base}.id`, uniqueId(social.label, taken, "link"));
                        }
                      }}
                    >
                      <TextField label="Label" {...editor.field(`${base}.label`)} placeholder="e.g. GitHub" />
                    </div>
                    <TextField
                      label="Display handle (optional)"
                      {...editor.field(`${base}.handle`)}
                      placeholder="e.g. github.com/you"
                    />
                    <TextField
                      label="URL"
                      className="adm-col-full"
                      {...editor.field(`${base}.url`)}
                      placeholder="https://… or mailto:you@example.com"
                      hint="http(s):// links open in a new tab; mailto: opens the mail client."
                      mono
                    />
                    <TextField
                      label="ID"
                      {...editor.field(`${base}.id`)}
                      mono
                      hint={social.id === "email" ? "The contact command prints your profile email for this one." : "Internal key."}
                    />
                  </div>
                </ItemCard>
              );
            }}
          </SortableList>
        )}

        {presets.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="adm-eyebrow mr-1">Quick add</span>
            {presets.map((preset) => (
              <ChipButton key={preset.label} onClick={() => add(preset.label, preset.url)}>
                + {preset.label}
              </ChipButton>
            ))}
          </div>
        )}
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
