"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_DOCUMENTS, isDocumentKey, type DocumentKey } from "@/content";
import { resolveStoredDocuments, validateDocument, type ValidationIssue } from "@/content/schema";
import type { Certification, CustomCommand } from "@/content/types";
import { CONTENT_TAG, DOCUMENTS_TABLE } from "@/lib/content/repository";
import { isAllowedAdminEmail, isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { CERTIFICATE_BUCKET, pathFromPublicUrl } from "@/lib/supabase/storage";
import { getCommand } from "@/lib/terminal/registry";
import { getAdminUser } from "./auth";
import { ACCESS_COOKIE, type AuthFormState, type SaveResult } from "./types";

const INVALID_LOGIN = "Invalid email or password.";
const NOT_ADMIN =
  "You are signed in but your account is not in admin_users, so the database refused the write. Run the admin_users SQL from docs/SUPABASE_SETUP.md.";

export async function signInAction(
  _previous: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  if (!isSupabaseConfigured()) return { error: "Supabase is not configured yet." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  // Same message as a wrong password, so the allowlist is not discoverable.
  if (!isAllowedAdminEmail(email) || email.length > 254 || password.length > 1024) {
    return { error: INVALID_LOGIN };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return { error: INVALID_LOGIN };

  if (!isAllowedAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    return { error: "This account is not authorized to use the admin dashboard." };
  }

  // One-shot UI marker: the dashboard plays its access sequence, then clears it.
  cookies().set(ACCESS_COOKIE, "1", {
    path: "/admin",
    maxAge: 120,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin");
}

export async function signOutAction(): Promise<void> {
  if (isSupabaseConfigured()) {
    await createSupabaseServerClient().auth.signOut();
  }
  redirect("/admin/login");
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Custom commands may never shadow a built-in (ls, cd, help, ...). */
function builtinCollisions(commands: CustomCommand[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  commands.forEach((command, index) => {
    if (getCommand(command.name)) {
      issues.push({ path: `${index}.name`, message: `"${command.name}" is a built-in command` });
    }
    command.aliases.forEach((alias) => {
      if (getCommand(alias)) {
        issues.push({ path: `${index}.aliases`, message: `"${alias}" is a built-in command` });
      }
    });
  });
  return issues;
}

/** Best effort: removes bucket images no longer referenced. Never fails the save. */
async function removeUnusedCertificateImages(
  supabase: SupabaseClient,
  before: Certification[],
  after: Certification[]
) {
  const kept = new Set(after.map((cert) => cert.image));
  const stale = before
    .filter((cert) => !kept.has(cert.image))
    .map((cert) => pathFromPublicUrl(cert.image))
    .filter((path): path is string => path !== null);
  if (stale.length === 0) return;

  try {
    const { error } = await supabase.storage.from(CERTIFICATE_BUCKET).remove(stale);
    if (error) console.warn("[admin] Could not remove old certificate images:", error.message);
  } catch (error) {
    console.warn("[admin] Could not remove old certificate images:", error);
  }
}

/**
 * Validates and stores one document as the signed-in admin.
 *
 * Object documents are shallow-merged over the current stored version, so
 * pages that edit different fields of the same document (Profile vs Socials)
 * never overwrite each other. List documents are replaced wholesale.
 */
export async function saveDocumentAction(key: DocumentKey, value: unknown): Promise<SaveResult> {
  if (!isDocumentKey(key)) return { ok: false, error: "Unknown document." };
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase is not configured, so changes cannot be saved." };
  }
  if (!(await getAdminUser())) {
    return { ok: false, error: "Your session has expired or is not authorized. Sign in again." };
  }

  const supabase = createSupabaseServerClient();
  const { data: row, error: readError } = await supabase
    .from(DOCUMENTS_TABLE)
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (readError) {
    return { ok: false, error: `Could not read the current ${key}: ${readError.message}` };
  }

  const current = resolveStoredDocuments(row ? { [key]: row.data } : {}).documents[key];

  let candidate: unknown;
  if (Array.isArray(DEFAULT_DOCUMENTS[key])) {
    if (!Array.isArray(value)) return { ok: false, error: "Expected a list." };
    candidate = value;
  } else {
    if (!isPlainObject(value)) return { ok: false, error: "Expected an object." };
    candidate = { ...(current as object), ...value };
  }

  const result = validateDocument(key, candidate);
  if (!result.ok) {
    return { ok: false, error: "Some fields need attention.", issues: result.issues };
  }

  if (key === "commands") {
    const issues = builtinCollisions(result.value as CustomCommand[]);
    if (issues.length > 0) return { ok: false, error: "Some fields need attention.", issues };
  }

  const { data: saved, error } = await supabase
    .from(DOCUMENTS_TABLE)
    .upsert({ key, data: result.value }, { onConflict: "key" })
    .select("updated_at")
    .single();

  if (error || !saved) {
    const denied = !error || error.code === "42501" || error.code === "PGRST116";
    return { ok: false, error: denied ? NOT_ADMIN : `Save failed: ${error.message}` };
  }

  if (key === "certifications" && row) {
    await removeUnusedCertificateImages(
      supabase,
      current as Certification[],
      result.value as Certification[]
    );
  }

  revalidateTag(CONTENT_TAG);
  revalidatePath("/");
  revalidatePath("/api/github");
  revalidatePath("/admin", "layout");

  return { ok: true, updatedAt: saved.updated_at, value: result.value };
}
