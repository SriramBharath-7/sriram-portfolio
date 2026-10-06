import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { StatusDot } from "./ui";

type Tone = "success" | "warning" | "danger" | "accent" | "neutral";

/** One cell of the system status strip at the top of the Command Center. */
export function Stat({
  label,
  value,
  detail,
  tone,
  live,
  children,
}: {
  label: string;
  value: React.ReactNode;
  detail?: React.ReactNode;
  tone: Tone;
  live?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="adm-stat">
      <p className="adm-stat-label">
        <StatusDot tone={tone} live={live} />
        <span className="adm-eyebrow">{label}</span>
      </p>
      <p className="adm-stat-value">{value}</p>
      {children}
      {detail && <p className="adm-stat-detail">{detail}</p>}
    </div>
  );
}

/** Titlebar shared by the overview panels. */
export function PanelBar({
  icon,
  title,
  tag,
  children,
}: {
  icon: IconName;
  title: string;
  tag?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="adm-panel-bar">
      <span className="adm-panel-icon">
        <Icon name={icon} size={17} />
      </span>
      <div className="adm-panel-heading">
        <h2 className="adm-panel-title">{title}</h2>
        {tag && <span className="adm-panel-tag">{tag}</span>}
      </div>
      {children && <div className="adm-panel-actions">{children}</div>}
    </header>
  );
}

/** A content module that opens its editor. */
export function ModuleLink({
  href,
  icon,
  title,
  tag,
  index,
  children,
}: {
  href: string;
  icon: IconName;
  title: string;
  tag?: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} prefetch={false} className="adm-panel adm-panel--link adm-span-4" style={{ "--i": index } as React.CSSProperties}>
      <PanelBar icon={icon} title={title} tag={tag}>
        <span className="adm-open-hint">
          open
          <Icon name="arrowRight" size={13} />
        </span>
      </PanelBar>
      <div className="adm-panel-body flex flex-1 flex-col gap-4">{children}</div>
    </Link>
  );
}

export function Metric({ value, unit }: { value: React.ReactNode; unit: string }) {
  return (
    <p className="adm-metric">
      <strong>{value}</strong>
      <span>{unit}</span>
    </p>
  );
}

/** Footer line of a module: mono, faint, pinned to the bottom. */
export function ModuleFoot({ children }: { children: React.ReactNode }) {
  return <p className="mt-auto pt-3 border-t border-[var(--line)] adm-mono text-[length:var(--fs-xs)] adm-faint truncate">{children}</p>;
}

/** The output of the real `neofetch` command, framed like the desktop's terminal window. */
export function VisitorTerminal({ logo, rows }: { logo: string[]; rows: { label: string; value: string }[] }) {
  const prompt = (
    <p>
      <span className="adm-p-br">┌──(</span>
      <span className="adm-p-user">kali㉿kali</span>
      <span className="adm-p-br">)-[</span>
      <span className="adm-p-path">~</span>
      <span className="adm-p-br">]</span>
    </p>
  );

  return (
    <section className="adm-term" aria-label="What visitors see in the terminal">
      <div className="adm-term-bar">
        <span className="adm-term-lead">
          <Icon name="terminal" size={15} />
        </span>
        kali@kali: ~
        <span className="adm-tag" data-tone="accent">
          live preview
        </span>
      </div>
      <div className="adm-term-body">
        {prompt}
        <p>
          <span className="adm-p-user">└─$</span> <span className="adm-p-cmd">neofetch</span>
        </p>
        <div className="adm-nf">
          <pre className="adm-nf-logo">{logo.join("\n")}</pre>
          <div className="adm-nf-info">
            {rows.map((row, index) =>
              row.label ? (
                <div key={index} className="adm-nf-row">
                  <span className="adm-nf-key">{row.label}</span>
                  <span className="adm-nf-val">{row.value}</span>
                </div>
              ) : (
                <div key={index} className="adm-nf-title">
                  {row.value}
                </div>
              )
            )}
          </div>
        </div>
        {prompt}
        <p>
          <span className="adm-p-user">└─$</span> <span className="adm-cursor" aria-hidden="true" />
        </p>
      </div>
    </section>
  );
}
