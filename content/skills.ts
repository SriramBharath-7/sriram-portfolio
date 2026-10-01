import type { Skills } from "./types";

export const skills: Skills = {
  headline: "Programming Languages & Technical Skills",
  intro: "Learning and practicing:",
  groups: [
    {
      id: "languages",
      title: "Languages & Scripting",
      items: [
        {
          id: "python",
          name: "Python",
          description: "Automation and security tools development",
          highlightClass: "lang-python",
        },
        {
          id: "bash",
          name: "Bash Scripting",
          description: "System automation and basic scripting",
          highlightClass: "lang-bash",
        },
        {
          id: "powershell",
          name: "PowerShell",
          description: "Windows system administration basics",
          highlightClass: "lang-ps",
        },
        {
          id: "java",
          name: "Java",
          description: "Object-oriented programming fundamentals",
          highlightClass: "lang-java",
        },
        {
          id: "web",
          name: "HTML/CSS/JavaScript",
          description: "Web development basics",
          highlightClass: "lang-html",
        },
        {
          id: "markdown",
          name: "Markdown",
          description: "Documentation and content creation",
          highlightClass: "lang-markdown",
        },
      ],
    },
  ],
  interests: [
    "Network security",
    "web security",
    "penetration testing",
    "OSINT",
  ],
};
