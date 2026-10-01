import type { Metadata } from "next";
import { loadAdminDocuments } from "@/lib/admin/data";
import { builtinCommandNames } from "@/lib/terminal/registry";
import DocumentNotice from "@/components/admin/DocumentNotice";
import CommandsEditor from "@/components/admin/editors/CommandsEditor";
import { PageHeader } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Terminal commands" };

export default async function CommandsPage() {
  const payload = await loadAdminDocuments();
  return (
    <>
      <PageHeader
        title="Terminal commands"
        description="Simple commands for the Kali terminal: print text or portfolio content, or open pages, apps and links."
      />
      <DocumentNotice payload={payload} keys={["commands"]}>
        <CommandsEditor
          commands={payload.documents.commands}
          apps={payload.documents.apps}
          reserved={builtinCommandNames()}
        />
      </DocumentNotice>
    </>
  );
}
