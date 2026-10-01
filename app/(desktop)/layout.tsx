import "../globals.css";
import MobileDetector from "@/components/MobileDetector";
import NewCustomCursor from "@/components/NewCustomCursor";
import InspectionPrevention from "@/components/InspectionPrevention";
import { getPortfolioContent } from "@/lib/content/repository";

/** Public Kali desktop: boot screen, custom cursor and desktop styles. */
export default async function DesktopLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getPortfolioContent();

  return (
    <>
      {/* Anti-inspection is production-only so it cannot interfere with local development */}
      {process.env.NODE_ENV === "production" && <InspectionPrevention />}
      <NewCustomCursor />
      <MobileDetector bootMessages={settings.boot.messages}>{children}</MobileDetector>
    </>
  );
}
