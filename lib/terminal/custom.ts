/**
 * Admin-defined terminal commands.
 *
 * These are data, not code: each one maps to a fixed, safe behaviour (print
 * text, print a portfolio section, open an internal page, open an app, open a
 * link). Built-in commands always take precedence, so a stored command can
 * never replace ls, cd, cat or help.
 */
import type { CustomCommand } from "@/content/types";
import { findRouteMeta } from "@/lib/browser/route-meta";
import { sectionLines } from "./docs";
import { getCommand } from "./registry";
import type { CommandContext, TerminalLine } from "./types";

function isActive(command: CustomCommand): boolean {
  return command.enabled && !getCommand(command.name);
}

/** Enabled custom command matching a name or alias, unless a built-in owns that name. */
export function findCustomCommand(
  name: string,
  commands: CustomCommand[]
): CustomCommand | undefined {
  const key = name.toLowerCase();
  if (getCommand(key)) return undefined;
  return commands.find(
    (command) => isActive(command) && (command.name === key || command.aliases.includes(key))
  );
}

/** Invokable custom names and aliases (built-in collisions excluded). */
export function customCommandNames(commands: CustomCommand[]): string[] {
  return commands
    .filter(isActive)
    .flatMap((command) => [command.name, ...command.aliases])
    .filter((name) => !getCommand(name));
}

function safeExternalUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}

export function runCustomCommand(
  command: CustomCommand,
  args: string[],
  ctx: CommandContext
): TerminalLine[] {
  if (args.includes("--help") || args.includes("-h")) {
    const lines: TerminalLine[] = [{ kind: "text", text: command.help || command.description }];
    if (command.aliases.length > 0) {
      lines.push({ kind: "text", tone: "muted", text: `Aliases: ${command.aliases.join(", ")}` });
    }
    return lines;
  }

  const { response } = command;
  switch (response.type) {
    case "text":
      return [{ kind: "text", text: response.text }];

    case "content":
      return sectionLines(response.section, ctx.content);

    case "route": {
      const meta = findRouteMeta(response.url);
      if (!meta) {
        return [{ kind: "text", tone: "error", text: `${command.name}: unknown page ${response.url}` }];
      }
      ctx.openApp("firefox", { url: meta.url });
      return [{ kind: "text", tone: "muted", text: `Opening ${meta.title} in Firefox…` }];
    }

    case "app": {
      const app = ctx.content.apps.find((candidate) => candidate.id === response.appId);
      if (!app || !app.enabled) {
        return [
          { kind: "text", tone: "error", text: `${command.name}: application '${response.appId}' is not available` },
        ];
      }
      ctx.openApp(app.id);
      return [{ kind: "text", tone: "muted", text: `Opening ${app.name}…` }];
    }

    case "url": {
      const url = safeExternalUrl(response.url);
      if (!url) {
        return [{ kind: "text", tone: "error", text: `${command.name}: refusing to open an unsupported link` }];
      }
      ctx.openExternal(url);
      return [{ kind: "text", tone: "muted", text: `Opening ${url}…` }];
    }
  }
}
