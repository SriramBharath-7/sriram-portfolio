"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import kaliLogo from "@/public/assets/svg/kali-logo.png";
import { signOutAction } from "@/lib/admin/actions";
import type { AccessReport } from "@/lib/admin/types";
import AccessSequence from "./AccessSequence";
import { AdminFeedbackProvider, useFeedback, useUnsavedCount } from "./feedback";
import { Icon } from "./icons";
import { NAV, moduleNumber, navFor } from "./nav";
import SystemClock from "./SystemClock";
import type { SystemInfo } from "./system";
import { StatusDot } from "./ui";
import Wallpaper from "./Wallpaper";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void;

/**
 * Client-side navigation that asks before leaving unsaved edits (through the
 * admin dialog, not window.confirm) and reports which link is loading.
 */
function useGuardedNavigation(onNavigate: () => void) {
  const pathname = usePathname();
  const router = useRouter();
  const { confirm, hasUnsavedChanges } = useFeedback();
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => setPending(null), [pathname]);

  // Never leave a stale "loading" state behind if a navigation is abandoned.
  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setPending(null), 10_000);
    return () => window.clearTimeout(timer);
  }, [pending]);

  const navigate: Navigate = useCallback(
    async (event, href) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (href === pathname) {
        onNavigate();
        return;
      }
      if (hasUnsavedChanges()) {
        event.preventDefault();
        const ok = await confirm({
          title: "Leave without saving?",
          message: "Your unsaved edits on this page will be lost.",
          confirmLabel: "Leave page",
          tone: "danger",
        });
        if (!ok) return;
        router.push(href);
      }
      setPending(href);
      onNavigate();
    },
    [pathname, router, confirm, hasUnsavedChanges, onNavigate]
  );

  return { pending, navigate };
}

/** Top system bar: Kali menu button, location, status tray, clock. */
function SystemBar({
  system,
  pending,
  navigate,
  onMenu,
  menuOpen,
}: {
  system: SystemInfo;
  pending: boolean;
  navigate: Navigate;
  onMenu: () => void;
  menuOpen: boolean;
}) {
  const pathname = usePathname() ?? "/admin";
  const unsaved = useUnsavedCount();

  return (
    <header className="adm-bar">
      <button
        type="button"
        className="adm-bar-menu"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={onMenu}
      >
        <Icon name={menuOpen ? "x" : "menu"} size={18} />
      </button>
      <Link href="/admin" prefetch={false} className="adm-bar-logo" aria-label="Command Center" onClick={(event) => navigate(event, "/admin")}>
        <Image src={kaliLogo} alt="" width={24} height={24} priority />
      </Link>
      <p className="adm-bar-brand">
        <strong>Control Center</strong>
        <span>kali-admin</span>
      </p>
      <span className="adm-bar-sep" aria-hidden="true" />
      <p className="adm-bar-path" title={`root@kali:~${pathname}`}>
        <b>root㉿kali</b>:<em>~{pathname}</em>
        <span className="adm-caret" aria-hidden="true" />
      </p>

      <div className="adm-bar-tray">
        {unsaved > 0 && (
          <span className="adm-tray adm-tray--warn" role="status">
            <StatusDot tone="warning" live />
            <span className="adm-tray-label">unsaved</span>
          </span>
        )}
        <span
          className="adm-tray"
          title={system.configured ? `Content store: ${system.host ?? "Supabase"}` : "Supabase is not configured"}
        >
          <StatusDot tone={system.configured ? "success" : "warning"} live={system.configured} />
          <span className="adm-tray-label">{system.configured ? "supabase" : "static"}</span>
        </span>
        <a href="/" target="_blank" rel="noopener noreferrer" className="adm-tray" title="Open the live portfolio">
          <Icon name="external" size={15} />
          <span className="adm-tray-label">live site</span>
        </a>
        <SystemClock />
      </div>

      <span className="adm-bar-progress" data-active={pending} aria-hidden="true" />
    </header>
  );
}

/** Kali-menu style module list with a selection that glides between entries. */
function SideNav({ pending, navigate }: { pending: string | null; navigate: Navigate }) {
  const pathname = usePathname();
  const active = navFor(pathname)?.item.href;
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<{ top: number; height: number } | null>(null);
  const [glide, setGlide] = useState(false);

  useIsoLayoutEffect(() => {
    const nav = navRef.current;
    const measure = () => {
      const link = active ? linkRefs.current.get(active) : undefined;
      setIndicator(link ? { top: link.offsetTop, height: link.offsetHeight } : null);
    };
    measure();
    // The first placement snaps into place; later changes glide.
    const frame = window.requestAnimationFrame(() => setGlide(true));
    const observer = nav ? new ResizeObserver(measure) : null;
    if (nav) observer?.observe(nav);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [active]);

  return (
    <nav ref={navRef} className="adm-nav" aria-label="Admin modules">
      {indicator && (
        <span
          className="adm-nav-indicator"
          style={{
            transform: `translateY(${indicator.top}px)`,
            height: indicator.height,
            transition: glide ? undefined : "none",
          }}
          aria-hidden="true"
        />
      )}
      {NAV.map((group) => (
        <div key={group.title} className="adm-nav-group">
          <p className="adm-nav-title">{group.title}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={(event) => navigate(event, item.href)}
              ref={(node) => {
                if (node) linkRefs.current.set(item.href, node);
                else linkRefs.current.delete(item.href);
              }}
              aria-current={item.href === active ? "page" : undefined}
              data-pending={pending === item.href || undefined}
              className="adm-nav-link"
              title={item.label}
            >
              <span className="adm-nav-num" aria-hidden="true">
                {moduleNumber(item)}
              </span>
              <Icon name={item.icon} size={19} />
              <span className="adm-nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

/** Signed-in operator and sign out, at the foot of the side panel. */
function Session({ email }: { email: string }) {
  const { confirm, hasUnsavedChanges } = useFeedback();
  const formRef = useRef<HTMLFormElement>(null);
  const confirmed = useRef(false);

  return (
    <div className="adm-session">
      <span className="adm-session-avatar" aria-hidden="true">
        {email.charAt(0).toUpperCase()}
        <StatusDot tone="success" />
      </span>
      <div className="adm-session-text">
        <p>session secure</p>
        <p title={email}>{email}</p>
      </div>
      <form
        ref={formRef}
        action={signOutAction}
        onSubmit={async (event) => {
          if (confirmed.current || !hasUnsavedChanges()) return;
          event.preventDefault();
          const ok = await confirm({
            title: "Sign out with unsaved changes?",
            message: "Your unsaved edits on this page will be lost.",
            confirmLabel: "Sign out",
            tone: "danger",
          });
          if (ok) {
            confirmed.current = true;
            formRef.current?.requestSubmit();
          }
        }}
      >
        <button type="submit" className="adm-btn adm-btn--ghost adm-btn--icon adm-signout" aria-label="Sign out" title="Sign out">
          <Icon name="power" size={17} />
        </button>
      </form>
    </div>
  );
}

function Shell({
  email,
  system,
  access,
  children,
}: {
  email: string;
  system: SystemInfo;
  access?: AccessReport;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAccess, setShowAccess] = useState(Boolean(access));
  // "hold" keeps the shell's entrance paused under the access sequence.
  const [boot, setBoot] = useState<"hold" | "reveal" | undefined>(access ? "hold" : undefined);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const { pending, navigate } = useGuardedNavigation(closeDrawer);

  useEffect(() => setDrawerOpen(false), [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className="adm-shell" data-boot={boot}>
      <Wallpaper variant="desk" />

      <SystemBar
        system={system}
        pending={pending !== null}
        navigate={navigate}
        menuOpen={drawerOpen}
        onMenu={() => setDrawerOpen((open) => !open)}
      />

      {drawerOpen && <div className="adm-scrim lg:hidden" onClick={closeDrawer} aria-hidden="true" />}

      <aside className="adm-side" data-open={drawerOpen} aria-label="Admin navigation">
        <div className="adm-side-scroll">
          <SideNav pending={pending} navigate={navigate} />
        </div>
        <div className="adm-side-foot">
          <Session email={email} />
        </div>
      </aside>

      <main className="adm-main">
        <div key={pathname} className="adm-page">
          {children}
        </div>
      </main>

      {showAccess && access && (
        <AccessSequence report={access} onReveal={() => setBoot("reveal")} onDone={() => setShowAccess(false)} />
      )}
    </div>
  );
}

export default function AdminShell(props: {
  email: string;
  system: SystemInfo;
  /** Present right after sign-in: plays the access sequence once. */
  access?: AccessReport;
  children: React.ReactNode;
}) {
  return (
    <AdminFeedbackProvider>
      <Shell {...props} />
    </AdminFeedbackProvider>
  );
}
