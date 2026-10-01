"use client";

import { useWindowManager } from "@/lib/wm";

/** Desktop launcher icons: the registry merged with the admin app config, in its order. */
export default function DesktopIcons() {
  const { apps: allApps, openWindow } = useWindowManager();
  const apps = allApps.filter((app) => app.enabled && app.showOnDesktop);

  return (
    <div className="desktop-icons absolute grid z-30">
      {apps.map((app) => (
        <div
          key={app.id}
          className="desktop-icon flex flex-col items-center cursor-pointer group select-none"
          onClick={() => openWindow(app.id)}
        >
          <div className="icon-bg p-3 mb-1.5 rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.icon}
              alt={`${app.name} Logo`}
              width={56}
              height={56}
              className="pointer-events-none desktop-icon-img"
            />
          </div>
          <span className="desktop-icon-label t-sm text-white font-medium px-2.5 py-1 rounded-md text-center leading-snug">
            {app.name}
          </span>
        </div>
      ))}
    </div>
  );
}
