"use client";

import { useRef, useState } from "react";
import { uploadCertificateImage, validateImageFile } from "@/lib/supabase/upload";
import { Icon } from "./icons";
import { useFeedback } from "./feedback";

/**
 * Certificate image picker: uploads straight to Supabase Storage with real
 * progress, or accepts an existing /public path or https URL.
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [broken, setBroken] = useState(false);

  const upload = async (file: File) => {
    const problem = validateImageFile(file);
    if (problem) {
      setUploadError(problem);
      return;
    }
    setUploadError(null);
    setProgress(0);
    try {
      const result = await uploadCertificateImage(file, { certId, onProgress: setProgress });
      setBroken(false);
      onChange(result.url);
      toast("Image uploaded. Save to publish it.");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const uploading = progress !== null;

  return (
    <div>
      <p className="adm-label">Certificate image</p>
      <div className="grid sm:grid-cols-[220px_1fr] gap-4 items-start">
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragOver(false);
            const file = event.dataTransfer.files?.[0];
            if (file && !uploading) void upload(file);
          }}
          className={`aspect-[4/3] rounded-lg border bg-[#0b0f16] flex items-center justify-center overflow-hidden ${
            dragOver ? "border-[var(--accent)]" : error ? "border-[var(--danger)]" : "border-[var(--border-strong)]"
          }`}
        >
          {value && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Certificate preview" className="w-full h-full object-contain p-2" onError={() => setBroken(true)} />
          ) : (
            <div className="text-center px-3 adm-faint text-[12px]">
              <Icon name="upload" size={22} className="mx-auto mb-1.5" />
              {broken ? "Image could not be loaded" : "Drop an image here"}
            </div>
          )}
        </div>

        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void upload(file);
              }}
            />
            <button type="button" className="adm-btn" onClick={() => inputRef.current?.click()} disabled={uploading}>
              <Icon name="upload" size={16} />
              {value ? "Replace image" : "Upload image"}
            </button>
          </div>

          {uploading && (
            <div aria-live="polite">
              <div className="flex justify-between text-[12px] adm-muted mb-1">
                <span>Uploading…</span>
                <span>{progress}%</span>
              </div>
              <div className="adm-progress" role="progressbar" aria-valuenow={progress ?? 0} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {uploadError && (
            <p role="alert" className="text-[12.5px] text-[#ff9aa4] bg-[var(--danger-soft)] border border-[rgba(239,97,112,0.35)] rounded-lg px-3 py-2">
              {uploadError}
            </p>
          )}

          <div>
            <label className="adm-label" htmlFor={`image-path-${certId}`}>
              Or image path / URL
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
              className="adm-input font-mono text-[12.5px]"
            />
            {error ? (
              <p className="adm-error">{error}</p>
            ) : (
              <p className="adm-hint">PNG, JPEG or WebP up to 5 MB. Aspect ratio is preserved on the site.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
