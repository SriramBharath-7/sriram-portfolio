import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import ProfileEditor from "@/components/admin/editors/ProfileEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Profile & About" };

export default async function ProfilePage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader
        title="Profile & About"
        description="Who you are and what the About section says. Social links live on their own page."
      />
      <DocumentNotice payload={payload} keys={["profile", "about"]}>
        <ProfileEditor profile={payload.documents.profile} about={payload.documents.about} />
      </DocumentNotice>
    </>
  );
}
