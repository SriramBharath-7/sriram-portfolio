import { cookies } from "next/headers";
import AdminShell from "@/components/admin/AdminShell";
import { NAV_ITEMS } from "@/components/admin/nav";
import { systemInfo } from "@/components/admin/system";
import { requireAdmin } from "@/lib/admin/auth";
import { loadAccessChecks } from "@/lib/admin/data";
import { ACCESS_COOKIE, type AccessReport } from "@/lib/admin/types";

export const dynamic = "force-dynamic";

/** Every page under here requires a signed-in, allow-listed admin. */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  // Right after sign-in only: gather the real checks the access sequence shows.
  let access: AccessReport | undefined;
  if (cookies().get(ACCESS_COOKIE)) {
    access = { email: user.email, modules: NAV_ITEMS.length, ...(await loadAccessChecks()) };
  }

  return (
    <AdminShell email={user.email} system={systemInfo()} access={access}>
      {children}
    </AdminShell>
  );
}
