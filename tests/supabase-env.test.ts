import { test } from "node:test";
import assert from "node:assert/strict";
import { getSupabaseEnv, isAllowedAdminEmail, isSupabaseConfigured } from "@/lib/supabase/env";

function withEnv(values: Record<string, string | undefined>, run: () => void) {
  const saved = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    run();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("Supabase is configured by the URL plus the publishable key", () => {
  withEnv(
    {
      NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co/",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
    },
    () => {
      assert.equal(isSupabaseConfigured(), true);
      assert.deepEqual(getSupabaseEnv(), {
        url: "https://abc.supabase.co",
        publishableKey: "sb_publishable_test",
      });
    }
  );
});

test("without the publishable key the site stays on static content", () => {
  withEnv(
    { NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: undefined },
    () => {
      assert.equal(isSupabaseConfigured(), false);
      assert.throws(() => getSupabaseEnv(), /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
    }
  );
});

test("the admin allowlist is case-insensitive and denies by default", () => {
  withEnv({ ADMIN_EMAILS: " Admin@Example.com ,other@example.com" }, () => {
    assert.equal(isAllowedAdminEmail("admin@example.com"), true);
    assert.equal(isAllowedAdminEmail("intruder@example.com"), false);
  });
  withEnv({ ADMIN_EMAILS: undefined }, () => {
    assert.equal(isAllowedAdminEmail("admin@example.com"), false);
  });
});
