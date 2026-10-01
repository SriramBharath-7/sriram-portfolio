import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_DOCUMENTS } from "@/content/documents";
import { resolveStoredDocuments } from "@/content/schema";
import { pathFromPublicUrl } from "@/lib/supabase/storage";

test("invalid stored documents fall back to the default, per key", () => {
  const about = { ...DEFAULT_DOCUMENTS.about, headline: "Edited in the admin" };
  const { documents, invalid } = resolveStoredDocuments({
    about,
    certifications: [{ id: "Not A Slug", title: "" }],
  });

  assert.deepEqual(invalid, ["certifications"]);
  assert.equal(documents.about.headline, "Edited in the admin");
  assert.deepEqual(documents.certifications, DEFAULT_DOCUMENTS.certifications);
  assert.deepEqual(documents.skills, DEFAULT_DOCUMENTS.skills);
});

test("stored documents missing newer fields pick up their defaults", () => {
  const { githubWidget: _dropped, ...olderSettings } = DEFAULT_DOCUMENTS.settings;
  const { documents, invalid } = resolveStoredDocuments({
    settings: { ...olderSettings, boot: { messages: ["Booting"] } },
  });

  assert.deepEqual(invalid, []);
  assert.deepEqual(documents.settings.boot.messages, ["Booting"]);
  assert.deepEqual(documents.settings.githubWidget, DEFAULT_DOCUMENTS.settings.githubWidget);
});

test("pathFromPublicUrl only recognizes objects in the certificates bucket", () => {
  const base = "https://abc.supabase.co";
  const prefix = `${base}/storage/v1/object/public/certificates/`;

  assert.equal(pathFromPublicUrl(`${prefix}certs/my%20cert-1.png`, base), "certs/my cert-1.png");
  assert.equal(pathFromPublicUrl(`${prefix}certs/a.webp?v=2`, base), "certs/a.webp");
  assert.equal(pathFromPublicUrl("/assets/certs/How%20to%20use%20Ai.jpg", base), null);
  assert.equal(pathFromPublicUrl(`${base}/storage/v1/object/public/avatars/x.png`, base), null);
  assert.equal(pathFromPublicUrl(`${prefix}certs/..%2F..%2Fsecret`, base), null);
  assert.equal(pathFromPublicUrl(`${prefix}certs/a.png`, null), null);
});
