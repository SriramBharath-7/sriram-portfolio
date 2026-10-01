import {
  DIRECTORY_MODE,
  DIRECTORY_SIZE,
  HOME,
  VFS_GROUP,
  VFS_OWNER,
  basename,
  displayPath,
  formatListingDate,
  isDirectory,
  parent,
} from "@/lib/vfs";
import type { Vfs, VfsDirectory, VfsNode } from "@/lib/vfs";
import type { Command, ListingEntry, TerminalLine, TreeRow } from "../types";

/** Blocks reported by the `total` line of a long listing (1K blocks). */
function blocksFor(size: number): number {
  return Math.max(1, Math.ceil(size / 1024)) * 4;
}

function toEntry(node: VfsNode): ListingEntry {
  return {
    name: node.name,
    type: node.type,
    mode: node.meta.mode,
    links: node.meta.links,
    owner: node.meta.owner,
    group: node.meta.group,
    size: node.meta.size,
    date: formatListingDate(node.meta.mtime),
  };
}

/** Synthesizes the "." and ".." rows that `ls -a` prepends. */
function dotEntry(name: string, node: VfsNode | null): ListingEntry {
  const base = node
    ? toEntry(node)
    : {
        name,
        type: "directory" as const,
        mode: DIRECTORY_MODE,
        links: 2,
        owner: VFS_OWNER,
        group: VFS_GROUP,
        size: DIRECTORY_SIZE,
        date: formatListingDate(new Date(0).toISOString()),
      };
  return { ...base, name };
}

const KNOWN_LS_FLAGS = new Set(["a", "l"]);

/** Splits argv into flag letters and positional arguments. */
function parseFlags(args: string[]): {
  flags: Set<string>;
  positional: string[];
  invalid: string | null;
} {
  const flags = new Set<string>();
  const positional: string[] = [];
  let invalid: string | null = null;

  for (const arg of args) {
    if (arg.startsWith("-") && arg.length > 1) {
      for (const letter of arg.slice(1)) {
        if (!KNOWN_LS_FLAGS.has(letter) && invalid === null) invalid = letter;
        flags.add(letter);
      }
    } else {
      positional.push(arg);
    }
  }

  return { flags, positional, invalid };
}

export const pwd: Command = {
  name: "pwd",
  description: "Print the current working directory",
  group: "filesystem",
  handler: ({ cwd }) => [{ kind: "text", text: cwd }],
};

export const ls: Command = {
  name: "ls",
  aliases: ["dir"],
  description: "List directory contents",
  usage: "ls [-a] [-l] [path]",
  group: "filesystem",
  completes: "path",
  handler: ({ cwd, args, vfs }) => {
    const { flags, positional, invalid } = parseFlags(args);

    if (invalid) {
      return [
        { kind: "text", tone: "error", text: `ls: invalid option -- '${invalid}'` },
        { kind: "text", tone: "muted", text: "Try 'ls -a', 'ls -l' or 'ls -la'." },
      ];
    }

    const target = positional[0] ?? ".";
    const { path, node } = vfs.resolvePath(cwd, target);

    if (!node) {
      return [
        {
          kind: "text",
          tone: "error",
          text: `ls: cannot access '${target}': No such file or directory`,
        },
      ];
    }

    const long = flags.has("l");

    // Listing a file shows just that file, as coreutils does.
    if (!isDirectory(node)) {
      const entry = toEntry(node);
      return long
        ? [{ kind: "listing-long", entries: [entry], total: blocksFor(entry.size) }]
        : [{ kind: "listing", entries: [entry] }];
    }

    const children = vfs.listDirectory(path) ?? [];
    const entries: ListingEntry[] = children.map(toEntry);

    if (flags.has("a")) {
      const parentNode = vfs.getNode(parent(path));
      entries.unshift(dotEntry(".", node), dotEntry("..", parentNode));
    }

    if (entries.length === 0) return [];

    if (!long) return [{ kind: "listing", entries }];

    const total = entries.reduce((sum, entry) => sum + blocksFor(entry.size), 0);
    return [{ kind: "listing-long", entries, total }];
  },
};

export const cd: Command = {
  name: "cd",
  description: "Change the working directory",
  usage: "cd [path]",
  group: "filesystem",
  completes: "path",
  handler: ({ cwd, args, setCwd, vfs }) => {
    const target = args[0] ?? "~";
    const { path, node } = vfs.resolvePath(cwd, target);

    if (!node) {
      return [
        {
          kind: "text",
          tone: "error",
          text: `cd: no such file or directory: ${target}`,
        },
      ];
    }
    if (!isDirectory(node)) {
      return [{ kind: "text", tone: "error", text: `cd: not a directory: ${target}` }];
    }

    setCwd(path);
  },
};

export const cat: Command = {
  name: "cat",
  description: "Print the contents of a virtual file",
  usage: "cat <file>",
  group: "filesystem",
  completes: "path",
  handler: ({ cwd, args, vfs }) => {
    if (args.length === 0) {
      return [{ kind: "text", tone: "error", text: "cat: missing file operand" }];
    }

    const lines: TerminalLine[] = [];
    for (const target of args) {
      const { node } = vfs.resolvePath(cwd, target);
      if (!node) {
        lines.push({
          kind: "text",
          tone: "error",
          text: `cat: ${target}: No such file or directory`,
        });
        continue;
      }
      if (isDirectory(node)) {
        lines.push({
          kind: "text",
          tone: "error",
          text: `cat: ${target}: Is a directory`,
        });
        continue;
      }
      lines.push({ kind: "text", text: node.content.replace(/\n+$/, "") });
    }
    return lines;
  },
};

function walk(
  vfs: Vfs,
  dir: VfsDirectory,
  guides: boolean[],
  rows: TreeRow[],
  counts: { dirs: number; files: number }
) {
  const children = vfs.listDirectory(dir.path) ?? [];
  children.forEach((child, index) => {
    const last = index === children.length - 1;
    rows.push({
      depth: guides.length,
      name: child.name,
      type: child.type,
      last,
      guides: [...guides],
    });
    if (child.type === "directory") {
      counts.dirs += 1;
      walk(vfs, child, [...guides, last], rows, counts);
    } else {
      counts.files += 1;
    }
  });
}

export const tree: Command = {
  name: "tree",
  description: "Show the directory structure as a tree",
  usage: "tree [path]",
  group: "filesystem",
  completes: "path",
  handler: ({ cwd, args, vfs }) => {
    const target = args[0] ?? ".";
    const { path, node } = vfs.resolvePath(cwd, target);

    if (!node) {
      return [
        { kind: "text", tone: "error", text: `tree: ${target}: No such file or directory` },
      ];
    }
    if (!isDirectory(node)) {
      return [{ kind: "text", text: displayPath(path) }];
    }

    const rows: TreeRow[] = [];
    const counts = { dirs: 0, files: 0 };
    walk(vfs, node, [], rows, counts);

    return [
      { kind: "tree", root: displayPath(path), rows, dirs: counts.dirs, files: counts.files },
    ];
  },
};

export const filesystemCommands = [pwd, ls, cd, cat, tree];
export { HOME, basename, parent };
