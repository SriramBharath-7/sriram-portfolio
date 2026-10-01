export type VfsNodeType = "directory" | "file";

/**
 * Unix-style metadata for a virtual node.
 *
 * Entirely synthetic and deterministic — derived from the node's own path so a
 * long listing looks believable and never changes between renders. Nothing here
 * touches the host filesystem.
 */
export interface VfsMetadata {
  /** Permission string as `ls -l` prints it, e.g. "drwxr-xr-x". */
  mode: string;
  /** Hard link count column. */
  links: number;
  owner: string;
  group: string;
  /** Size in bytes. Directories report the conventional 4096. */
  size: number;
  /** Modification time as an ISO string. */
  mtime: string;
}

interface VfsNodeBase {
  name: string;
  /** Absolute normalized path, e.g. "/home/sriram/about.txt". */
  path: string;
  type: VfsNodeType;
  meta: VfsMetadata;
}

export interface VfsDirectory extends VfsNodeBase {
  type: "directory";
  children: VfsNode[];
}

export interface VfsFile extends VfsNodeBase {
  type: "file";
  /** Plain-text body, ready for `cat`. Derived from the content layer. */
  content: string;
  /**
   * Optional in-app destination. Lets a future Files app or terminal command
   * hand a node off to the browser, e.g. "home://certifications".
   */
  appUrl?: string;
}

export type VfsNode = VfsDirectory | VfsFile;

export function isDirectory(node: VfsNode): node is VfsDirectory {
  return node.type === "directory";
}

export function isFile(node: VfsNode): node is VfsFile {
  return node.type === "file";
}
