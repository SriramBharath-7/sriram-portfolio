import type { DocumentKey } from "@/content/documents";
import type { AdminDocumentsPayload } from "@/lib/admin/types";
import RelativeTime from "./RelativeTime";
import { DOCUMENT_SECTIONS } from "./sections";
import { Notice, StatusDot } from "./ui";

/** One line per stored document the page edits: state and last write. */
function DocumentStatus({ payload, keys }: { payload: AdminDocumentsPayload; keys: DocumentKey[] }) {
  return (
    <div className="adm-docbar" aria-label="Stored documents">
      {keys.map((key) => {
        const meta = payload.meta[key];
        return (
          <span key={key}>
            <StatusDot tone={meta?.invalid ? "danger" : meta?.stored ? "success" : "neutral"} />
            <b>{key}</b>
            {meta?.invalid ? (
              "invalid · using defaults"
            ) : meta?.stored ? (
              <>
                stored · <RelativeTime iso={meta.updatedAt} />
              </>
            ) : (
              "built-in default · never saved"
            )}
          </span>
        );
      })}
    </div>
  );
}

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
      {payload.configured && <DocumentStatus payload={payload} keys={keys} />}
      {(invalid.length > 0 || unsaved.length > 0) && (
        <div className="mb-6 flex flex-col gap-3">
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
