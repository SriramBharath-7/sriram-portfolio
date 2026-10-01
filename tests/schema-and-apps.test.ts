import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_DOCUMENTS } from "@/content/documents";
import { validateDocument } from "@/content/schema";
import { resolveApps } from "@/lib/apps/resolve";

const cert = DEFAULT_DOCUMENTS.certifications[0];

test("certificate images must be a /public path or an https URL", () => {
  const withImage = (image: string) => validateDocument("certifications", [{ ...cert, image }]);
  assert.ok(withImage("/assets/certs/a.png").ok);
  assert.ok(withImage("https://abc.supabase.co/storage/v1/object/public/certificates/a.png").ok);
  assert.ok(!withImage("javascript:alert(1)").ok);
  assert.ok(!withImage("//evil.example/a.png").ok);
  assert.ok(!withImage("http://insecure.example/a.png").ok);
});

test("custom command names and aliases share one namespace", () => {
  const command = {
    id: "a",
    name: "alpha",
    aliases: ["shared"],
    description: "x",
    enabled: true,
    response: { type: "text", text: "x" },
  };
  const result = validateDocument("commands", [command, { ...command, id: "b", name: "shared", aliases: [] }]);
  assert.ok(!result.ok);
  assert.ok(!result.ok && result.issues.some((issue) => issue.path === "1.name"));
});

test("built-in window apps cannot be removed or change type", () => {
  const withoutTerminal = DEFAULT_DOCUMENTS.apps.filter((app) => app.id !== "terminal");
  assert.ok(!validateDocument("apps", withoutTerminal).ok);

  const retyped = DEFAULT_DOCUMENTS.apps.map((app) => (app.id === "firefox" ? { ...app, kind: "link" as const } : app));
  assert.ok(!validateDocument("apps", retyped).ok);

  const shortcut = {
    id: "certs",
    kind: "route" as const,
    name: "Certificates",
    icon: "/assets/svg/firefox.svg",
    enabled: true,
    showOnDesktop: true,
    showInTaskbar: false,
    url: "home://certifications",
  };
  assert.ok(validateDocument("apps", [...DEFAULT_DOCUMENTS.apps, shortcut]).ok);
  assert.ok(!validateDocument("apps", [...DEFAULT_DOCUMENTS.apps, { ...shortcut, url: "home://nope" }]).ok);
});

test("resolveApps keeps registry window behaviour and applies safe metadata", () => {
  const apps = resolveApps([
    { ...DEFAULT_DOCUMENTS.apps[0], name: "Shell", icon: "/assets/svg/tools.svg" },
    DEFAULT_DOCUMENTS.apps[1],
    {
      id: "blog",
      kind: "link",
      name: "Blog",
      icon: "/assets/svg/tools.svg",
      enabled: true,
      showOnDesktop: true,
      showInTaskbar: true,
      url: "https://dev.to/sriram_bharath",
    },
  ]);

  const terminal = apps.find((app) => app.id === "terminal")!;
  assert.equal(terminal.window?.name, "Shell");
  assert.equal(terminal.window?.singleton, true, "behaviour still comes from the code registry");
  assert.ok(terminal.window?.defaultSize.large.maxWidthPx);

  const blog = apps.find((app) => app.id === "blog")!;
  assert.equal(blog.window, undefined);
  assert.equal(blog.showInTaskbar, false, "shortcuts never get a taskbar entry");
});
