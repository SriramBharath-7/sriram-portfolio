/**
 * Internal browser route metadata.
 *
 * Kept free of component imports so pages (notably the start page) can read the
 * route list without creating an import cycle with the route registry.
 */
export interface RouteMeta {
  url: string;
  title: string;
  label: string;
  description: string;
  icon: string;
  showOnStart: boolean;
}

export const START_URL = "home://start";

export const ROUTE_META: RouteMeta[] = [
  {
    url: START_URL,
    title: "Start",
    label: "Start",
    description: "Browser home",
    icon: "🏠",
    showOnStart: false,
  },
  {
    url: "home://about",
    title: "About",
    label: "About",
    description: "Background, focus areas and interests",
    icon: "🛡️",
    showOnStart: true,
  },
  {
    url: "home://projects",
    title: "Projects",
    label: "Projects",
    description: "Live repositories pulled from GitHub",
    icon: "📦",
    showOnStart: true,
  },
  {
    url: "home://certifications",
    title: "Certifications",
    label: "Certifications",
    description: "Completed certificates and achievements",
    icon: "✅",
    showOnStart: true,
  },
  {
    url: "home://skills",
    title: "Skills",
    label: "Skills",
    description: "Languages, tooling and areas of interest",
    icon: "⚙️",
    showOnStart: true,
  },
  {
    url: "home://education",
    title: "Education",
    label: "Education",
    description: "Academic background and certification goals",
    icon: "🎓",
    showOnStart: true,
  },
  {
    url: "home://blogs",
    title: "Blogs",
    label: "Blogs",
    description: "Posts from DEV.to and Medium",
    icon: "📝",
    showOnStart: true,
  },
  {
    url: "home://tools",
    title: "Tools",
    label: "Tools",
    description: "Security tooling and learning projects",
    icon: "🧰",
    showOnStart: true,
  },
];

export function findRouteMeta(url: string): RouteMeta | undefined {
  return ROUTE_META.find((route) => route.url === url);
}

/** Every internal URL, used for address-bar completion and validation. */
export const INTERNAL_URLS = ROUTE_META.map((route) => route.url);
