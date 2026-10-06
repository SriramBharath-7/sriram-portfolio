"use client";

import { useId } from "react";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icons";

type ButtonVariant = "secondary" | "primary" | "danger" | "danger-solid" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "md" | "sm" | "lg";
  icon?: IconName;
  loading?: boolean;
  /** Full width. */
  block?: boolean;
}

function buttonClass(variant: ButtonVariant, size: "md" | "sm" | "lg", extra = "") {
  return [
    "adm-btn",
    variant !== "secondary" ? `adm-btn--${variant}` : "",
    size !== "md" ? `adm-btn--${size}` : "",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "secondary",
  size = "md",
  icon,
  loading = false,
  block = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass(variant, size, `${block ? "adm-btn--block" : ""} ${className}`)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="adm-spinner" aria-hidden="true" />
      ) : (
        icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />
      )}
      {children}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  variant = "ghost",
  remove = false,
  className = "",
  ...props
}: Omit<ButtonProps, "children" | "icon" | "size" | "block"> & {
  icon: IconName;
  label: string;
  /** Destructive: turns red on hover only. */
  remove?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={buttonClass(variant, "md", `adm-btn--icon ${remove ? "adm-btn--remove" : ""} ${className}`)}
      {...props}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}

interface FieldShellProps {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  className?: string;
  children: (id: string, describedBy: string | undefined) => React.ReactNode;
}

/** Label + control + hint/error, with the ids wired for screen readers. */
export function FieldShell({ label, hint, error, className = "", children }: FieldShellProps) {
  const id = useId();
  const messageId = `${id}-message`;
  return (
    <div className={`adm-field ${className}`}>
      {label && (
        <label htmlFor={id} className="adm-label">
          {label}
        </label>
      )}
      {children(id, error || hint ? messageId : undefined)}
      {error ? (
        <p id={messageId} className="adm-error">
          <Icon name="alert" size={14} />
          {error}
        </p>
      ) : hint ? (
        <p id={messageId} className="adm-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "url" | "date" | "number" | "password";
  className?: string;
  maxLength?: number;
  mono?: boolean;
  autoFocus?: boolean;
}

export function TextField({
  label,
  hint,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
  className,
  maxLength,
  mono,
  autoFocus,
}: TextFieldProps) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {(id, describedBy) => (
        <input
          id={id}
          type={type}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          autoFocus={autoFocus}
          spellCheck={mono ? false : undefined}
          className={`adm-input ${mono ? "adm-input--mono" : ""}`}
        />
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  hint,
  error,
  value,
  onChange,
  placeholder,
  rows = 4,
  className,
  mono,
}: Omit<TextFieldProps, "type"> & { rows?: number }) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {(id, describedBy) => (
        <textarea
          id={id}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          spellCheck={mono ? false : undefined}
          style={{ "--rows": rows } as React.CSSProperties}
          className={`adm-input ${mono ? "adm-input--mono" : ""}`}
        />
      )}
    </FieldShell>
  );
}

export interface SelectOption {
  value: string;
  label: string;
}

export function SelectField({
  label,
  hint,
  error,
  value,
  onChange,
  options,
  className,
}: {
  label?: string;
  hint?: React.ReactNode;
  error?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}) {
  return (
    <FieldShell label={label} hint={hint} error={error} className={className}>
      {(id, describedBy) => (
        <select
          id={id}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="adm-input"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

/** A settings row: the whole row toggles, the switch sits on the right. */
export function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="adm-toggle" data-checked={checked} data-disabled={disabled || undefined}>
      <span className="adm-toggle-text">
        <span id={`${id}-label`} className="adm-toggle-label">
          {label}
        </span>
        {description && (
          <span id={`${id}-desc`} className="adm-toggle-desc">
            {description}
          </span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-desc` : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className="adm-switch"
      />
    </label>
  );
}

/** Quick-pick chip, e.g. a status preset. */
export function ChipButton({
  pressed,
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { pressed?: boolean }) {
  return (
    <button type="button" aria-pressed={pressed} className={`adm-chip ${className}`} {...props}>
      {children}
    </button>
  );
}

/**
 * A panel framed like a desktop window: titlebar with icon, title and the
 * stored document it writes to, then the body.
 */
export function Card({
  title,
  description,
  actions,
  children,
  className = "",
  doc,
  icon,
}: {
  title?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** The stored document this panel edits, e.g. "profile" or "settings.welcome". */
  doc?: string;
  icon?: IconName;
}) {
  return (
    <section className={`adm-panel ${className}`}>
      {(title || actions) && (
        <header className="adm-panel-bar">
          {icon && (
            <span className="adm-panel-icon">
              <Icon name={icon} size={17} />
            </span>
          )}
          <div className="adm-panel-heading">
            {title && <h2 className="adm-panel-title">{title}</h2>}
            {doc && (
              <span className="adm-panel-tag" title="Stored document">
                <Icon name="database" size={12} />
                {doc}
              </span>
            )}
          </div>
          {actions && <div className="adm-panel-actions">{actions}</div>}
        </header>
      )}
      {description && <p className="adm-panel-desc">{description}</p>}
      <div className="adm-panel-body">{children}</div>
    </section>
  );
}

/**
 * Page title, led in by the Kali prompt for the current path:
 * (root㉿kali)-[~/admin/certifications] over the title.
 */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/admin";
  return (
    <header className="adm-head">
      <div className="adm-head-text">
        <div className="adm-head-prompt">
          <p className="adm-prompt" aria-hidden="true">
            (<b>root㉿kali</b>)-[<em>~{pathname}</em>]
          </p>
          <h1 className="adm-title">{title}</h1>
        </div>
        {description && <p className="adm-head-desc">{description}</p>}
      </div>
      {actions && <div className="adm-head-actions">{actions}</div>}
    </header>
  );
}

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

export function Badge({
  tone = "neutral",
  dot,
  children,
}: {
  tone?: Tone;
  /** Shows a status light; "live" adds the radar ping. */
  dot?: boolean | "live";
  children: React.ReactNode;
}) {
  return (
    <span className="adm-tag" data-tone={tone}>
      {dot && <StatusDot tone={tone} live={dot === "live"} />}
      {children}
    </span>
  );
}

/** A status light. */
export function StatusDot({ tone = "success", live = false }: { tone?: Tone; live?: boolean }) {
  return <span className="adm-led" data-tone={tone} data-live={live || undefined} aria-hidden="true" />;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="adm-empty">
      <span className="adm-empty-icon">
        <Icon name={icon} size={22} />
      </span>
      <p className="adm-empty-title">{title}</p>
      {description && <p className="adm-empty-desc">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** One-line empty message inside a panel. */
export function EmptyLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="adm-empty-line">
      <Icon name="info" size={16} className="adm-faint" />
      {children}
    </p>
  );
}

const NOTICE_TAGS = { accent: "INFO", warning: "WARN", danger: "FAIL", success: " OK " } as const;

/** Inline system message, tagged like a boot log line: [INFO], [WARN], [FAIL]. */
export function Notice({
  tone = "accent",
  title,
  children,
}: {
  tone?: "accent" | "warning" | "danger" | "success";
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="adm-notice" data-tone={tone} role={tone === "danger" ? "alert" : undefined}>
      <span className="adm-notice-tag">[{NOTICE_TAGS[tone]}]</span>
      <div className="min-w-0">
        {title && <p className="adm-notice-title">{title}</p>}
        {children && <div className="adm-notice-text">{children}</div>}
      </div>
    </div>
  );
}
