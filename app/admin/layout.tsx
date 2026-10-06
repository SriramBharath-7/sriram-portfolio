import "./admin.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Control Center", template: "%s · Control Center" },
  robots: { index: false, follow: false },
};

/** Private admin area on the same Kali machine as the desktop, without its boot screen or custom cursor. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
