import type { SiteSettings } from "./types";

export const settings: SiteSettings = {
  welcome: {
    enabled: true,
    title: "Welcome to My Portfolio",
    heading: "Terminal Interaction",
    message: "Click **Terminal** icon for CLI. Type `help` for commands.",
    callToAction: "Click Terminal to begin exploring",
    autoCloseSeconds: 5,
  },
  boot: {
    messages: [
      "Initializing Sriram's Portfolio",
      "Checking Device Compatibility",
      "Loading Resources",
      "Preparing Environment",
    ],
  },
  terminal: {
    motd: [
      "Kali GNU/Linux Rolling · 6.8.0-kali3-amd64",
      "Type `help` for available commands, `neofetch` for an overview.",
    ],
  },
  githubWidget: {
    enabled: true,
    url: "https://github.com/SriramBharath-7/sriram-portfolio",
    label: "Star on GitHub",
    caption: "Support the project",
  },
};
