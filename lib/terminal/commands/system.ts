import { SHELL_HOST, SHELL_USER, KERNEL } from "../shell";
import { whoamiLines } from "../docs";
import type { Command } from "../types";

export const clear: Command = {
  name: "clear",
  description: "Clear the terminal screen",
  group: "system",
  handler: ({ clearScreen }) => {
    clearScreen();
  },
};

export const history: Command = {
  name: "history",
  description: "Show previously entered commands",
  group: "system",
  handler: (ctx) => {
    if (ctx.history.length === 0) return [];
    return [
      {
        kind: "table",
        rows: ctx.history.map((entry, index) => ({
          label: String(index + 1),
          value: entry,
        })),
      },
    ];
  },
};

export const whoami: Command = {
  name: "whoami",
  description: "Show information about the current user",
  group: "system",
  handler: ({ content }) => whoamiLines(content),
};

export const hostname: Command = {
  name: "hostname",
  description: "Show the system hostname",
  group: "system",
  handler: () => [{ kind: "text", text: SHELL_HOST }],
};

export const uname: Command = {
  name: "uname",
  description: "Show system information",
  usage: "uname [-a]",
  group: "system",
  handler: ({ args }) => {
    if (args.includes("-a")) {
      return [
        {
          kind: "text",
          text: `Linux ${SHELL_HOST} ${KERNEL} #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`,
        },
      ];
    }
    return [{ kind: "text", text: "Linux" }];
  },
};

export const echo: Command = {
  name: "echo",
  description: "Print a line of text",
  usage: "echo [text...]",
  group: "system",
  completes: "none",
  handler: ({ args }) => [{ kind: "text", text: args.join(" ") }],
};

export const date: Command = {
  name: "date",
  description: "Show the current date and time",
  group: "system",
  handler: () => [
    {
      kind: "text",
      text: new Date().toString(),
    },
  ],
};

export const exitCommand: Command = {
  name: "exit",
  aliases: ["quit", "logout"],
  description: "Close the terminal",
  group: "system",
  handler: ({ exit }) => {
    exit();
    return [{ kind: "text", tone: "muted", text: "logout" }];
  },
};

const KALI_LOGO = [
  "   ___       _ _ ",
  "  | |/ /__ _| (_)",
  "  | ' // _` | | |",
  "  | . \\ (_| | | |",
  "  |_|\\_\\__,_|_|_|",
  "                 ",
];

export const neofetch: Command = {
  name: "neofetch",
  aliases: ["fetch"],
  description: "Show a summary of this portfolio",
  group: "system",
  handler: ({ content }) => {
    const { certifications, profile, skills } = content;
    const skillCount = skills.groups.reduce(
      (total, group) => total + group.items.length,
      0
    );

    return [
      {
        kind: "neofetch",
        logo: KALI_LOGO,
        rows: [
          { label: "", value: `${SHELL_USER}@${SHELL_HOST}` },
          { label: "OS", value: "Kali GNU/Linux Rolling x86_64" },
          { label: "Kernel", value: KERNEL },
          { label: "Shell", value: "portfolio-sh" },
          { label: "Name", value: profile.name },
          { label: "Role", value: profile.role },
          { label: "Focus", value: skills.interests.join(", ") },
          { label: "Skills", value: `${skillCount} tracked` },
          { label: "Certs", value: `${certifications.length} completed` },
          { label: "Email", value: profile.email },
          { label: "GitHub", value: profile.githubUsername },
        ],
      },
    ];
  },
};

export const systemCommands = [
  clear,
  history,
  whoami,
  hostname,
  uname,
  echo,
  date,
  neofetch,
  exitCommand,
];
