import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import SocialsEditor from "@/components/admin/editors/SocialsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Socials" };

export default async function SocialsPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader title="Socials" description="GitHub, email, LinkedIn and any future links. Toggle visibility without deleting." />
      <DocumentNotice payload={payload} keys={["profile"]}>
        <SocialsEditor profile={payload.documents.profile} />
      </DocumentNotice>
    </>
  );
}
