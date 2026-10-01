import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DEFAULT_DOCUMENTS, DOCUMENT_KEYS } from "@/content/documents";
import { buildSeedSql } from "../scripts/generate-seed";

const STATEMENT = /values \('(\w+)', (\$seed\d*\$)([\s\S]*?)\2::jsonb\)/g;

function parseSeed(sql: string): Record<string, unknown> {
  return Object.fromEntries(
    [...sql.matchAll(STATEMENT)].map(([, key, , json]) => [key, JSON.parse(json)])
  );
}

test("seed SQL round-trips every default document", () => {
  const parsed = parseSeed(buildSeedSql());
  assert.deepEqual(Object.keys(parsed).sort(), [...DOCUMENT_KEYS].sort());
  for (const key of DOCUMENT_KEYS) {
    assert.deepEqual(parsed[key], JSON.parse(JSON.stringify(DEFAULT_DOCUMENTS[key])), key);
  }
});

test("seed SQL never overwrites existing rows", () => {
  const sql = buildSeedSql();
  const statements = sql.split(";").filter((part) => part.includes("insert into"));
  assert.equal(statements.length, DOCUMENT_KEYS.length);
  for (const statement of statements) assert.match(statement, /on conflict \(key\) do nothing$/);
});

test("committed supabase/seed.sql is up to date (run `npm run seed:sql`)", () => {
  const committed = readFileSync(join(process.cwd(), "supabase", "seed.sql"), "utf8");
  assert.equal(committed.replace(/\r\n/g, "\n"), buildSeedSql());
});
