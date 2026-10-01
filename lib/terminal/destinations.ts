/**
 * Named targets the terminal can open through the window manager.
 * Shared by the launcher commands, `open`, and tab completion so the list
 * never drifts apart.
 */
export interface Destination {
  id: string;
  aliases?: string[];
  appId: string;
  launchProps?: Record<string, unknown>;
  description: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "projects",
    appId: "firefox",
    launchProps: { url: "home://projects" },
    description: "Live GitHub repositories",
  },
  {
    id: "certifications",
    aliases: ["certs"],
    appId: "firefox",
    launchProps: { url: "home://certifications" },
    description: "Certificates and achievements",
  },
  {
    id: "blogs",
    aliases: ["blog"],
    appId: "firefox",
    launchProps: { url: "home://blogs" },
    description: "Posts from DEV.to and Medium",
  },
  {
    id: "tools",
    aliases: ["toolspage"],
    appId: "firefox",
    launchProps: { url: "home://tools" },
    description: "Security tooling and learning projects",
  },
  {
    id: "about",
    appId: "firefox",
    launchProps: { url: "home://about" },
    description: "Profile overview",
  },
  {
    id: "skills",
    appId: "firefox",
    launchProps: { url: "home://skills" },
    description: "Technical skills",
  },
  {
    id: "education",
    appId: "firefox",
    launchProps: { url: "home://education" },
    description: "Education and goals",
  },
  {
    id: "firefox",
    appId: "firefox",
    launchProps: { url: "home://start" },
    description: "Open the browser start page",
  },
  {
    id: "terminal",
    appId: "terminal",
    description: "Open another terminal window",
  },
];

export function findDestination(name: string): Destination | undefined {
  const key = name.toLowerCase();
  return DESTINATIONS.find(
    (destination) =>
      destination.id === key || destination.aliases?.includes(key)
  );
}

/** Every name and alias, for completion. */
export const destinationNames: string[] = DESTINATIONS.flatMap((destination) => [
  destination.id,
  ...(destination.aliases ?? []),
]).sort();
