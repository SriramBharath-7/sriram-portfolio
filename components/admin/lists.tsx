"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { IconButton } from "./ui";
import { useFeedback } from "./feedback";

export interface SortControls {
  /** Spread onto the drag handle button. Also supports Alt+Arrow keys to move. */
  handleProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  moveUp?: () => void;
  moveDown?: () => void;
  isDragging: boolean;
  isDropTarget: boolean;
}

/**
 * Drag-and-drop reordering with the native HTML5 API, no dependency. Only the
 * handle arms dragging, so text inside inputs stays selectable; the handle and
 * the up/down buttons make it fully keyboard accessible.
 */
export function SortableList<T>({
  items,
  getKey,
  onMove,
  children,
  className = "space-y-2.5",
}: {
  items: T[];
  getKey: (item: T, index: number) => string;
  onMove: (from: number, to: number) => void;
  children: (item: T, index: number, controls: SortControls) => React.ReactNode;
  className?: string;
}) {
  const [armed, setArmed] = useState<number | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);

  const reset = () => {
    setArmed(null);
    setDragging(null);
    setOver(null);
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const controls: SortControls = {
          handleProps: {
            type: "button",
            "aria-label": "Drag to reorder (Alt + arrow keys also move)",
            title: "Drag to reorder",
            onMouseDown: () => setArmed(index),
            onMouseUp: () => setArmed(null),
            onTouchStart: () => setArmed(index),
            onKeyDown: (event) => {
              if (!event.altKey) return;
              if (event.key === "ArrowUp" && index > 0) {
                event.preventDefault();
                onMove(index, index - 1);
              } else if (event.key === "ArrowDown" && index < items.length - 1) {
                event.preventDefault();
                onMove(index, index + 1);
              }
            },
          },
          moveUp: index > 0 ? () => onMove(index, index - 1) : undefined,
          moveDown: index < items.length - 1 ? () => onMove(index, index + 1) : undefined,
          isDragging: dragging === index,
          isDropTarget: over === index && dragging !== null && dragging !== index,
        };

        return (
          <div
            key={getKey(item, index)}
            draggable={armed === index}
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = "move";
              event.dataTransfer.setData("text/plain", String(index));
              setDragging(index);
            }}
            onDragOver={(event) => {
              if (dragging === null) return;
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
              if (over !== index) setOver(index);
            }}
            onDrop={(event) => {
              event.preventDefault();
              if (dragging !== null && dragging !== index) onMove(dragging, index);
              reset();
            }}
            onDragEnd={reset}
          >
            {children(item, index, controls)}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Collapsible row used by every list editor: drag handle, title, badges,
 * reorder and delete actions, and the item's fields when expanded.
 */
export function ItemCard({
  title,
  subtitle,
  badges,
  leading,
  controls,
  open,
  onToggle,
  onDelete,
  deleteLabel = "Delete",
  deleteConfirm,
  errorCount = 0,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badges?: React.ReactNode;
  leading?: React.ReactNode;
  controls?: SortControls;
  open: boolean;
  onToggle: () => void;
  onDelete?: () => void;
  deleteLabel?: string;
  /** When set, deleting asks for confirmation with this title. */
  deleteConfirm?: string;
  errorCount?: number;
  children?: React.ReactNode;
}) {
  const { confirm } = useFeedback();

  const handleDelete = async () => {
    if (!onDelete) return;
    if (deleteConfirm) {
      const ok = await confirm({
        title: deleteConfirm,
        message: "This is removed from your draft. Nothing changes on the live site until you save.",
        confirmLabel: deleteLabel,
        tone: "danger",
      });
      if (!ok) return;
    }
    onDelete();
  };

  return (
    <div
      className="adm-item"
      data-open={open}
      data-invalid={errorCount > 0}
      data-dragging={controls?.isDragging}
      data-drop-target={controls?.isDropTarget}
    >
      <div className="flex items-center gap-2 px-2.5 py-2">
        {controls && (
          <button {...controls.handleProps} className="adm-handle w-7 h-7 flex items-center justify-center">
            <Icon name="grip" size={16} />
          </button>
        )}
        {leading}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex-1 min-w-0 flex items-center gap-2.5 text-left py-1"
        >
          <Icon
            name="chevron"
            size={15}
            className={`adm-faint transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          />
          <span className="min-w-0">
            <span className="block font-medium truncate">{title}</span>
            {subtitle && <span className="block text-[12px] adm-faint truncate">{subtitle}</span>}
          </span>
        </button>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {errorCount > 0 && (
            <span className="adm-badge adm-badge--danger">
              {errorCount} issue{errorCount === 1 ? "" : "s"}
            </span>
          )}
          {badges}
          {controls && (
            <>
              <IconButton icon="up" label="Move up" onClick={controls.moveUp} disabled={!controls.moveUp} />
              <IconButton icon="down" label="Move down" onClick={controls.moveDown} disabled={!controls.moveDown} />
            </>
          )}
          {onDelete && <IconButton icon="trash" label={deleteLabel} onClick={handleDelete} />}
        </div>
      </div>
      {open && <div className="px-4 pb-4 pt-2 border-t border-[var(--border)] space-y-4">{children}</div>}
    </div>
  );
}

/** Tracks which item of a list is expanded. New items open automatically. */
export function useOpenItem(initial: string | null = null) {
  const [openKey, setOpenKey] = useState<string | null>(initial);
  return {
    openKey,
    isOpen: (key: string) => openKey === key,
    toggle: (key: string) => setOpenKey((current) => (current === key ? null : key)),
    open: (key: string) => setOpenKey(key),
  };
}

/** Editable, reorderable list of short strings (coursework, interests, MOTD lines...). */
export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  placeholder = "Add an item and press Enter",
  error,
  itemErrors,
  mono,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  error?: string;
  /** Per-item error lookup, e.g. (i) => editor.issue(`coursework.${i}`). */
  itemErrors?: (index: number) => string | undefined;
  mono?: boolean;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const text = draft.trim();
    if (!text) return;
    onChange([...items, text]);
    setDraft("");
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = items.slice();
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div>
      <p className="adm-label">{label}</p>
      {items.length > 0 && (
        <SortableList items={items} getKey={(_, index) => String(index)} onMove={move} className="space-y-1.5 mb-2">
          {(item, index, controls) => {
            const itemError = itemErrors?.(index);
            return (
              <div>
                <div
                  className={`flex items-center gap-1.5 rounded-lg border bg-[var(--surface-2)] pl-1 pr-1.5 ${
                    itemError ? "border-[var(--danger)]" : "border-[var(--border)]"
                  } ${controls.isDropTarget ? "border-[var(--accent)]" : ""} ${controls.isDragging ? "opacity-50" : ""}`}
                >
                  <button {...controls.handleProps} className="adm-handle w-6 h-7 flex items-center justify-center">
                    <Icon name="grip" size={14} />
                  </button>
                  <input
                    value={item}
                    aria-label={`${label} ${index + 1}`}
                    aria-invalid={itemError ? true : undefined}
                    onChange={(event) => onChange(items.map((existing, i) => (i === index ? event.target.value : existing)))}
                    className={`flex-1 min-w-0 bg-transparent py-1.5 outline-none text-[13.5px] ${mono ? "font-mono" : ""}`}
                  />
                  <IconButton icon="up" label="Move up" onClick={controls.moveUp} disabled={!controls.moveUp} className="!w-6 !h-6" />
                  <IconButton icon="down" label="Move down" onClick={controls.moveDown} disabled={!controls.moveDown} className="!w-6 !h-6" />
                  <IconButton
                    icon="x"
                    label="Remove"
                    onClick={() => onChange(items.filter((_, i) => i !== index))}
                    className="!w-6 !h-6"
                  />
                </div>
                {itemError && <p className="adm-error">{itemError}</p>}
              </div>
            );
          }}
        </SortableList>
      )}
      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              add();
            }
          }}
          placeholder={placeholder}
          aria-label={`New ${label.toLowerCase()} item`}
          className={`adm-input ${mono ? "font-mono text-[13px]" : ""}`}
        />
        <button type="button" className="adm-btn flex-shrink-0" onClick={add} disabled={!draft.trim()}>
          <Icon name="plus" size={16} />
          Add
        </button>
      </div>
      {error ? <p className="adm-error">{error}</p> : hint ? <p className="adm-hint">{hint}</p> : null}
    </div>
  );
}
