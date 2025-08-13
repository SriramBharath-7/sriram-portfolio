import "./globals.css";
import { Metadata } from "next";
import Script from 'next/script';
import MobileDetector from "@/components/MobileDetector";
import NewCustomCursor from "@/components/NewCustomCursor";
import InspectionPrevention from "@/components/InspectionPrevention";

export const metadata: Metadata = {
  title: "Sriram's Portfolio",
  description: "Cybersecurity Expert Portfolio",
  icons: {
    icon: '/assets/ico/hacker.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Cybersecurity specialist portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sriram's Portfolio</title>
        <link rel="icon" href="/assets/ico/hacker.ico" />
      </head>
      <body className="antialiased">
        {/* Disable preload warnings */}
        <Script src="/disable-preload-warnings.js" strategy="beforeInteractive" />
        <InspectionPrevention />
        <NewCustomCursor />
        <MobileDetector>
          {children}
        </MobileDetector>
      </body>
    </html>
  );
}