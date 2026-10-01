/** Pure path helpers for the virtual filesystem. No I/O, no DOM. */

export const ROOT = "/";
export const HOME = "/home/sriram";

/** Collapse slashes and resolve "." and ".." segments. Always absolute. */
export function normalize(path: string): string {
  const segments = path.split("/");
  const out: string[] = [];

  for (const segment of segments) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") {
      out.pop();
      continue;
    }
    out.push(segment);
  }

  return "/" + out.join("/");
}

/** Join segments into a single normalized absolute path. */
export function join(...segments: string[]): string {
  return normalize(segments.join("/"));
}

/** Parent directory of a path. The parent of "/" is "/". */
export function parent(path: string): string {
  const normalized = normalize(path);
  if (normalized === ROOT) return ROOT;
  const index = normalized.lastIndexOf("/");
  return index <= 0 ? ROOT : normalized.slice(0, index);
}

/** Final segment of a path. The basename of "/" is "/". */
export function basename(path: string): string {
  const normalized = normalize(path);
  if (normalized === ROOT) return ROOT;
  return normalized.slice(normalized.lastIndexOf("/") + 1);
}

/**
 * Resolve a user-supplied path against a working directory.
 * Supports "~", "~/x", absolute paths, and relative paths.
 */
export function resolve(cwd: string, input: string): string {
  const target = input.trim();
  if (target === "" || target === "~") return HOME;
  if (target === "~/") return HOME;
  if (target.startsWith("~/")) return join(HOME, target.slice(2));
  if (target.startsWith("/")) return normalize(target);
  return join(cwd, target);
}

/** Render an absolute path with the home directory shortened to "~". */
export function displayPath(path: string): string {
  const normalized = normalize(path);
  if (normalized === HOME) return "~";
  if (normalized.startsWith(HOME + "/")) return "~" + normalized.slice(HOME.length);
  return normalized;
}

/** Split a path into its segments, e.g. "/a/b" -> ["a", "b"]. */
export function segments(path: string): string[] {
  const normalized = normalize(path);
  return normalized === ROOT ? [] : normalized.slice(1).split("/");
}
