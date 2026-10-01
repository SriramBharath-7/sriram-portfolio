import { getSupabaseBrowserClient } from "./browser";
import { getSupabaseEnv } from "./env";
import {
  CERTIFICATE_BUCKET,
  CERTIFICATE_IMAGE_TYPES,
  CERTIFICATE_MAX_BYTES,
  encodeStoragePath,
  publicUrlFor,
} from "./storage";

const EXTENSIONS: Record<(typeof CERTIFICATE_IMAGE_TYPES)[number], string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

/** Returns a user-facing problem with the file, or null when it can be uploaded. */
export function validateImageFile(file: File): string | null {
  if (!(CERTIFICATE_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return "Use a PNG, JPEG or WebP image.";
  }
  if (file.size === 0) return "That file is empty.";
  if (file.size > CERTIFICATE_MAX_BYTES) {
    return `Images must be ${CERTIFICATE_MAX_BYTES / (1024 * 1024)} MB or smaller.`;
  }
  return null;
}

function uploadError(status: number, body: string): Error {
  // Storage reports policy failures as HTTP 400 with a statusCode in the body.
  let code = status;
  let detail = "";
  try {
    const parsed = JSON.parse(body) as { statusCode?: string | number; message?: string };
    code = Number(parsed.statusCode ?? status) || status;
    detail = parsed.message ?? "";
  } catch {
    // Non-JSON body: fall back to the HTTP status.
  }

  if (code === 401) return new Error("Your session has expired. Sign in again.");
  if (code === 403 || /row-level security/i.test(detail)) {
    return new Error("Upload refused: your account is not in admin_users (see the setup guide).");
  }
  if (code === 413) return new Error("That image is larger than the storage limit.");
  if (code === 415 || /mime/i.test(detail)) return new Error("Storage rejected this file type.");
  return new Error(detail ? `Upload failed: ${detail}` : `Upload failed (HTTP ${status}).`);
}

/**
 * Uploads a certificate image straight from the browser to Supabase Storage,
 * authenticated as the signed-in admin, with real progress events. Storage
 * policies (admin only) are the enforcement; this only fails fast and
 * explains errors.
 */
export async function uploadCertificateImage(
  file: File,
  opts: { certId: string; onProgress?: (percent: number) => void }
): Promise<{ url: string; path: string }> {
  const problem = validateImageFile(file);
  if (problem) throw new Error(problem);

  const { url, anonKey } = getSupabaseEnv();
  const { data } = await getSupabaseBrowserClient().auth.getSession();
  const token = data.session?.access_token;
  if (!token) throw new Error("Your session has expired. Sign in again.");

  const slug = opts.certId.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").slice(0, 60) || "certificate";
  const extension = EXTENSIONS[file.type as keyof typeof EXTENSIONS];
  const path = `certs/${slug}-${Date.now()}.${extension}`;

  // Same multipart shape supabase-js uses for a File body.
  const form = new FormData();
  form.append("cacheControl", "31536000");
  form.append("", file);

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}/storage/v1/object/${CERTIFICATE_BUCKET}/${encodeStoragePath(path)}`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("apikey", anonKey);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        opts.onProgress?.(Math.min(99, Math.round((event.loaded / event.total) * 100)));
      }
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(uploadError(xhr.status, xhr.responseText));
    xhr.onerror = () => reject(new Error("Network error while uploading. Check your connection."));
    xhr.onabort = () => reject(new Error("Upload cancelled."));
    xhr.send(form);
  });

  opts.onProgress?.(100);
  return { url: publicUrlFor(path, url), path };
}
