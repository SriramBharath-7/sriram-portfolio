"use client";

import { useEffect, useRef, useState } from "react";
import { uploadCertificateImage, validateImageFile } from "@/lib/supabase/upload";
import { Icon } from "./icons";
import { useFeedback } from "./feedback";
import { Badge, Button, Notice } from "./ui";

function formatBytes(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Certificate image picker. The framed preview is also the drop zone: drop or
 * click to upload straight to Supabase Storage with real progress, or type an
 * existing /public path or https URL beside it.
 */
export default function ImageUpload({
  value,
  onChange,
  certId,
  error,
}: {
  value: string;
  onChange: (url: string) => void;
  certId: string;
  error?: string;
}) {
  const { toast } = useFeedback();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [broken, setBroken] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);
  const doneTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(doneTimer.current), []);

  const upload = async (picked: File) => {
    const problem = validateImageFile(picked);
    if (problem) {
      setUploadError(problem);
      return;
    }
    setUploadError(null);
    setFile({ name: picked.name, size: picked.size });
    setProgress(0);
    try {
      const result = await uploadCertificateImage(picked, { certId, onProgress: setProgress });
      setBroken(false);
      onChange(result.url);
      setJustUploaded(true);
      window.clearTimeout(doneTimer.current);
      doneTimer.current = window.setTimeout(() => setJustUploaded(false), 1800);
      toast("Image uploaded. Save to publish it.");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const uploading = progress !== null;
  const hasImage = Boolean(value) && !broken;

  return (
    <div className="adm-field">
      <div className="adm-list-meta">
        <p className="adm-label !mb-0">Certificate image</p>
        <span className="adm-eyebrow">png · jpeg · webp · ≤ 5 MB</span>
      </div>

      <div className="grid gap-5 items-start sm:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]">
        <button
          type="button"
          onClick={() => !uploading && inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!dragOver) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            const dropped = event.dataTransfer.files?.[0];
            if (dropped && !uploading) void upload(dropped);
          }}
          aria-label={hasImage ? "Replace certificate image" : "Upload certificate image"}
          className="adm-drop"
          data-over={dragOver}
          data-invalid={Boolean(error) && !hasImage}
        >
          {hasImage ? (
            <>
              <span className="adm-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="Certificate preview" onError={() => setBroken(true)} />
              </span>
              <span className="adm-drop-hover">
                <Badge tone="accent">
                  <Icon name="upload" size={12} />
                  {dragOver ? "Release to replace" : "Drop or click to replace"}
                </Badge>
              </span>
            </>
          ) : (
            <span className="flex flex-col items-center text-center px-6">
              <span className="adm-empty-icon">
                <Icon name={broken ? "alert" : dragOver ? "upload" : "image"} size={22} />
              </span>
              <span className="mt-4 font-semibold text-[length:var(--fs-sm)]">
                {dragOver ? "Release to upload" : broken ? "Image could not be loaded" : "Drop a certificate image"}
              </span>
              <span className="mt-1 text-[length:var(--fs-xs)] adm-faint">or click to browse</span>
            </span>
          )}

          {uploading && (
            <span className="adm-drop-busy" aria-live="polite">
              <span className="flex items-baseline justify-between gap-3 adm-mono text-[length:var(--fs-xs)]">
                <span className="truncate adm-muted">uploading {file?.name}</span>
                <span className="text-[var(--kali-3)] font-semibold">{progress}%</span>
              </span>
              <span
                className="adm-meter block"
                role="progressbar"
                aria-label="Upload progress"
                aria-valuenow={progress ?? 0}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${progress}%` }} />
              </span>
              <span className="adm-mono text-[length:var(--fs-micro)] adm-faint">→ storage://certificates</span>
            </span>
          )}

          {justUploaded && !uploading && (
            <span className="absolute top-3 right-3 z-[5]" style={{ animation: "adm-pop 320ms var(--spring) both" }}>
              <Badge tone="success">
                <Icon name="check" size={12} />
                Uploaded
              </Badge>
            </span>
          )}
        </button>

        <div className="flex flex-col gap-4 min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => {
              const picked = event.target.files?.[0];
              if (picked) void upload(picked);
            }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button icon="upload" onClick={() => inputRef.current?.click()} disabled={uploading}>
              {hasImage ? "Replace image" : "Upload image"}
            </Button>
            {file && !uploading && !uploadError && (
              <span className="adm-mono text-[length:var(--fs-xs)] adm-faint truncate">
                {file.name} · {formatBytes(file.size)}
              </span>
            )}
          </div>

          {uploadError && (
            <Notice tone="danger" title="Image not uploaded">
              {uploadError}
            </Notice>
          )}

          <div className="adm-field">
            <label className="adm-label" htmlFor={`image-path-${certId}`}>
              Or an image path / URL
            </label>
            <input
              id={`image-path-${certId}`}
              value={value}
              onChange={(event) => {
                setBroken(false);
                onChange(event.target.value);
              }}
              placeholder="/assets/certs/my-cert.png or https://…"
              aria-invalid={error ? true : undefined}
              spellCheck={false}
              className="adm-input adm-input--mono"
            />
            {error ? (
              <p className="adm-error">
                <Icon name="alert" size={14} />
                {error}
              </p>
            ) : (
              <p className="adm-hint">Uploads go to the certificates bucket. The site keeps the image&apos;s aspect ratio.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
