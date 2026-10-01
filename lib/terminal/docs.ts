/**
 * Maps the runtime content onto the terminal's structured document blocks.
 * Replaces the old HTML-string formatters; nothing here emits markup.
 */
import type { ContentSection, PortfolioContent } from "@/content/types";
import type { DocBlock, TerminalLine } from "./types";

export function aboutDoc({ about }: PortfolioContent): TerminalLine {
  const blocks: DocBlock[] = about.sections.map((section) => ({
    heading: section.title,
    body: section.body,
    bullets: section.bullets?.map((bullet) => ({
      label: bullet.label,
      description: bullet.description,
      highlightClass: bullet.highlightClass,
    })),
  }));

  return { kind: "doc", title: about.headline, blocks };
}

export function skillsDoc({ skills }: PortfolioContent): TerminalLine {
  const blocks: DocBlock[] = skills.groups.map((group) => ({
    heading: group.title,
    bullets: group.items.map((item) => ({
      label: item.name,
      description: item.description,
      highlightClass: item.highlightClass,
    })),
  }));

  if (skills.interests.length > 0) {
    blocks.push({
      heading: "AREAS OF INTEREST",
      body: skills.interests.join(", "),
    });
  }

  return { kind: "doc", title: skills.headline, blocks };
}

export function educationDoc({ education }: PortfolioContent): TerminalLine {
  const blocks: DocBlock[] = [];

  for (const entry of education.entries) {
    blocks.push({
      heading: `${entry.degree} (${entry.status})`,
      body: entry.notes,
      bullets: entry.coursework.map((course) => ({ label: course })),
    });
  }

  if (education.goals.length > 0) {
    blocks.push({
      heading: "GOALS",
      bullets: education.goals.map((goal) => ({
        label: goal.title,
        description: goal.description,
        highlightClass: "skill-highlight",
      })),
    });
  }

  return { kind: "doc", title: education.headline, blocks };
}

export function certificationsDoc({ certifications }: PortfolioContent): TerminalLine {
  return {
    kind: "doc",
    title: "Certifications",
    blocks: [
      {
        bullets: certifications.map((cert) => ({
          label: cert.title,
          description: [cert.provider, cert.completed || cert.issued, cert.status]
            .filter(Boolean)
            .join(" · "),
          highlightClass: "skill-highlight",
        })),
      },
    ],
  };
}

export function ctfDoc({ ctf }: PortfolioContent): TerminalLine {
  return {
    kind: "doc",
    title: ctf.headline,
    blocks: [
      {
        heading: ctf.intro,
        bullets: ctf.focusAreas.map((area) => ({
          label: area,
          highlightClass: "skill-highlight",
        })),
      },
      ...(ctf.closing ? [{ body: ctf.closing }] : []),
    ],
  };
}

export function toolsDoc({ tools }: PortfolioContent): TerminalLine {
  return {
    kind: "doc",
    title: tools.headline,
    blocks: [
      {
        heading: tools.intro,
        bullets: tools.items.map((item) => ({ label: item })),
      },
      ...(tools.closing ? [{ body: tools.closing }] : []),
    ],
  };
}

export function contactLines({ profile }: PortfolioContent): TerminalLine[] {
  const rows = [{ label: "Email", value: profile.email }];
  for (const social of profile.socials) {
    if (social.id === "email") continue;
    rows.push({ label: social.label, value: social.handle || social.url });
  }
  return [
    { kind: "text", text: "Contact Information", tone: "accent" },
    { kind: "table", rows },
  ];
}

export function whoamiLines({ profile, about }: PortfolioContent): TerminalLine[] {
  return [
    {
      kind: "table",
      rows: [
        { label: "User", value: profile.name },
        { label: "Role", value: `${profile.role} · ${about.headline}` },
        { label: "Status", value: profile.status },
      ],
    },
  ];
}

/** One portfolio section as terminal output; shared by built-ins and custom commands. */
export function sectionLines(section: ContentSection, content: PortfolioContent): TerminalLine[] {
  switch (section) {
    case "about":
      return [aboutDoc(content)];
    case "skills":
      return [skillsDoc(content)];
    case "education":
      return [educationDoc(content)];
    case "certifications":
      return [certificationsDoc(content)];
    case "ctf":
      return [ctfDoc(content)];
    case "tools":
      return [toolsDoc(content)];
    case "contact":
      return contactLines(content);
    case "whoami":
      return whoamiLines(content);
  }
}
