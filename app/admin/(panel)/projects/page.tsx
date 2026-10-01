import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import { listRepositoriesForAdmin } from "@/lib/admin/github";
import DocumentNotice from "@/components/admin/DocumentNotice";
import ProjectsEditor from "@/components/admin/editors/ProjectsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const payload = await loadAdminDocuments();
  const username = payload.documents.profile.githubUsername;
  const live = await listRepositoriesForAdmin(username);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Portfolio metadata layered over your live GitHub repositories. Nothing is copied into the database except these settings."
      />
      <DocumentNotice payload={payload} keys={["projects"]}>
        <ProjectsEditor
          projects={payload.documents.projects}
          username={username}
          repos={"repos" in live ? live.repos : null}
          repoError={"error" in live ? live.error : undefined}
        />
      </DocumentNotice>
    </>
  );
}
