import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import AppsEditor from "@/components/admin/editors/AppsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Applications" };

export default async function AppsPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader title="Applications" description="Desktop icons, taskbar entries and shortcuts from the app registry." />
      <DocumentNotice payload={payload} keys={["apps"]}>
        <AppsEditor apps={payload.documents.apps} />
      </DocumentNotice>
    </>
  );
}
