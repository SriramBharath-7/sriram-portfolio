"use client";

type Accent = "purple" | "blue" | "pink" | "emerald" | "amber" | "cyan";

const ACCENTS: Record<Accent, { border: string; glow: string; title: string; sub: string }> = {
  purple: {
    border: "border-purple-500/30",
    glow: "shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    title: "text-purple-200",
    sub: "text-purple-300/80",
  },
  blue: {
    border: "border-blue-500/30",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.25)]",
    title: "text-blue-200",
    sub: "text-blue-300/80",
  },
  pink: {
    border: "border-pink-500/30",
    glow: "shadow-[0_0_25px_rgba(236,72,153,0.25)]",
    title: "text-pink-200",
    sub: "text-pink-300/80",
  },
  emerald: {
    border: "border-emerald-500/30",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    title: "text-emerald-200",
    sub: "text-emerald-300/80",
  },
  amber: {
    border: "border-amber-500/30",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.2)]",
    title: "text-amber-200",
    sub: "text-amber-300/80",
  },
  cyan: {
    border: "border-cyan-500/30",
    glow: "shadow-[0_0_25px_rgba(34,211,238,0.2)]",
    title: "text-cyan-200",
    sub: "text-cyan-300/80",
  },
};

interface PageShellProps {
  icon: string;
  title: string;
  subtitle: string;
  accent?: Accent;
  children: React.ReactNode;
}

/** Shared header + content frame used by every internal browser page. */
export default function PageShell({
  icon,
  title,
  subtitle,
  accent = "purple",
  children,
}: PageShellProps) {
  const theme = ACCENTS[accent];

  return (
    <div className="page-enter">
      <div
        className={`bg-gray-800/55 px-6 py-5 rounded-xl border ${theme.border} ${theme.glow} mb-6`}
      >
        <div className="flex items-start gap-3.5">
          <span className="t-2xl leading-none mt-0.5" aria-hidden="true">
            {icon}
          </span>
          <div className="min-w-0">
            <h2 className={`t-2xl leading-tight font-bold ${theme.title}`}>
              {title}
            </h2>
            <p className={`${theme.sub} t-lg mt-1`}>{subtitle}</p>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-800/50 rounded-xl border border-purple-500/20 p-5 ${className}`}
    >
      {children}
    </div>
  );
}
