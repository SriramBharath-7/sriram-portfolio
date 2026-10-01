import type { PortfolioContent } from "@/content/types";
import { getVfs } from "@/lib/vfs";
import { getCommand, suggestCommand } from "./registry";
import { customCommandNames, findCustomCommand, runCustomCommand } from "./custom";
import type { CommandContext, TerminalLine } from "./types";

/** What the terminal supplies per run. The VFS is derived from `content`. */
export type ExecutionContext = Omit<CommandContext, "args" | "raw" | "vfs" | "content"> & {
  content: PortfolioContent;
};

/** Splits an input line into a command name and arguments. Quotes are honoured. */
export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  const pattern = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[3]);
  }

  return tokens;
}

/**
 * Runs one input line: built-in commands first, then enabled admin-defined
 * commands.
 *
 * Nothing here touches the real machine: every command operates on the in-memory
 * virtual filesystem, the content layer, or the window manager.
 */
export function runCommand(input: string, execution: ExecutionContext): TerminalLine[] {
  const tokens = tokenize(input.trim());
  if (tokens.length === 0) return [];

  const [name, ...args] = tokens;
  const ctx: CommandContext = {
    ...execution,
    vfs: getVfs(execution.content),
    args,
    raw: input,
  };

  const command = getCommand(name);
  const custom = command ? undefined : findCustomCommand(name, execution.content.commands);

  if (!command && !custom) {
    const suggestion = suggestCommand(name, customCommandNames(execution.content.commands));
    const lines: TerminalLine[] = [
      { kind: "text", tone: "error", text: `${name}: command not found` },
    ];
    if (suggestion) {
      lines.push({ kind: "text", tone: "muted", text: `Did you mean: ${suggestion}` });
    } else {
      lines.push({
        kind: "text",
        tone: "muted",
        text: "Type `help` to see available commands.",
      });
    }
    return lines;
  }

  try {
    if (custom) return runCustomCommand(custom, args, ctx);
    const output = command!.handler(ctx);
    return Array.isArray(output) ? output : [];
  } catch {
    return [
      { kind: "text", tone: "error", text: `${(command ?? custom)!.name}: command failed` },
    ];
  }
}
