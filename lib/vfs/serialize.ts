/**
 * Renders portfolio content into the plain-text bodies stored in the virtual
 * filesystem. Keeping this separate means `content/` stays pure data and the
 * VFS never duplicates the information it presents.
 */
import type {
  About,
  Certification,
  CtfContent,
  Education,
  Profile,
  Skills,
  ToolsContent,
} from "@/content/types";

const bullet = (text: string) => `  - ${text}`;

export function serializeAbout(about: About, profile: Profile): string {
  const lines: string[] = [about.headline, ""];

  lines.push(`Name:  ${profile.name}`);
  lines.push(`Role:  ${profile.role}`);
  lines.push("");

  for (const section of about.sections) {
    lines.push(section.title);
    if (section.body) lines.push(section.body);
    for (const item of section.bullets ?? []) {
      lines.push(
        bullet(item.description ? `${item.label} - ${item.description}` : item.label)
      );
    }
    lines.push("");
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function serializeEducation(education: Education): string {
  const lines: string[] = [education.headline, ""];

  for (const entry of education.entries) {
    lines.push(`${entry.degree} (${entry.status})`);
    if (entry.institution) lines.push(`Institution: ${entry.institution}`);
    lines.push("");
    lines.push("Relevant coursework:");
    entry.coursework.forEach((course) => lines.push(bullet(course)));
    if (entry.notes) {
      lines.push("");
      lines.push(entry.notes);
    }
    lines.push("");
  }

  if (education.goals.length > 0) {
    lines.push("Goals:");
    for (const goal of education.goals) {
      lines.push(
        bullet(goal.description ? `${goal.title} - ${goal.description}` : goal.title)
      );
    }
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function serializeSkills(skills: Skills): string {
  const lines: string[] = [skills.headline, "", skills.intro, ""];

  for (const group of skills.groups) {
    lines.push(group.title);
    for (const item of group.items) {
      lines.push(
        bullet(item.description ? `${item.name} - ${item.description}` : item.name)
      );
    }
    lines.push("");
  }

  if (skills.interests.length > 0) {
    lines.push(`Areas of interest: ${skills.interests.join(", ")}`);
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function serializeContact(profile: Profile): string {
  const lines: string[] = ["Contact Information", ""];
  lines.push(`Email: ${profile.email}`);
  for (const social of profile.socials) {
    if (social.id === "email") continue;
    lines.push(`${social.label}: ${social.handle ?? social.url}`);
  }
  return lines.join("\n") + "\n";
}

export function serializeCertification(cert: Certification): string {
  const lines: string[] = [cert.title, ""];
  lines.push(`Status:    ${cert.status}`);
  if (cert.provider) lines.push(`Provider:  ${cert.provider}`);
  if (cert.issued) lines.push(`Issued:    ${cert.issued}`);
  if (cert.completed) lines.push(`Completed: ${cert.completed}`);
  if (cert.expires) lines.push(`Expires:   ${cert.expires}`);
  lines.push("");
  lines.push(cert.description);
  if (cert.credentialUrl) {
    lines.push("");
    lines.push(`Credential: ${cert.credentialUrl}`);
  }
  return lines.join("\n") + "\n";
}

export function serializeCtf(ctf: CtfContent): string {
  const lines: string[] = [ctf.headline, "", ctf.intro];
  ctf.focusAreas.forEach((area) => lines.push(bullet(area)));
  if (ctf.closing) {
    lines.push("");
    lines.push(ctf.closing);
  }
  return lines.join("\n") + "\n";
}

export function serializeTools(tools: ToolsContent): string {
  const lines: string[] = [tools.headline, "", tools.intro];
  tools.items.forEach((item) => lines.push(bullet(item)));
  if (tools.closing) {
    lines.push("");
    lines.push(tools.closing);
  }
  return lines.join("\n") + "\n";
}

export function serializeProjectsReadme(githubUsername: string): string {
  return [
    "Projects",
    "",
    "Project data is fetched live from GitHub rather than stored here.",
    `Profile: https://github.com/${githubUsername}`,
    "",
    "Run `projects` in the terminal to browse them in Firefox.",
    "",
  ].join("\n");
}
