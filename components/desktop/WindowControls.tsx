"use client";

interface WindowControlsProps {
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

/** Shared minimize / maximize / close buttons for window titlebars. */
export default function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
}: WindowControlsProps) {
  return (
    <div className="flex-1 flex justify-end items-center gap-1">
      <button
        type="button"
        className="titlebar-button"
        onClick={onMinimize}
        title="Minimize"
        aria-label="Minimize window"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M4 10.5h12a.5.5 0 0 1 0 1H4a.5.5 0 0 1 0-1Z" />
        </svg>
      </button>
      <button
        type="button"
        className="titlebar-button"
        onClick={onMaximize}
        title="Maximize"
        aria-label="Maximize window"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M6 5h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v6h6V7H7Z" />
        </svg>
      </button>
      <button
        type="button"
        className="titlebar-button titlebar-button--close"
        onClick={onClose}
        title="Close"
        aria-label="Close window"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M6.28 6.28a.75.75 0 0 1 1.06 0L10 8.94l2.66-2.66a.75.75 0 1 1 1.06 1.06L11.06 10l2.66 2.66a.75.75 0 1 1-1.06 1.06L10 11.06l-2.66 2.66a.75.75 0 1 1-1.06-1.06L8.94 10 6.28 7.34a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
