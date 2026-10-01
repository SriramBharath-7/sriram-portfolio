import type { PortfolioContent } from "@/content/types";
import { getVfs, isDirectory, type Vfs } from "@/lib/vfs";
import { builtinCommandNames, getCommand } from "./registry";
import { customCommandNames } from "./custom";
import { destinationNames } from "./destinations";

export interface CompletionResult {
  /** Full replacement input line, or null when there is nothing to complete. */
  line: string | null;
  /** Candidates to display when the completion is ambiguous. */
  candidates: string[];
}

const EMPTY: CompletionResult = { line: null, candidates: [] };

function sharedPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (prefix && !value.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}

/** Splits "dir/partial" into the directory portion and the partial basename. */
function splitPath(token: string): { dir: string; base: string } {
  const index = token.lastIndexOf("/");
  if (index === -1) return { dir: "", base: token };
  return { dir: token.slice(0, index + 1), base: token.slice(index + 1) };
}

function completePath(token: string, cwd: string, vfs: Vfs): CompletionResult {
  const { dir, base } = splitPath(token);
  const { node } = vfs.resolvePath(cwd, dir === "" ? "." : dir);
  if (!node || !isDirectory(node)) return EMPTY;

  const children = vfs.listDirectory(node.path) ?? [];
  const matches = children.filter((child) => child.name.startsWith(base));
  if (matches.length === 0) return EMPTY;

  if (matches.length === 1) {
    const match = matches[0];
    const suffix = match.type === "directory" ? "/" : "";
    return { line: `${dir}${match.name}${suffix}`, candidates: [] };
  }

  const names = matches.map((match) => match.name);
  const prefix = sharedPrefix(names);
  return {
    line: prefix.length > base.length ? `${dir}${prefix}` : null,
    candidates: matches.map((m) => (m.type === "directory" ? `${m.name}/` : m.name)),
  };
}

function completeFromList(token: string, values: string[]): CompletionResult {
  const matches = values.filter((value) => value.startsWith(token));
  if (matches.length === 0) return EMPTY;
  if (matches.length === 1) return { line: matches[0], candidates: [] };

  const prefix = sharedPrefix(matches);
  return {
    line: prefix.length > token.length ? prefix : null,
    candidates: matches,
  };
}

/**
 * Tab completion for the current input line.
 *
 * Completes command names (built-in and custom) in the first position, then
 * defers to the command's declared `completes` mode for arguments.
 */
export function complete(input: string, cwd: string, content: PortfolioContent): CompletionResult {
  const trailingSpace = /\s$/.test(input);
  const tokens = input.split(/\s+/).filter((token) => token.length > 0);

  // First token, still being typed: complete a command name.
  if (tokens.length === 0 || (tokens.length === 1 && !trailingSpace)) {
    const token = tokens[0] ?? "";
    const names = [...new Set([...builtinCommandNames(), ...customCommandNames(content.commands)])].sort();
    return completeFromList(token, names);
  }

  // Custom commands take no completable arguments.
  const command = getCommand(tokens[0]);
  if (!command || command.completes === "none") return EMPTY;

  const token = trailingSpace ? "" : tokens[tokens.length - 1];
  const prefixTokens = trailingSpace ? tokens : tokens.slice(0, -1);
  const head = `${prefixTokens.join(" ")} `;

  const result =
    command.completes === "destination"
      ? completeFromList(token, destinationNames)
      : command.completes === "path"
      ? completePath(token, cwd, getVfs(content))
      : EMPTY;

  return {
    line: result.line === null ? null : head + result.line,
    candidates: result.candidates,
  };
}
