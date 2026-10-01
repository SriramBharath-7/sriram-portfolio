import type { ComponentType } from "react";
import StartPage from "@/components/firefox/pages/StartPage";
import AboutPage from "@/components/firefox/pages/AboutPage";
import ProjectsPage from "@/components/firefox/pages/ProjectsPage";
import CertificationsPage from "@/components/firefox/pages/CertificationsPage";
import SkillsPage from "@/components/firefox/pages/SkillsPage";
import EducationPage from "@/components/firefox/pages/EducationPage";
import BlogsPage from "@/components/firefox/pages/BlogsPage";
import ToolsPage from "@/components/firefox/pages/ToolsPage";
import NotFoundPage from "@/components/firefox/pages/NotFoundPage";
import { ROUTE_META, START_URL } from "./route-meta";
import type { PageProps, RouteDefinition } from "./types";

const COMPONENTS: Record<string, ComponentType<PageProps>> = {
  "home://start": StartPage,
  "home://about": AboutPage,
  "home://projects": ProjectsPage,
  "home://certifications": CertificationsPage,
  "home://skills": SkillsPage,
  "home://education": EducationPage,
  "home://blogs": BlogsPage,
  "home://tools": ToolsPage,
};

export const ROUTES: RouteDefinition[] = ROUTE_META.map((meta) => ({
  ...meta,
  component: COMPONENTS[meta.url] ?? NotFoundPage,
}));

export function getRoute(url: string): RouteDefinition | undefined {
  return ROUTES.find((route) => route.url === url);
}

/** Tab/window title for any URL, including external and unknown ones. */
export function titleForUrl(url: string): string {
  const route = getRoute(url);
  if (route) return route.title;
  if (isExternal(url)) {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }
  return "Problem loading page";
}

export function isInternal(url: string): boolean {
  return url.startsWith("home://");
}

export function isExternal(url: string): boolean {
  return /^(https?:)\/\//i.test(url);
}

export { NotFoundPage, START_URL };
