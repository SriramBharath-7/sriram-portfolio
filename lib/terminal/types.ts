import type { PortfolioContent } from "@/content/types";
import type { Vfs, VfsNodeType } from "@/lib/vfs";

/** Accent classes that already exist in globals.css / Terminal styles. */
export type Accent =
  | "default"
  | "error"
  | "muted"
  | "accent"
  | "success"
  | "warning";

export interface DocBullet {
  label: string;
  description?: string;
  /** Existing CSS class, e.g. "lang-python" or "skill-highlight". */
  highlightClass?: string;
}

export interface DocBlock {
  heading?: string;
  body?: string;
  bullets?: DocBullet[];
}

export interface ListingEntry {
  name: string;
  type: VfsNodeType;
  mode: string;
  links: number;
  owner: string;
  group: string;
  size: number;
  /** Preformatted "Mon DD HH:MM" column, as `ls -l` prints it. */
  date: string;
}

export interface TreeRow {
  depth: number;
  name: string;
  type: VfsNodeType;
  /** True when this node is the last child of its parent, for box drawing. */
  last: boolean;
  /** Ancestor "is last" flags, used to draw continuation pipes. */
  guides: boolean[];
}

/**
 * Structured terminal output. Every command returns these instead of HTML
 * strings, so rendering stays in React and nothing is injected as raw markup.
 */
export type TerminalLine =
  | { kind: "prompt"; cwd: string; command: string }
  | { kind: "text"; text: string; tone?: Accent }
  | { kind: "doc"; title?: string; blocks: DocBlock[] }
  | { kind: "listing"; entries: ListingEntry[] }
  | { kind: "listing-long"; entries: ListingEntry[]; total: number }
  | { kind: "tree"; root: string; rows: TreeRow[]; dirs: number; files: number }
  | { kind: "table"; rows: { label: string; value: string }[] }
  | { kind: "help"; groups: { title: string; items: { name: string; description: string }[] }[] }
  | { kind: "neofetch"; rows: { label: string; value: string }[]; logo: string[] }
  | { kind: "columns"; items: string[] };

export interface CommandContext {
  /** Current working directory, always an absolute VFS path. */
  cwd: string;
  args: string[];
  /** The full raw input line. */
  raw: string;
  /** Command recall history, oldest first. */
  history: string[];
  setCwd: (path: string) => void;
  /** Clears visible output. Recall history is preserved. */
  clearScreen: () => void;
  /** Launches or focuses a desktop app through the window manager. */
  openApp: (appId: string, launchProps?: Record<string, unknown>) => void;
  /** Opens an external URL in the visitor's real browser. */
  openExternal: (url: string) => void;
  /** Closes this terminal window. */
  exit: () => void;
  /** Runtime portfolio content: the same object Firefox and the admin edit. */
  content: PortfolioContent;
  /** Virtual filesystem built from `content`. */
  vfs: Vfs;
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  /** Returns output lines. Returning nothing renders no output. */
  handler: (ctx: CommandContext) => TerminalLine[] | void;
  /**
   * Completion hint for the argument position. "path" completes against the
   * VFS, "destination" against known open targets, "none" disables it.
   */
  completes?: "path" | "destination" | "none";
  /** Grouping label used by `help`. */
  group?: string;
  /** Hidden from `help` output but still runnable. */
  hidden?: boolean;
}
