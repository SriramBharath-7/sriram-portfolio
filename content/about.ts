import type { About } from "./types";

export const about: About = {
  headline: "🛡️ Aspiring Ethical Hacker and Cybersecurity Expert",
  sections: [
    {
      id: "about-me",
      title: "ABOUT ME",
      body: "I'm a passionate Computer Science Engineering student with a deep interest in cybersecurity, ethical hacking, and information security. Currently pursuing my degree while actively learning and practicing security concepts.",
    },
    {
      id: "programming-languages",
      title: "PROGRAMMING LANGUAGES",
      bullets: [
        {
          label: "Python",
          description: "Learning automation and security tools development",
          highlightClass: "lang-python",
        },
        {
          label: "Bash",
          description: "System automation and basic scripting",
          highlightClass: "lang-bash",
        },
        {
          label: "PowerShell",
          description: "Windows system administration basics",
          highlightClass: "lang-ps",
        },
        {
          label: "Java",
          description: "Object-oriented programming fundamentals",
          highlightClass: "lang-java",
        },
        {
          label: "HTML/CSS/JS",
          description: "Web development basics",
          highlightClass: "lang-html",
        },
        {
          label: "Markdown",
          description: "Documentation and content creation",
          highlightClass: "lang-markdown",
        },
      ],
    },
    {
      id: "learning-areas",
      title: "LEARNING AREAS",
      bullets: [
        {
          label: "Network Security",
          description: "Understanding protocols and vulnerabilities",
          highlightClass: "skill-highlight",
        },
        {
          label: "Web Security",
          description: "Learning about OWASP Top 10 and web vulnerabilities",
          highlightClass: "skill-highlight",
        },
        {
          label: "Penetration Testing",
          description: "Ethical hacking methodologies",
          highlightClass: "skill-highlight",
        },
        {
          label: "OSINT",
          description: "Open source intelligence gathering techniques",
          highlightClass: "skill-highlight",
        },
      ],
    },
    {
      id: "education-goals",
      title: "EDUCATION & GOALS",
      bullets: [
        { label: "Bachelor of Engineering in Computer Science (In Progress)" },
        { label: "Learning cybersecurity fundamentals and ethical hacking concepts" },
        {
          label:
            "Planning to pursue certifications like CEH, CompTIA Security+, and OSCP",
        },
        { label: "Active participation in CTF challenges and security communities" },
      ],
    },
    {
      id: "interests",
      title: "INTERESTS",
      body: "Passionate about understanding how systems work, finding vulnerabilities, and learning defensive security measures. Currently focused on building a strong foundation in cybersecurity concepts, tools, and methodologies.",
    },
    {
      id: "projects",
      title: "PROJECTS",
      body: "Working on various cybersecurity projects including vulnerability assessment tools, security awareness applications, and learning platforms. Always eager to contribute to open-source security projects and collaborate with the cybersecurity community.",
    },
  ],
};
