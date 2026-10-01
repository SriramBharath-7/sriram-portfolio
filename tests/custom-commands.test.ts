import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_DOCUMENTS, assembleContent } from "@/content/documents";
import type { CustomCommand, PortfolioContent } from "@/content/types";
import { runCommand } from "@/lib/terminal/execute";
import { complete } from "@/lib/terminal/completion";

function contentWith(commands: CustomCommand[]): PortfolioContent {
  return assembleContent({ ...DEFAULT_DOCUMENTS, commands });
}

function run(input: string, content: PortfolioContent) {
  const opened: { appId: string; props?: Record<string, unknown> }[] = [];
  const external: string[] = [];
  const lines = runCommand(input, {
    cwd: "/home/sriram",
    history: [],
    setCwd: () => {},
    clearScreen: () => {},
    openApp: (appId, props) => opened.push({ appId, props }),
    openExternal: (url) => external.push(url),
    exit: () => {},
    content,
  });
  return { output: JSON.stringify(lines), opened, external };
}

const base: Omit<CustomCommand, "id" | "name" | "response"> = {
  aliases: [],
  description: "test command",
  enabled: true,
};

test("an enabled text command prints its text; aliases work", () => {
  const content = contentWith([
    { ...base, id: "quote", name: "quote", aliases: ["q"], response: { type: "text", text: "Stay curious." } },
  ]);
  assert.match(run("quote", content).output, /Stay curious\./);
  assert.match(run("q", content).output, /Stay curious\./);
});

test("disabled commands are not runnable", () => {
  const content = contentWith([
    { ...base, id: "quote", name: "quote", enabled: false, response: { type: "text", text: "hidden" } },
  ]);
  assert.match(run("quote", content).output, /command not found/);
});

test("built-in commands always win over a stored command with the same name", () => {
  const content = contentWith([
    { ...base, id: "ls", name: "ls", response: { type: "text", text: "HIJACKED" } },
  ]);
  const { output } = run("ls", content);
  assert.doesNotMatch(output, /HIJACKED/);
  assert.match(output, /about\.txt/);
});

test("--help prints the help text", () => {
  const content = contentWith([
    { ...base, id: "resume", name: "resume", help: "Opens my resume.", response: { type: "route", url: "home://about" } },
  ]);
  const { output, opened } = run("resume --help", content);
  assert.match(output, /Opens my resume\./);
  assert.equal(opened.length, 0, "--help must not trigger the action");
});

test("route, app and url responses go through the window manager / external opener", () => {
  const content = contentWith([
    { ...base, id: "about-page", name: "aboutpage", response: { type: "route", url: "home://about" } },
    { ...base, id: "term", name: "term", response: { type: "app", appId: "terminal" } },
    { ...base, id: "github", name: "github", response: { type: "url", url: "https://github.com/SriramBharath-7" } },
  ]);

  assert.deepEqual(run("aboutpage", content).opened, [{ appId: "firefox", props: { url: "home://about" } }]);
  assert.deepEqual(run("term", content).opened, [{ appId: "terminal", props: undefined }]);
  assert.deepEqual(run("github", content).external, ["https://github.com/SriramBharath-7"]);
});

test("unsafe links stored directly in the database are refused at runtime", () => {
  const content = contentWith([
    // Bypasses the admin validation on purpose, as a hand-edited row would.
    { ...base, id: "evil", name: "evil", response: { type: "url", url: "javascript:alert(1)" } },
  ]);
  const { output, external } = run("evil", content);
  assert.equal(external.length, 0);
  assert.match(output, /refusing/);
});

test("content responses print a portfolio section", () => {
  const content = contentWith([
    { ...base, id: "certs-list", name: "mycerts", response: { type: "content", section: "certifications" } },
  ]);
  assert.match(run("mycerts", content).output, /How to use AI effectively/);
});

test("help lists custom commands under Custom, and tab completion offers them", () => {
  const content = contentWith([
    { ...base, id: "resume", name: "resume", description: "Open my resume", response: { type: "route", url: "home://about" } },
  ]);
  const { output } = run("help", content);
  assert.match(output, /"title":"Custom"/);
  assert.match(output, /Open my resume/);

  assert.equal(complete("resu", "/home/sriram", content).line, "resume");
});
