"use client";

import { useId } from "react";
import { Icon, type IconName } from "./icons";

type ButtonVariant = "secondary" | "primary" | "danger" | "danger-solid" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "md" | "sm";
  icon?: IconName;
  loading?: boolean;
}

export function Button({
  variant = "secondary",
  size = "md",
  icon,
  loading = false,
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "adm-btn",
    variant !== "secondary" ? `adm-btn--${variant}` : "",
    size === "sm" ? "adm-btn--sm" : "",
    className,
  ].join(" ");

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...props}>
      {loading ? <span className="adm-spinner" aria-hidden="true" /> : icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}

export function IconButton({
  icon,
  label,
  variant = "ghost",
  className = "",
  ...props
}: Omit<ButtonProps, "children" | "icon"> & { icon: IconName; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`adm-btn adm-btn--icon ${variant !== "secondary" ? `adm-btn--${variant}` : ""} ${className}`}
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
    <div className={className}>
      {label && (
        <label htmlFor={id} className="adm-label">
          {label}
        </label>
      )}
      {children(id, error || hint ? messageId : undefined)}
      {error ? (
        <p id={messageId} className="adm-error">
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
          className={`adm-input ${mono ? "font-mono text-[13px]" : ""}`}
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
          className={`adm-input ${mono ? "font-mono text-[13px]" : ""}`}
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
    <div className={`flex items-start gap-3 ${disabled ? "opacity-50" : ""}`}>
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className="adm-switch mt-0.5"
      />
      <label htmlFor={id} className="min-w-0 cursor-pointer select-none">
        <span className="block text-[13.5px] font-medium">{label}</span>
        {description && <span className="block text-[12px] adm-faint">{description}</span>}
      </label>
    </div>
  );
}

export function Card({
  title,
  description,
  actions,
  children,
  className = "",
}: {
  title?: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`adm-card ${className}`}>
      {(title || actions) && (
        <header className="flex items-start justify-between gap-4 px-5 pt-4 pb-3 border-b border-[var(--border)]">
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-semibold">{title}</h2>}
            {description && <p className="text-[12.5px] adm-muted mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div className="min-w-0">
        <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
        {description && <p className="adm-muted mt-1 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "accent" | "success" | "warning" | "danger";
  children: React.ReactNode;
}) {
  return <span className={`adm-badge ${tone !== "neutral" ? `adm-badge--${tone}` : ""}`}>{children}</span>;
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
    <div className="flex flex-col items-center text-center py-10 px-4 border border-dashed border-[var(--border-strong)] rounded-xl">
      <div className="w-10 h-10 rounded-full bg-[var(--surface-3)] flex items-center justify-center adm-muted mb-3">
        <Icon name={icon} size={18} />
      </div>
      <p className="font-medium">{title}</p>
      {description && <p className="adm-muted text-[13px] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Notice({
  tone = "accent",
  title,
  children,
}: {
  tone?: "accent" | "warning" | "danger" | "success";
  title?: string;
  children?: React.ReactNode;
}) {
  const colors = {
    accent: "border-[rgba(91,141,239,0.35)] bg-[var(--accent-soft)]",
    warning: "border-[rgba(242,181,74,0.35)] bg-[var(--warning-soft)]",
    danger: "border-[rgba(239,97,112,0.4)] bg-[var(--danger-soft)]",
    success: "border-[rgba(60,207,142,0.35)] bg-[var(--success-soft)]",
  }[tone];
  const icon: IconName = tone === "success" ? "check" : tone === "accent" ? "database" : "alert";
  return (
    <div className={`flex gap-3 rounded-xl border px-4 py-3 ${colors}`} role={tone === "danger" ? "alert" : undefined}>
      <Icon name={icon} size={18} className="mt-0.5" />
      <div className="min-w-0 text-[13px]">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className="adm-muted mt-0.5">{children}</div>}
      </div>
    </div>
  );
}
