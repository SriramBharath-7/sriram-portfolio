import { filesystemCommands } from "./commands/filesystem";
import { systemCommands } from "./commands/system";
import { portfolioCommands } from "./commands/portfolio";
import type { Command } from "./types";

const GROUP_TITLES: Record<string, string> = {
  filesystem: "Filesystem",
  system: "System",
  portfolio: "Portfolio",
};

const baseCommands: Command[] = [
  ...filesystemCommands,
  ...systemCommands,
  ...portfolioCommands,
];

const help: Command = {
  name: "help",
  aliases: ["?"],
  description: "Show this command reference",
  group: "system",
  handler: ({ content }) => {
    const groups = Object.keys(GROUP_TITLES).map((group) => ({
      title: GROUP_TITLES[group],
      items: ALL_COMMANDS.filter((cmd) => cmd.group === group && !cmd.hidden)
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cmd) => ({
          name: cmd.usage ?? cmd.name,
          description: cmd.description,
        })),
    }));

    // Admin-defined commands; built-in names always win, so collisions are skipped.
    groups.push({
      title: "Custom",
      items: content.commands
        .filter((command) => command.enabled && !commandMap.has(command.name))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((command) => ({ name: command.name, description: command.description })),
    });

    return [{ kind: "help", groups: groups.filter((group) => group.items.length > 0) }];
  },
};

export const ALL_COMMANDS: Command[] = [...baseCommands, help];

const commandMap = new Map<string, Command>();
for (const command of ALL_COMMANDS) {
  commandMap.set(command.name, command);
  for (const alias of command.aliases ?? []) commandMap.set(alias, command);
}

/** Built-in command lookup. Custom commands are resolved separately (see custom.ts). */
export function getCommand(name: string): Command | undefined {
  return commandMap.get(name.toLowerCase());
}

/** Built-in names and aliases. Admin-defined commands can never shadow these. */
export function builtinCommandNames(): string[] {
  return [...commandMap.keys()].sort();
}

function editDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  let previous = Array.from({ length: cols }, (_, i) => i);

  for (let i = 1; i < rows; i++) {
    const current = [i];
    for (let j = 1; j < cols; j++) {
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
    previous = current;
  }

  return previous[cols - 1];
}

/** Closest known command (built-in or `extra` names), used for "did you mean" on typos. */
export function suggestCommand(input: string, extra: string[] = []): string | undefined {
  const name = input.toLowerCase();
  let best: { name: string; distance: number } | undefined;

  for (const candidate of [...commandMap.keys(), ...extra]) {
    const distance = editDistance(name, candidate);
    if (distance <= 2 && (!best || distance < best.distance)) {
      best = { name: candidate, distance };
    }
  }

  return best?.name;
}
