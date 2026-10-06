import type { IconName } from "./icons";

export interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Admin modules. The side panel, page headers and the access sequence read this. */
export const NAV: NavGroup[] = [
  { title: "System", items: [{ href: "/admin", label: "Command Center", icon: "overview" }] },
  {
    title: "Portfolio",
    items: [
      { href: "/admin/profile", label: "Profile & About", icon: "profile" },
      { href: "/admin/education", label: "Education", icon: "education" },
      { href: "/admin/skills", label: "Skills", icon: "skills" },
      { href: "/admin/certifications", label: "Certifications", icon: "certifications" },
      { href: "/admin/security", label: "CTF & Tools", icon: "security" },
      { href: "/admin/socials", label: "Socials", icon: "socials" },
      { href: "/admin/projects", label: "Projects", icon: "projects" },
    ],
  },
  {
    title: "Desktop",
    items: [
      { href: "/admin/commands", label: "Terminal commands", icon: "commands" },
      { href: "/admin/apps", label: "Applications", icon: "apps" },
      { href: "/admin/settings", label: "Settings", icon: "settings" },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV.flatMap((group) => group.items);

/** Two-digit module number, Kali-menu style: "01", "02"... */
export function moduleNumber(item: NavItem): string {
  return String(NAV_ITEMS.indexOf(item) + 1).padStart(2, "0");
}

/** The nav entry (and its group title) a pathname belongs to. */
export function navFor(pathname: string | null): { item: NavItem; group: string } | undefined {
  if (!pathname) return undefined;
  for (const group of NAV) {
    for (const item of group.items) {
      const match = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
      if (match) return { item, group: group.title };
    }
  }
  return undefined;
}
