import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { DEFAULT_DOCUMENTS, assembleContent, type PortfolioDocuments } from "@/content/documents";
import type { PortfolioContent } from "@/content/types";
import { runCommand } from "@/lib/terminal/execute";
import { PortfolioContentProvider } from "@/lib/content/provider";
import AboutPage from "@/components/firefox/pages/AboutPage";

const HOME = "/home/sriram";

function contentWith(patch: Partial<PortfolioDocuments>): PortfolioContent {
  return assembleContent({ ...DEFAULT_DOCUMENTS, ...patch });
}

function run(input: string, content: PortfolioContent) {
  return JSON.stringify(
    runCommand(input, {
      cwd: HOME,
      history: [],
      setCwd: () => {},
      clearScreen: () => {},
      openApp: () => {},
      openExternal: () => {},
      exit: () => {},
      content,
    })
  );
}

test("one About edit reaches the about command, cat about.txt and the Firefox About page", () => {
  const content = contentWith({
    about: {
      headline: "Edited headline",
      sections: [{ id: "bio", title: "BIO", body: "Written in the admin dashboard" }],
    },
  });

  assert.match(run("about", content), /Edited headline/);
  assert.match(run("about", content), /Written in the admin dashboard/);

  const cat = run("cat about.txt", content);
  assert.match(cat, /Written in the admin dashboard/);
  assert.doesNotMatch(cat, /passionate Computer Science/, "static default must not leak");

  const html = renderToStaticMarkup(
    createElement(PortfolioContentProvider, { content, children: createElement(AboutPage) })
  );
  assert.match(html, /Edited headline/);
  assert.match(html, /Written in the admin dashboard/);
});

test("the certifications directory is rebuilt from runtime content", () => {
  const content = contentWith({
    certifications: [
      {
        id: "security-plus",
        title: "CompTIA Security+",
        provider: "CompTIA",
        status: "Completed",
        completed: "2026-09-01",
        description: "Core security concepts.",
        image: "https://example.supabase.co/storage/v1/object/public/certificates/certs/a.png",
      },
    ],
  });

  const listing = run("ls certifications", content);
  assert.match(listing, /security-plus\.txt/);
  assert.doesNotMatch(listing, /how-to-use-ai/);
  assert.match(run("cat certifications/security-plus.txt", content), /CompTIA Security\+/);
});

test("hidden social links disappear from contact and contact.txt", () => {
  const socials = DEFAULT_DOCUMENTS.profile.socials.map((social) =>
    social.id === "linkedin" ? { ...social, enabled: false } : social
  );
  const content = contentWith({ profile: { ...DEFAULT_DOCUMENTS.profile, socials } });

  assert.doesNotMatch(run("contact", content), /LinkedIn/);
  assert.doesNotMatch(run("cat contact.txt", content), /LinkedIn/);
  assert.match(run("contact", content), /GitHub/);
  assert.ok(!content.bookmarks.some((bookmark) => bookmark.id === "linkedin"));
});

test("neofetch and whoami read the runtime profile", () => {
  const content = contentWith({ profile: { ...DEFAULT_DOCUMENTS.profile, name: "New Name", status: "Open to work" } });
  assert.match(run("neofetch", content), /New Name/);
  assert.match(run("whoami", content), /Open to work/);
});

test("static fallback content equals the assembled defaults", async () => {
  const { content } = await import("@/content");
  assert.deepEqual(content, assembleContent(DEFAULT_DOCUMENTS));
  assert.equal(content.projects.githubUsername, content.profile.githubUsername);
});
