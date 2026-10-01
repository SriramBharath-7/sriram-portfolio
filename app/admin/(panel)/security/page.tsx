import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import DocumentNotice from "@/components/admin/DocumentNotice";
import SecurityEditor from "@/components/admin/editors/SecurityEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "CTF & Tools" };

export default async function SecurityPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader title="CTF & Tools" description="Your security focus: CTF learning areas and the tools you work with." />
      <DocumentNotice payload={payload} keys={["ctf", "tools"]}>
        <SecurityEditor ctf={payload.documents.ctf} tools={payload.documents.tools} />
      </DocumentNotice>
    </>
  );
}
