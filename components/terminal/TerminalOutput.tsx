"use client";

import type {
  Accent,
  DocBlock,
  ListingEntry,
  TerminalLine,
  TreeRow,
} from "@/lib/terminal/types";
import { SHELL_HOST, SHELL_USER } from "@/lib/terminal/shell";

const TONE_CLASS: Record<Accent, string> = {
  default: "tw-out",
  error: "tw-error",
  muted: "tw-muted",
  accent: "tw-accent",
  success: "tw-success",
  warning: "tw-warning",
};

/** GNU ls colouring: directories bold blue, regular files default foreground. */
function nameClass(type: ListingEntry["type"]) {
  return type === "directory" ? "ls-dir" : "ls-file";
}

function displayName(entry: { name: string; type: ListingEntry["type"] }) {
  return entry.type === "directory" ? `${entry.name}/` : entry.name;
}

export function PromptLabel({ cwd }: { cwd: string }) {
  return (
    <span className="kali-prompt-top">
      <span className="kali-brackets">┌──(</span>
      <span className="kali-user">
        {SHELL_USER}㉿{SHELL_HOST}
      </span>
      <span className="kali-brackets">)-[</span>
      <span className="kali-path">{cwd}</span>
      <span className="kali-brackets">]</span>
    </span>
  );
}

/**
 * Short listing. Plain wrapped terminal text in monospace columns — no chips,
 * no backgrounds, no icons.
 */
function Listing({ entries }: { entries: ListingEntry[] }) {
  return (
    <div className="ls-short">
      {entries.map((entry, index) => (
        <span key={`${entry.name}-${index}`} className={nameClass(entry.type)}>
          {displayName(entry)}
        </span>
      ))}
    </div>
  );
}

/**
 * Long listing rendered as real aligned columns.
 *
 * Widths are measured across the rows so the output lines up exactly the way
 * coreutils pads it, and the block scrolls horizontally when the window is too
 * narrow rather than shrinking the type.
 */
function LongListing({
  entries,
  total,
}: {
  entries: ListingEntry[];
  total: number;
}) {
  const widths = {
    links: Math.max(...entries.map((e) => String(e.links).length), 1),
    owner: Math.max(...entries.map((e) => e.owner.length), 1),
    group: Math.max(...entries.map((e) => e.group.length), 1),
    size: Math.max(...entries.map((e) => String(e.size).length), 1),
  };

  return (
    <div className="ls-long">
      <div className="ls-long-total">total {total}</div>
      {entries.map((entry, index) => (
        <div key={`${entry.name}-${index}`} className="ls-long-row">
          <span className="ls-mode">{entry.mode}</span>{" "}
          <span className="ls-meta">{String(entry.links).padStart(widths.links)}</span>{" "}
          <span className="ls-meta">{entry.owner.padEnd(widths.owner)}</span>{" "}
          <span className="ls-meta">{entry.group.padEnd(widths.group)}</span>{" "}
          <span className="ls-size">{String(entry.size).padStart(widths.size)}</span>{" "}
          <span className="ls-date">{entry.date}</span>{" "}
          <span className={nameClass(entry.type)}>{entry.name}</span>
        </div>
      ))}
    </div>
  );
}

function TreeView({
  root,
  rows,
  dirs,
  files,
}: {
  root: string;
  rows: TreeRow[];
  dirs: number;
  files: number;
}) {
  return (
    <div className="tree-output">
      <div className="ls-dir">{root}</div>
      {rows.map((row, index) => (
        <div key={index} className="tree-row">
          <span className="tree-guide">
            {row.guides.map((isLast) => (isLast ? "    " : "│   ")).join("")}
            {row.last ? "└── " : "├── "}
          </span>
          <span className={nameClass(row.type)}>{displayName(row)}</span>
        </div>
      ))}
      <div className="tree-summary">
        {dirs} director{dirs === 1 ? "y" : "ies"}, {files} file
        {files === 1 ? "" : "s"}
      </div>
    </div>
  );
}

/**
 * Portfolio document output: terminal-native, not a card. Bright headings,
 * whitespace and bullets — no border, background or gradient.
 */
function DocView({ title, blocks }: { title?: string; blocks: DocBlock[] }) {
  return (
    <div className="doc-output">
      {title && (
        <div className="doc-title">
          <span className="doc-title-text">{title}</span>
          <span className="doc-rule" aria-hidden="true" />
        </div>
      )}
      {blocks.map((block, index) => (
        <section key={index} className="doc-block">
          {block.heading && <h3 className="doc-heading">{block.heading}</h3>}
          {block.body && <p className="doc-body">{block.body}</p>}
          {block.bullets && block.bullets.length > 0 && (
            <ul className="doc-list">
              {block.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="doc-item">
                  <span className="doc-bullet" aria-hidden="true">
                    •
                  </span>
                  <span className="doc-item-text">
                    <span className={bullet.highlightClass ?? "doc-label"}>
                      {bullet.label}
                    </span>
                    {bullet.description ? (
                      <span className="doc-desc"> — {bullet.description}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

function Table({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="kv-output">
      {rows.map((row, index) => (
        <div key={index} className="kv-row">
          <span className="kv-label">{row.label}</span>
          <span className="kv-value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Grouped command reference.
 *
 * One column by default; the container query in globals.css promotes it to two
 * only when the terminal window is genuinely wide enough. Descriptions wrap
 * under the command name instead of forming vertical strips.
 */
function Help({
  groups,
}: {
  groups: { title: string; items: { name: string; description: string }[] }[];
}) {
  return (
    <div className="help-output">
      {groups.map((group) => (
        <section key={group.title} className="help-group">
          <h3 className="help-group-title">{group.title}</h3>
          <dl className="help-list">
            {group.items.map((item) => (
              <div key={item.name} className="help-entry">
                <dt className="help-cmd">{item.name}</dt>
                <dd className="help-desc">{item.description}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

function Neofetch({
  logo,
  rows,
}: {
  logo: string[];
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="neofetch">
      <pre className="neofetch-logo">{logo.join("\n")}</pre>
      <div className="neofetch-info">
        {rows.map((row, index) =>
          row.label ? (
            <div key={index} className="neofetch-row">
              <span className="neofetch-key">{row.label}</span>
              <span className="neofetch-value">{row.value}</span>
            </div>
          ) : (
            <div key={index} className="neofetch-title">
              {row.value}
            </div>
          )
        )}
      </div>
    </div>
  );
}

/** Renders one structured output line. No raw HTML is ever injected. */
export default function TerminalOutput({ line }: { line: TerminalLine }) {
  switch (line.kind) {
    case "prompt":
      return (
        <div className="command-line">
          <PromptLabel cwd={line.cwd} />
          <div className="kali-bottom">
            <span className="kali-arrow">└─$</span>
            <span className="user-command">{line.command}</span>
          </div>
        </div>
      );
    case "text":
      return (
        <div className={`tw-line ${TONE_CLASS[line.tone ?? "default"]}`}>
          {line.text}
        </div>
      );
    case "listing":
      return <Listing entries={line.entries} />;
    case "listing-long":
      return <LongListing entries={line.entries} total={line.total} />;
    case "tree":
      return (
        <TreeView
          root={line.root}
          rows={line.rows}
          dirs={line.dirs}
          files={line.files}
        />
      );
    case "doc":
      return <DocView title={line.title} blocks={line.blocks} />;
    case "table":
      return <Table rows={line.rows} />;
    case "help":
      return <Help groups={line.groups} />;
    case "neofetch":
      return <Neofetch logo={line.logo} rows={line.rows} />;
    case "columns":
      return (
        <div className="ls-short">
          {line.items.map((item, index) => (
            <span key={index} className="ls-file">
              {item}
            </span>
          ))}
        </div>
      );
    default:
      return null;
  }
}
