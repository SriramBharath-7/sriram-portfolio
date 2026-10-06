"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./icons";
import { Badge, Button, IconButton } from "./ui";
import { useFeedback } from "./feedback";

export interface SortControls {
  /** Spread onto the drag handle button. Alt + arrow keys also move the row. */
  handleProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
  moveUp?: () => void;
  moveDown?: () => void;
  /** Position in the list, from 0. */
  index: number;
  isDragging: boolean;
  /** True briefly after this row was moved, for a highlight flash. */
  flash: boolean;
}

interface DragSession {
  from: number;
  to: number;
  pointerId: number;
  startY: number;
  startScroll: number;
  lastY: number;
  /** Row tops (document coordinates) and heights, measured at pick-up. */
  tops: number[];
  heights: number[];
  gap: number;
  active: boolean;
  frame: number;
}

const DRAG_THRESHOLD = 4;
const EDGE = 96;

/**
 * Drag-to-reorder with pointer events, no dependency. Only the handle starts
 * a drag, so text inside inputs stays selectable. The picked-up row lifts and
 * follows the pointer while the others slide aside to show where it will land;
 * the page scrolls near the edges and Escape cancels. On drop it calls
 * `onMove(from, to)` exactly once and the moved row flashes. Alt + arrow keys
 * on the handle and the up/down buttons do the same from the keyboard.
 */
export function SortableList<T>({
  items,
  getKey,
  onMove,
  children,
  className = "",
  tight = false,
}: {
  items: T[];
  getKey: (item: T, index: number) => string;
  onMove: (from: number, to: number) => void;
  children: (item: T, index: number, controls: SortControls) => React.ReactNode;
  className?: string;
  tight?: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const session = useRef<DragSession | null>(null);
  const [dragging, setDragging] = useState<number | null>(null);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const flashTimer = useRef<number>();

  const rows = () => Array.from(listRef.current?.children ?? []) as HTMLElement[];

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    onMove(from, to);
    setFlashIndex(to);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlashIndex(null), 1000);
  };

  /** Positions every row for the current pointer position. */
  const layout = (clientY: number) => {
    const s = session.current;
    if (!s) return;
    s.lastY = clientY;
    const dy = clientY - s.startY + (window.scrollY - s.startScroll);
    if (!s.active) {
      if (Math.abs(dy) < DRAG_THRESHOLD) return;
      s.active = true;
      document.documentElement.classList.add("adm-dragging");
      setDragging(s.from);
    }

    const center = s.tops[s.from] + s.heights[s.from] / 2 + dy;
    let to = s.from;
    for (let i = s.from + 1; i < s.tops.length; i++) if (center > s.tops[i] + s.heights[i] / 2) to = i;
    if (to === s.from) {
      for (let i = 0; i < s.from; i++) {
        if (center < s.tops[i] + s.heights[i] / 2) {
          to = i;
          break;
        }
      }
    }
    s.to = to;

    const shift = s.heights[s.from] + s.gap;
    rows().forEach((row, i) => {
      if (i === s.from) {
        row.dataset.lifted = "true";
        row.style.transform = `translateY(${dy}px)`;
      } else if (s.from < to && i > s.from && i <= to) {
        row.style.transform = `translateY(${-shift}px)`;
      } else if (to < s.from && i >= to && i < s.from) {
        row.style.transform = `translateY(${shift}px)`;
      } else {
        row.style.transform = "";
      }
    });
  };

  /** Scrolls the page while the pointer is held near the top or bottom edge. */
  const autoScroll = () => {
    const s = session.current;
    if (!s) return;
    if (s.active) {
      const y = s.lastY;
      const bottom = window.innerHeight - EDGE;
      const speed = y < EDGE ? -Math.ceil((EDGE - y) / 5) : y > bottom ? Math.ceil((y - bottom) / 5) : 0;
      if (speed !== 0) {
        window.scrollBy(0, speed);
        layout(y);
      }
    }
    s.frame = window.requestAnimationFrame(autoScroll);
  };

  const finish = (commit: boolean) => {
    const s = session.current;
    if (!s) return;
    session.current = null;
    window.cancelAnimationFrame(s.frame);
    document.documentElement.classList.remove("adm-dragging");
    // Reset without animating: the new order renders in the same frame.
    const all = rows();
    all.forEach((row) => {
      row.style.transition = "none";
      row.style.transform = "";
      delete row.dataset.lifted;
    });
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => all.forEach((row) => (row.style.transition = "")))
    );
    setDragging(null);
    if (commit && s.active) move(s.from, s.to);
  };

  // Escape cancels a drag; an unmount mid-drag cleans up.
  useEffect(() => {
    if (dragging === null) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && finish(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  useEffect(
    () => () => {
      window.clearTimeout(flashTimer.current);
      if (session.current) window.cancelAnimationFrame(session.current.frame);
      document.documentElement.classList.remove("adm-dragging");
    },
    []
  );

  return (
    <div ref={listRef} className={`adm-sortable ${tight ? "adm-sortable--tight" : ""} ${className}`}>
      {items.map((item, index) => {
        const controls: SortControls = {
          handleProps: {
            type: "button",
            "aria-label": "Drag to reorder (Alt + arrow keys also move)",
            title: "Drag to reorder",
            onPointerDown: (event) => {
              if (event.button !== 0 || items.length < 2 || session.current) return;
              event.preventDefault();
              event.currentTarget.setPointerCapture(event.pointerId);
              const rects = rows().map((row) => row.getBoundingClientRect());
              session.current = {
                from: index,
                to: index,
                pointerId: event.pointerId,
                startY: event.clientY,
                startScroll: window.scrollY,
                lastY: event.clientY,
                tops: rects.map((rect) => rect.top + window.scrollY),
                heights: rects.map((rect) => rect.height),
                gap: rects.length > 1 ? rects[1].top - rects[0].bottom : 0,
                active: false,
                frame: window.requestAnimationFrame(autoScroll),
              };
            },
            onPointerMove: (event) => {
              if (session.current?.pointerId === event.pointerId) layout(event.clientY);
            },
            onPointerUp: () => finish(true),
            onPointerCancel: () => finish(false),
            // Fires after pointerup too (by then the session is already closed).
            onLostPointerCapture: () => finish(false),
            onKeyDown: (event) => {
              if (!event.altKey) return;
              if (event.key === "ArrowUp" && index > 0) {
                event.preventDefault();
                move(index, index - 1);
              } else if (event.key === "ArrowDown" && index < items.length - 1) {
                event.preventDefault();
                move(index, index + 1);
              }
            },
          },
          moveUp: index > 0 ? () => move(index, index - 1) : undefined,
          moveDown: index < items.length - 1 ? () => move(index, index + 1) : undefined,
          index,
          isDragging: dragging === index,
          flash: flashIndex === index,
        };

        return (
          <div key={getKey(item, index)} className="adm-sortable-row">
            {children(item, index, controls)}
          </div>
        );
      })}
    </div>
  );
}

/** Up / down buttons for a sortable row (hidden on phones, where dragging is easier). */
function MoveButtons({ controls }: { controls: SortControls }) {
  return (
    <>
      <IconButton icon="up" label="Move up" className="adm-move" onClick={controls.moveUp} disabled={!controls.moveUp} />
      <IconButton
        icon="down"
        label="Move down"
        className="adm-move"
        onClick={controls.moveDown}
        disabled={!controls.moveDown}
      />
    </>
  );
}

/**
 * Collapsible row used by every list editor: drag handle and position, title,
 * tags, reorder and delete actions, and the item's fields when expanded.
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
  const bodyId = useId();

  const handleDelete = async () => {
    if (!onDelete) return;
    if (deleteConfirm) {
      const ok = await confirm({
        title: deleteConfirm,
        message: "It is removed from your draft. Nothing changes on the live site until you save.",
        confirmLabel: deleteLabel,
        tone: "danger",
        icon: "trash",
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
      data-flash={controls?.flash}
    >
      <div className="adm-item-head">
        {controls && (
          <>
            <button {...controls.handleProps} className="adm-handle">
              <Icon name="grip" size={16} />
            </button>
            <span className="adm-item-index" aria-hidden="true">
              {String(controls.index + 1).padStart(2, "0")}
            </span>
          </>
        )}
        {leading}
        <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={bodyId} className="adm-item-toggle">
          <Icon name="chevron" size={16} className="adm-chevron" />
          <span className="min-w-0">
            <span className="adm-item-title">{title}</span>
            {subtitle && <span className="adm-item-sub">{subtitle}</span>}
          </span>
        </button>
        {(errorCount > 0 || badges) && (
          <div className="adm-item-tags">
            {errorCount > 0 && (
              <Badge tone="danger">
                {errorCount} issue{errorCount === 1 ? "" : "s"}
              </Badge>
            )}
            {badges}
          </div>
        )}
        <div className="adm-item-actions">
          {controls && <MoveButtons controls={controls} />}
          {onDelete && <IconButton icon="trash" label={deleteLabel} remove onClick={handleDelete} />}
        </div>
      </div>
      {open && (
        <div id={bodyId} className="adm-item-body">
          {children}
        </div>
      )}
    </div>
  );
}

/** A small sortable row inside an expanded item: handle, fields, remove. */
export function SubItem({
  controls,
  invalid,
  onRemove,
  removeLabel,
  children,
}: {
  controls: SortControls;
  invalid?: boolean;
  onRemove: () => void;
  removeLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="adm-item adm-item--sub"
      data-invalid={invalid}
      data-dragging={controls.isDragging}
      data-flash={controls.flash}
    >
      <button {...controls.handleProps} className="adm-handle">
        <Icon name="grip" size={15} />
      </button>
      <div className="min-w-0 flex-1">{children}</div>
      <IconButton icon="x" label={removeLabel} remove onClick={onRemove} />
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
    <div className="adm-field">
      <div className="adm-list-meta">
        <p className="adm-label !mb-0">{label}</p>
        {items.length > 0 && (
          <span className="adm-eyebrow">
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
        )}
      </div>
      {items.length > 0 && (
        <SortableList items={items} getKey={(_, index) => String(index)} onMove={move} tight className="mb-2.5">
          {(item, index, controls) => {
            const itemError = itemErrors?.(index);
            return (
              <div>
                <div
                  className="adm-item adm-item--string"
                  data-invalid={Boolean(itemError)}
                  data-dragging={controls.isDragging}
                  data-flash={controls.flash}
                >
                  <button {...controls.handleProps} className="adm-handle">
                    <Icon name="grip" size={14} />
                  </button>
                  <input
                    value={item}
                    aria-label={`${label} ${index + 1}`}
                    aria-invalid={itemError ? true : undefined}
                    spellCheck={mono ? false : undefined}
                    onChange={(event) =>
                      onChange(items.map((existing, i) => (i === index ? event.target.value : existing)))
                    }
                    className={mono ? "adm-mono" : ""}
                  />
                  <div className="adm-item-actions">
                    <MoveButtons controls={controls} />
                    <IconButton
                      icon="x"
                      label="Remove"
                      remove
                      onClick={() => onChange(items.filter((_, i) => i !== index))}
                    />
                  </div>
                </div>
                {itemError && (
                  <p className="adm-error">
                    <Icon name="alert" size={14} />
                    {itemError}
                  </p>
                )}
              </div>
            );
          }}
        </SortableList>
      )}
      <div className="adm-strings-add">
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
          spellCheck={mono ? false : undefined}
          className={`adm-input ${mono ? "adm-input--mono" : ""}`}
        />
        <Button icon="plus" className="flex-shrink-0" onClick={add} disabled={!draft.trim()}>
          Add
        </Button>
      </div>
      {error ? (
        <p className="adm-error">
          <Icon name="alert" size={14} />
          {error}
        </p>
      ) : hint ? (
        <p className="adm-hint">{hint}</p>
      ) : null}
    </div>
  );
}
