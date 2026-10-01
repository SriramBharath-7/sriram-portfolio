import type { VfsMetadata, VfsNodeType } from "./types";

export const VFS_OWNER = "kali";
export const VFS_GROUP = "kali";
export const DIRECTORY_SIZE = 4096;

export const DIRECTORY_MODE = "drwxr-xr-x";
export const FILE_MODE = "-rw-r--r--";

/**
 * Base modification time for the virtual tree.
 *
 * Fixed rather than derived from the clock so listings are deterministic: the
 * same path always reports the same timestamp, in any environment, on every
 * render and across server/client boundaries.
 */
const EPOCH = Date.parse("2025-09-30T20:12:00Z");
const SPREAD_DAYS = 45;

/** Small stable hash so each path gets its own plausible timestamp. */
function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index++) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

/** Deterministic mtime for a path, spread over a plausible recent window. */
export function mtimeFor(path: string): string {
  const seed = hash(path);
  const minutesBack = seed % (SPREAD_DAYS * 24 * 60);
  return new Date(EPOCH - minutesBack * 60_000).toISOString();
}

export function buildMetadata(
  path: string,
  type: VfsNodeType,
  size: number,
  links: number
): VfsMetadata {
  return {
    mode: type === "directory" ? DIRECTORY_MODE : FILE_MODE,
    links,
    owner: VFS_OWNER,
    group: VFS_GROUP,
    size: type === "directory" ? DIRECTORY_SIZE : size,
    mtime: mtimeFor(path),
  };
}

/**
 * Formats an mtime the way `ls -l` does: recent entries show a time, older ones
 * show a year. Month names are fixed so output never depends on locale.
 */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatListingDate(mtime: string): string {
  const date = new Date(mtime);
  const month = MONTHS[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, " ");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${month} ${day} ${hours}:${minutes}`;
}
