import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import CertificationsEditor from "@/components/admin/editors/CertificationsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Certifications" };

export default async function CertificationsPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader
        title="Certifications"
        description="Add, edit, reorder and remove certificates. Images upload to Supabase Storage."
      />
      <DocumentNotice payload={payload} keys={["certifications"]}>
        <CertificationsEditor certifications={payload.documents.certifications} />
      </DocumentNotice>
    </>
  );
}
