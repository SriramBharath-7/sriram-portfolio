import { test } from "node:test";
import assert from "node:assert/strict";
import { applyRepoOverrides } from "@/lib/github/fetch";
import type { Repo } from "@/lib/github/types";

function repo(name: string, extra: Partial<Repo> = {}): Repo {
  return {
    id: name.length,
    name,
    description: `${name} description`,
    url: `https://github.com/u/${name}`,
    homepage: null,
    language: "TypeScript",
    stars: 0,
    forks: 0,
    topics: [],
    updatedAt: "2025-01-01T00:00:00Z",
    fork: false,
    archived: false,
    ...extra,
  };
}

const repos = [
  repo("popular", { stars: 50 }),
  repo("recent", { stars: 5, updatedAt: "2025-06-01T00:00:00Z" }),
  repo("older", { stars: 5 }),
  repo("forked", { fork: true, stars: 99 }),
  repo("archived", { archived: true, stars: 99 }),
  repo("secret", { stars: 99 }),
  repo("pin-b"),
  repo("pin-a"),
];

test("hides forks, archived and hidden repos; featured first in configured order", () => {
  const result = applyRepoOverrides(repos, {
    excludeForks: true,
    repos: [
      { name: "Secret", hidden: true }, // names match case-insensitively
      { name: "pin-a", featured: true },
      { name: "pin-b", featured: true, description: "Better text", homepage: "https://demo.dev" },
    ],
  });

  assert.deepEqual(
    result.map((r) => r.name),
    ["pin-a", "pin-b", "popular", "recent", "older"]
  );
  assert.equal(result[0].featured, true);
  assert.equal(result[2].featured, undefined);

  const pinB = result.find((r) => r.name === "pin-b")!;
  assert.equal(pinB.description, "Better text");
  assert.equal(pinB.homepage, "https://demo.dev");
});

test("keeps forks when excludeForks is off and ignores empty overrides", () => {
  const result = applyRepoOverrides(repos, {
    excludeForks: false,
    repos: [{ name: "popular", description: "", homepage: "" }],
  });

  assert.ok(result.some((r) => r.name === "forked"));
  assert.ok(!result.some((r) => r.name === "archived"));
  assert.equal(result.find((r) => r.name === "popular")!.description, "popular description");
});
