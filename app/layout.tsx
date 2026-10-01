import "./base.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sriram's Portfolio",
  description: "Cybersecurity Expert Portfolio",
  icons: {
    icon: "/assets/ico/hacker.ico",
  },
};

/**
 * Root shell shared by the public desktop and the private admin dashboard.
 * Everything desktop-specific (boot screen, custom cursor, anti-inspection,
 * desktop styles) lives in app/(desktop)/layout.tsx.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {/* Disable preload warnings */}
        <Script src="/disable-preload-warnings.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
