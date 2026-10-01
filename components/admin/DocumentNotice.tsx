import type { DocumentKey } from "@/content/documents";
import type { AdminDocumentsPayload } from "@/lib/admin/types";
import { DOCUMENT_SECTIONS } from "./sections";
import { Notice } from "./ui";

/**
 * Explains where the data on a page came from when it is not a normal stored
 * row: a load error, a row that failed validation, or defaults never saved.
 */
export default function DocumentNotice({
  payload,
  keys,
  children,
}: {
  payload: AdminDocumentsPayload;
  keys: DocumentKey[];
  /** The editor. Not rendered when the database could not be read. */
  children?: React.ReactNode;
}) {
  if (payload.error) {
    // Editing defaults here and saving would overwrite real content, so the
    // editor stays hidden until the database can be read again.
    return (
      <div className="mb-6">
        <Notice tone="danger" title="Could not load saved content">
          {payload.error} Editing is paused so nothing overwrites your saved data. Reload the page to try again.
        </Notice>
      </div>
    );
  }

  const invalid = keys.filter((key) => payload.meta[key]?.invalid);
  const unsaved = keys.filter((key) => !payload.meta[key]?.stored && !payload.meta[key]?.invalid);
  const name = (list: DocumentKey[]) => list.map((key) => DOCUMENT_SECTIONS[key].label).join(", ");

  return (
    <>
      {(invalid.length > 0 || unsaved.length > 0) && (
        <div className="mb-6 space-y-3">
          {invalid.length > 0 && (
            <Notice tone="warning" title={`Stored ${name(invalid)} data failed validation`}>
              The live site is using the built-in defaults for it. Review the values below and save to repair it.
            </Notice>
          )}
          {unsaved.length > 0 && (
            <Notice tone="accent" title={`${name(unsaved)}: showing built-in defaults`}>
              This has not been saved to the database yet. Saving here creates it.
            </Notice>
          )}
        </div>
      )}
      {children}
    </>
  );
}
