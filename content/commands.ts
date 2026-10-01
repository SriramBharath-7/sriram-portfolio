import type { CustomCommand } from "./types";

/**
 * Admin-managed terminal commands. Built-in commands (ls, cd, cat, help...)
 * live in lib/terminal and always win over these. The seeded examples are
 * disabled so the public terminal behaves exactly as before until enabled.
 */
export const commands: CustomCommand[] = [
  {
    id: "github",
    name: "github",
    aliases: ["gh"],
    description: "Open my GitHub profile",
    help: "Opens github.com/SriramBharath-7 in a new browser tab.",
    enabled: false,
    response: { type: "url", url: "https://github.com/SriramBharath-7" },
  },
  {
    id: "quote",
    name: "quote",
    aliases: [],
    description: "Print a favourite security quote",
    enabled: false,
    response: {
      type: "text",
      text: "\"Security is a process, not a product.\" — Bruce Schneier",
    },
  },
];
