/**
 * Read-only virtual filesystem over the portfolio content.
 *
 * This never touches the visitor's machine: it is a plain in-memory tree built
 * from the runtime portfolio content, so `cat about.txt`, the `about` command
 * and the Firefox About page always show the same data.
 */
import type { PortfolioContent } from "@/content/types";
import { buildTree } from "./tree";
import { HOME, ROOT, normalize, resolve, segments } from "./paths";
import { isDirectory, type VfsDirectory, type VfsFile, type VfsNode } from "./types";

export interface Vfs {
  root: VfsDirectory;
  /** Look up a node by absolute path. Returns null when it does not exist. */
  getNode: (path: string) => VfsNode | null;
  /**
   * Resolve a possibly-relative path against a working directory and return
   * the node it points at, plus the absolute path it resolved to.
   */
  resolvePath: (cwd: string, input: string) => { path: string; node: VfsNode | null };
  /** Directory contents (directories first), or null when missing or not a directory. */
  listDirectory: (path: string) => VfsNode[] | null;
  /** File body, or null when the path is missing or is a directory. */
  readFile: (path: string) => string | null;
  exists: (path: string) => boolean;
}

export function createVfs(content: PortfolioContent): Vfs {
  const root = buildTree(content);

  const getNode = (path: string): VfsNode | null => {
    const normalized = normalize(path);
    if (normalized === ROOT) return root;

    let current: VfsNode = root;
    for (const segment of segments(normalized)) {
      if (!isDirectory(current)) return null;
      const child: VfsNode | undefined = current.children.find(
        (candidate) => candidate.name === segment
      );
      if (!child) return null;
      current = child;
    }
    return current;
  };

  return {
    root,
    getNode,
    resolvePath: (cwd, input) => {
      const path = resolve(cwd, input);
      return { path, node: getNode(path) };
    },
    listDirectory: (path) => {
      const node = getNode(path);
      if (!node || !isDirectory(node)) return null;
      return [...node.children].sort((a, b) => {
        if (a.type !== b.type) return a.type === "directory" ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
    },
    readFile: (path) => {
      const node = getNode(path);
      return node && node.type === "file" ? node.content : null;
    },
    exists: (path) => getNode(path) !== null,
  };
}

const cache = new WeakMap<PortfolioContent, Vfs>();

/** The filesystem for a content snapshot, built once per snapshot. */
export function getVfs(content: PortfolioContent): Vfs {
  let vfs = cache.get(content);
  if (!vfs) {
    vfs = createVfs(content);
    cache.set(content, vfs);
  }
  return vfs;
}

export { HOME, ROOT };
export {
  normalize,
  resolve,
  join,
  parent,
  basename,
  displayPath,
  segments,
} from "./paths";
export { isDirectory, isFile } from "./types";
export type { VfsNode, VfsDirectory, VfsFile };
export type { VfsNodeType, VfsMetadata } from "./types";
export {
  formatListingDate,
  DIRECTORY_SIZE,
  DIRECTORY_MODE,
  FILE_MODE,
  VFS_OWNER,
  VFS_GROUP,
} from "./metadata";
