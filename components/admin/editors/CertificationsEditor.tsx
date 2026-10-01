"use client";

import type { Certification } from "@/content/types";
import { Badge, Button, Card, EmptyState, TextAreaField, TextField } from "../ui";
import { ItemCard, SortableList, useOpenItem } from "../lists";
import { SaveBar } from "../SaveBar";
import ImageUpload from "../ImageUpload";
import { uniqueId, useDocumentEditor } from "../useDocumentEditor";
import { preview } from "./shared";

const PLACEHOLDER_ID = /^certification(-\d+)?$/;

function today(): string {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function Thumb({ src }: { src: string }) {
  return (
    <span className="w-14 h-10 rounded-md border border-[var(--border)] bg-[#0b0f16] overflow-hidden flex items-center justify-center flex-shrink-0">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="w-full h-full object-contain p-0.5" />
      ) : (
        <span className="text-[10px] adm-faint">No image</span>
      )}
    </span>
  );
}

export default function CertificationsEditor({ certifications }: { certifications: Certification[] }) {
  const editor = useDocumentEditor<Certification[]>({
    docKey: "certifications",
    label: "Certifications",
    initial: certifications,
  });
  const certs = editor.list<Certification>("");
  const open = useOpenItem();

  const addCertification = () => {
    const id = uniqueId("certification", certs.items.map((cert) => cert.id), "certification");
    certs.add({
      id,
      title: "",
      provider: "",
      status: "Completed",
      completed: today(),
      description: "",
      image: "",
      credentialUrl: "",
    });
    open.open(String(certs.items.length));
  };

  return (
    <div className="space-y-5">
      <Card
        title="Certificates"
        description="Shown as cards in Firefox (Certifications) and as files in ~/certifications in the terminal."
        actions={
          <Button size="sm" variant="primary" icon="plus" onClick={addCertification}>
            Add certificate
          </Button>
        }
      >
        {certs.items.length === 0 ? (
          <EmptyState
            icon="certifications"
            title="No certificates yet"
            description="Add your first certificate and upload its image."
            action={
              <Button variant="primary" icon="plus" onClick={addCertification}>
                Add certificate
              </Button>
            }
          />
        ) : (
          <SortableList
            items={certs.items}
            getKey={(_, index) => String(index)}
            onMove={(from, to) => {
              certs.move(from, to);
              open.open(String(to));
            }}
          >
            {(cert, index, controls) => {
              const base = String(index);
              return (
                <ItemCard
                  title={cert.title || "Untitled certificate"}
                  subtitle={[cert.provider, cert.completed || cert.issued, preview(cert.description, 60)]
                    .filter(Boolean)
                    .join(" · ")}
                  leading={<Thumb src={cert.image} />}
                  badges={<Badge tone={cert.status.toLowerCase() === "completed" ? "success" : "neutral"}>{cert.status || "—"}</Badge>}
                  controls={controls}
                  open={open.isOpen(base)}
                  onToggle={() => open.toggle(base)}
                  onDelete={() => certs.remove(index)}
                  deleteConfirm={`Delete “${cert.title || "this certificate"}”?`}
                  errorCount={editor.issuesUnder(base)}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2" onBlur={() => {
                      // New certificates take their terminal file name from the title.
                      if (cert.title.trim() && PLACEHOLDER_ID.test(cert.id)) {
                        const taken = certs.items.filter((_, i) => i !== index).map((item) => item.id);
                        editor.set(`${base}.id`, uniqueId(cert.title, taken, "certification"));
                      }
                    }}>
                      <TextField label="Title" {...editor.field(`${base}.title`)} placeholder="e.g. CompTIA Security+" />
                    </div>
                    <TextField label="Provider / issuer" {...editor.field(`${base}.provider`)} placeholder="e.g. CompTIA" />
                    <div>
                      <TextField label="Status" {...editor.field(`${base}.status`)} placeholder="e.g. Completed" />
                      <div className="flex gap-1.5 mt-2">
                        {["Completed", "In progress", "Planned"].map((status) => (
                          <button
                            key={status}
                            type="button"
                            className="adm-badge hover:text-[var(--text)]"
                            onClick={() => editor.set(`${base}.status`, status)}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                    <TextField label="Completed" type="date" {...editor.field(`${base}.completed`)} />
                    <TextField label="Issued (optional)" type="date" {...editor.field(`${base}.issued`)} />
                    <TextField label="Expires (optional)" type="date" {...editor.field(`${base}.expires`)} />
                    <TextField
                      label="Certificate link (optional)"
                      type="url"
                      {...editor.field(`${base}.credentialUrl`)}
                      placeholder="https://www.credly.com/badges/…"
                    />
                    <TextAreaField label="Description" className="sm:col-span-2" rows={3} {...editor.field(`${base}.description`)} />
                  </div>

                  <ImageUpload
                    value={cert.image}
                    certId={cert.id}
                    onChange={(url) => editor.set(`${base}.image`, url)}
                    error={editor.issue(`${base}.image`)}
                  />

                  <TextField
                    label="Terminal file name"
                    {...editor.field(`${base}.id`)}
                    hint={`Appears as ~/certifications/${cert.id || "…"}.txt`}
                    mono
                  />
                </ItemCard>
              );
            }}
          </SortableList>
        )}
      </Card>

      <SaveBar editors={[editor]} />
    </div>
  );
}
