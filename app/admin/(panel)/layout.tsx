import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

/** Every page under here requires a signed-in, allow-listed admin. */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return <AdminShell email={user.email}>{children}</AdminShell>;
}
