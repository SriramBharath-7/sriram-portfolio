/** Small inline icon set (24px outline grid) so the admin needs no icon dependency. */

/** Rounded rectangle as a path. */
const rect = (x: number, y: number, w: number, h: number, r = 1.75) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 -${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1 -${r} -${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r} -${r}z`;

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 -${2 * r} 0z`;

const PATHS = {
  // Navigation
  overview: rect(3.5, 3.5, 7, 8.5, 1.5) + rect(13.5, 3.5, 7, 5, 1.5) + rect(13.5, 11.5, 7, 9, 1.5) + rect(3.5, 15, 7, 5.5, 1.5),
  profile: rect(3, 4.5, 18, 15, 2) + circle(9, 10.5, 2.25) + "M5.75 16.25c.6-1.7 1.8-2.6 3.25-2.6s2.65.9 3.25 2.6M14.5 9.5h3.5M14.5 13h2.5",
  education: "M12 4.5 2.5 9 12 13.5 21.5 9 12 4.5zM6.5 11v4.75c0 1.4 2.5 2.75 5.5 2.75s5.5-1.35 5.5-2.75V11M21.5 9v5.5",
  skills: rect(6.5, 6.5, 11, 11, 2) + "M10 10h4v4h-4zM9.5 3v3.5M14.5 3v3.5M9.5 17.5V21M14.5 17.5V21M3 9.5h3.5M3 14.5h3.5M17.5 9.5H21M17.5 14.5H21",
  certifications: circle(12, 9.25, 5.75) + "M8.6 13.9 7.5 21l4.5-2.25L16.5 21l-1.1-7.1M9.6 9.3l1.6 1.6 3.2-3.2",
  security: "M5.5 21V4M5.5 4.5c3.75-2 6.75 2 11.5 0v8.25c-4.75 2-7.75-2-11.5 0",
  socials: "M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1",
  projects: circle(6.5, 18, 2.25) + circle(17.5, 6, 2.25) + circle(6.5, 6, 2.25) + "M6.5 8.25v7.5M17.5 8.25c0 4.75-4.5 5.5-9.25 8.5",
  commands: rect(3, 4.5, 18, 15, 2) + "M7.5 9.5 10.5 12l-3 2.5M13 15h3.5",
  apps: rect(4, 4, 6.75, 6.75, 1.75) + rect(13.25, 4, 6.75, 6.75, 1.75) + rect(4, 13.25, 6.75, 6.75, 1.75) + rect(13.25, 13.25, 6.75, 6.75, 1.75),
  settings:
    "M4 6.5h8.5M16.5 6.5H20M4 12h3M11 12h9M4 17.5h10.5M18.5 17.5H20" + circle(14.5, 6.5, 2) + circle(9, 12, 2) + circle(16.5, 17.5, 2),

  // Actions
  logout: "M12 3.5v7.5M6.6 6.4a7.75 7.75 0 1 0 10.8 0",
  external: "M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10",
  plus: "M12 5v14M5 12h14",
  trash: "M4 7h16M9.5 7V4.75h5V7M6.5 7l.85 11.6a1.75 1.75 0 0 0 1.75 1.65h5.8a1.75 1.75 0 0 0 1.75-1.65L17.5 7M10.25 11v5.5M13.75 11v5.5",
  chevron: "M9 6l6 6-6 6",
  grip: "M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01",
  up: "M12 19V5M6 11l6-6 6 6",
  down: "M12 5v14M18 13l-6 6-6-6",
  check: "M5 12.5l4.5 4.5L19 7",
  x: "M6.5 6.5l11 11M17.5 6.5l-11 11",
  upload: "M12 15.5V4M7 8.5l5-4.5 5 4.5M4 15.5v3A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-3",
  edit: "M4 20h4L18.6 9.4a2.12 2.12 0 0 0-3-3L5 17v3zM13.5 8.5l2 2",
  refresh: "M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  menu: "M4 6.5h16M4 12h16M4 17.5h16",
  search: circle(10.75, 10.75, 6.25) + "M20 20l-4.75-4.75",

  // Status and objects
  alert: "M12 9v4.25M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  info: circle(12, 12, 9) + "M12 11v5.5M12 7.75h.01",
  eye: "M2.5 12s3.5-6.75 9.5-6.75S21.5 12 21.5 12 18 18.75 12 18.75 2.5 12 2.5 12z" + circle(12, 12, 2.75),
  eyeOff:
    "M3 3l18 18M10.6 10.6a2.75 2.75 0 0 0 3.9 3.9M9.9 5.4A9.8 9.8 0 0 1 12 5.25c6 0 9.5 6.75 9.5 6.75a16.5 16.5 0 0 1-3.1 3.9M6.6 6.6C4 8.3 2.5 12 2.5 12s3.5 6.75 9.5 6.75a9.4 9.4 0 0 0 5.1-1.5",
  star: "M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85L12 3.5z",
  database:
    "M12 3.5c4.4 0 8 1.25 8 2.75S16.4 9 12 9 4 7.75 4 6.25 7.6 3.5 12 3.5zM4 6.25v5.75c0 1.5 3.6 2.75 8 2.75s8-1.25 8-2.75V6.25M4 12v5.75c0 1.5 3.6 2.75 8 2.75s8-1.25 8-2.75V12",
  lock: rect(5, 10.5, 14, 10, 2) + "M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.25",
  shield: "M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6L12 3zM9.25 12l2 2 3.5-3.75",
  key: circle(8, 15.5, 3.75) + "M10.75 12.75 19 4.5M16 7.5l2.25 2.25M18.5 5l1.5 1.5",
  mail: rect(3, 5, 18, 14, 2) + "M3.75 7.25 12 13l8.25-5.75",
  clock: circle(12, 12, 9) + "M12 7.25V12l3 2",
  activity: "M3 12h4l3-8 4 16 3-8h4",
  layers: "M12 3.5 21 8.25l-9 4.75-9-4.75 9-4.75zM3 12.5l9 4.75 9-4.75M3 16.5l9 4.75 9-4.75",
  image: rect(3.5, 4.5, 17, 15, 2) + circle(9, 9.75, 1.5) + "M3.75 17.5 9 12.5l3.5 3.25 2.5-2.25 5 4",
  server: rect(3.5, 4, 17, 6.5, 1.75) + rect(3.5, 13.5, 17, 6.5, 1.75) + "M7.5 7.25h.01M7.5 16.75h.01M11 7.25h5M11 16.75h5",
  fingerprint:
    "M12 11v3.5M8.6 17a6 6 0 0 0 9.4-5c0-3.3-2.7-6-6-6a6 6 0 0 0-6 6v1.25M15.2 19.5a9 9 0 0 0 2.8-5.25M9 20.25c1.45-1.4 2.45-3.5 2.55-5.75",
  globe:
    circle(12, 12, 9) + "M3 12h18M12 3c2.5 2.6 3.75 5.6 3.75 9s-1.25 6.4-3.75 9c-2.5-2.6-3.75-5.6-3.75-9S9.5 5.6 12 3z",
  terminal: rect(3, 4.5, 18, 15, 2) + "M7.5 9.5 10.5 12l-3 2.5M13 15h3.5",
  power: "M12 3.5v7.5M6.6 6.4a7.75 7.75 0 1 0 10.8 0",
} as const;

export type IconName = keyof typeof PATHS;

/** Icons drawn with heavier dots. */
const DOTTED = new Set<IconName>(["grip"]);

/**
 * `size` is in px at the 1080p design scale; it renders in rem so icons grow
 * with the same fluid root font-size as everything else.
 */
export function Icon({
  name,
  size = 18,
  className = "",
  strokeWidth = 1.75,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const length = `${size / 16}rem`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: length, height: length }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={DOTTED.has(name) ? 3 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
