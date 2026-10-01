import { isSupabaseConfigured, getSupabaseEnv } from "./env";

/** Public bucket holding certificate images (created by the migration). */
export const CERTIFICATE_BUCKET = "certificates";
export const CERTIFICATE_MAX_BYTES = 5 * 1024 * 1024;
export const CERTIFICATE_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;

function baseUrlOrNull(): string | null {
  return isSupabaseConfigured() ? getSupabaseEnv().url : null;
}

/** Encodes each path segment, keeping the slashes. */
export function encodeStoragePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function publicPrefix(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/, "")}/storage/v1/object/public/${CERTIFICATE_BUCKET}/`;
}

/** Public URL of an object in the certificates bucket. */
export function publicUrlFor(path: string, baseUrl: string = getSupabaseEnv().url): string {
  return publicPrefix(baseUrl) + encodeStoragePath(path);
}

/**
 * Object path for a URL that points into the certificates bucket, or null for
 * anything else (e.g. the bundled /assets/certs images), so cleanup can never
 * touch files it does not own.
 */
export function pathFromPublicUrl(
  url: string,
  baseUrl: string | null = baseUrlOrNull()
): string | null {
  if (!baseUrl) return null;
  const prefix = publicPrefix(baseUrl);
  if (!url.startsWith(prefix)) return null;
  const encoded = url.slice(prefix.length).split(/[?#]/)[0];
  if (!encoded) return null;
  try {
    const path = decodeURIComponent(encoded);
    return path.split("/").includes("..") ? null : path;
  } catch {
    return null;
  }
}
