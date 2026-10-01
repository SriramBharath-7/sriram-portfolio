import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import EducationEditor from "@/components/admin/editors/EducationEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Education" };

export default async function EducationPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader title="Education" description="Entries and goals shown by the Education page, education.txt and the education command." />
      <DocumentNotice payload={payload} keys={["education"]}>
        <EducationEditor education={payload.documents.education} />
      </DocumentNotice>
    </>
  );
}
