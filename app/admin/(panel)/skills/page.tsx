import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import SkillsEditor from "@/components/admin/editors/SkillsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Skills" };

export default async function SkillsPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader title="Skills" description="Grouped skills for the Skills page, skills.txt, the skills command and neofetch." />
      <DocumentNotice payload={payload} keys={["skills"]}>
        <SkillsEditor skills={payload.documents.skills} />
      </DocumentNotice>
    </>
  );
}
