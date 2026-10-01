import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import SettingsEditor from "@/components/admin/editors/SettingsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader title="Settings" description="Desktop copy (welcome popup, boot screen, terminal greeting), the GitHub widget and blog sources." />
      <DocumentNotice payload={payload} keys={["settings", "blog"]}>
        <SettingsEditor settings={payload.documents.settings} blog={payload.documents.blog} />
      </DocumentNotice>
    </>
  );
}
