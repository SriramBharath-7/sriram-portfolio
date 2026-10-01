import type { DocumentKey } from "@/content/documents";

/** Where each stored document is edited, for links and status lists. */
export const DOCUMENT_SECTIONS: Record<DocumentKey, { label: string; href: string }> = {
  profile: { label: "Profile & socials", href: "/admin/profile" },
  about: { label: "About", href: "/admin/profile" },
  education: { label: "Education", href: "/admin/education" },
  skills: { label: "Skills", href: "/admin/skills" },
  certifications: { label: "Certifications", href: "/admin/certifications" },
  ctf: { label: "CTF focus", href: "/admin/security" },
  tools: { label: "Security tools", href: "/admin/security" },
  blog: { label: "Blog sources", href: "/admin/settings" },
  projects: { label: "Projects", href: "/admin/projects" },
  apps: { label: "Applications", href: "/admin/apps" },
  commands: { label: "Terminal commands", href: "/admin/commands" },
  settings: { label: "Site settings", href: "/admin/settings" },
};
