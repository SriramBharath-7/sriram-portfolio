import { isDirectory } from "@/lib/vfs";
import { aboutDoc, contactLines, ctfDoc, educationDoc, skillsDoc, toolsDoc } from "../docs";
import { DESTINATIONS, findDestination } from "../destinations";
import type { Command, TerminalLine } from "../types";

/** Builds a command that opens a named destination through the window manager. */
function launcher(
  name: string,
  destinationId: string,
  description: string,
  aliases?: string[]
): Command {
  return {
    name,
    aliases,
    description,
    group: "portfolio",
    handler: ({ openApp }) => {
      const destination = findDestination(destinationId);
      if (!destination) {
        return [{ kind: "text", tone: "error", text: `${name}: unknown destination` }];
      }
      openApp(destination.appId, destination.launchProps);
      return [
        {
          kind: "text",
          tone: "muted",
          text: `Opening ${destination.id} in Firefox…`,
        },
      ];
    },
  };
}

export const about: Command = {
  name: "about",
  description: "Display profile information",
  group: "portfolio",
  handler: ({ content }) => [aboutDoc(content)],
};

export const skills: Command = {
  name: "skills",
  description: "Show technical skills",
  group: "portfolio",
  handler: ({ content }) => [skillsDoc(content)],
};

export const education: Command = {
  name: "education",
  aliases: ["studies"],
  description: "Show education and learning goals",
  group: "portfolio",
  handler: ({ content }) => [educationDoc(content)],
};

export const ctf: Command = {
  name: "ctf",
  description: "Show CTF and security focus areas",
  group: "portfolio",
  handler: ({ content }) => [ctfDoc(content)],
};

export const contact: Command = {
  name: "contact",
  description: "Display contact information",
  group: "portfolio",
  handler: ({ content }) => contactLines(content),
};

export const toolsCommand: Command = {
  name: "tools",
  description: "Show security tooling interests",
  group: "portfolio",
  handler: ({ content }) => [toolsDoc(content)],
};

export const open: Command = {
  name: "open",
  description: "Open an application, portfolio page or virtual file",
  usage: "open <destination>",
  group: "portfolio",
  completes: "destination",
  handler: ({ args, cwd, openApp, openExternal, vfs }) => {
    const target = args[0];
    if (!target) {
      const items = DESTINATIONS.map((destination) => ({
        name: destination.aliases?.length
          ? `${destination.id} (${destination.aliases.join(", ")})`
          : destination.id,
        description: destination.description,
      }));
      return [
        { kind: "text", tone: "error", text: "open: missing destination" },
        { kind: "help", groups: [{ title: "Available destinations", items }] },
      ];
    }

    const destination = findDestination(target);
    if (destination) {
      openApp(destination.appId, destination.launchProps);
      return [{ kind: "text", tone: "muted", text: `Opening ${destination.id}…` }];
    }

    // Fall back to opening a virtual file: directories are listed, files are
    // handed to the browser when the node declares an app URL.
    const { node } = vfs.resolvePath(cwd, target);
    if (!node) {
      return [
        { kind: "text", tone: "error", text: `open: no such destination or file: ${target}` },
      ];
    }
    if (isDirectory(node)) {
      return [
        { kind: "text", tone: "error", text: `open: ${target}: is a directory` },
      ];
    }
    if (node.appUrl?.startsWith("home://")) {
      openApp("firefox", { url: node.appUrl });
      return [{ kind: "text", tone: "muted", text: `Opening ${node.name} in Firefox…` }];
    }
    if (node.appUrl) {
      openExternal(node.appUrl);
      return [{ kind: "text", tone: "muted", text: `Opening ${node.appUrl}…` }];
    }

    const lines: TerminalLine[] = [{ kind: "text", text: node.content.replace(/\n+$/, "") }];
    return lines;
  },
};

export const portfolioCommands: Command[] = [
  about,
  skills,
  education,
  ctf,
  contact,
  toolsCommand,
  open,
  launcher("projects", "projects", "Browse live GitHub repositories in Firefox"),
  launcher("certs", "certifications", "View certifications in Firefox", ["certifications"]),
  launcher("blog", "blogs", "Open the blog gallery in Firefox", ["blogs"]),
  launcher("toolspage", "tools", "Open the tools page in Firefox"),
];
