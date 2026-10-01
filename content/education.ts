import type { Education } from "./types";

export const education: Education = {
  headline: "My Education",
  entries: [
    {
      id: "be-cse",
      degree: "Bachelor of Engineering in Computer Science",
      status: "Currently pursuing",
      coursework: [
        "Computer Networks and Security",
        "Operating Systems",
        "Programming Fundamentals",
        "Data Structures and Algorithms",
        "Web Technologies",
        "Database Management Systems",
      ],
      notes:
        "Currently learning cybersecurity concepts and ethical hacking methodologies.",
    },
  ],
  goals: [
    {
      id: "ceh",
      title: "CEH (Certified Ethical Hacker)",
      description: "Planning to pursue",
    },
    {
      id: "security-plus",
      title: "CompTIA Security+",
      description: "Foundation certification goal",
    },
    {
      id: "oscp",
      title: "OSCP (Offensive Security Certified Professional)",
      description: "Long-term goal",
    },
    {
      id: "ctf",
      title: "Active participation in CTF challenges and security communities",
    },
  ],
};
