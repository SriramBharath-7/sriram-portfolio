"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import archLinuxLogo from "@/public/assets/svg/kali-logo.png";
import { useWindowManager } from "@/lib/wm";

function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return null;

  return (
    <div className="datetime-widget flex items-center gap-2.5 bg-gray-800/50 px-2.5 py-1 rounded-md border border-gray-700/60">
      <div className="date-section flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-green-400 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div className="flex flex-col">
          <span className="t-xs text-gray-400 font-medium tracking-wide leading-tight">
            {now.toLocaleDateString("en-US", { weekday: "short" })}
          </span>
          <span className="t-sm text-gray-100 font-medium leading-tight">
            {now.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      </div>
      <div className="time-section flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-cyan-400 mr-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex flex-col">
          <span className="t-xs text-gray-400 font-medium tracking-wide leading-tight">
            {now.toLocaleTimeString("en-US", { hour12: false }).split(":")[0]}h
          </span>
          <span className="t-sm text-gray-100 font-mono leading-tight">
            {now.toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Top bar. Running-application indicators are derived from window manager
 * state and the app registry, so no component has to inject its own button.
 */
export default function Taskbar() {
  const { windows, apps, focusWindow, minimizeWindow, restoreWindow } = useWindowManager();

  const entries = windows
    .map((win) => ({ win, app: apps.find((app) => app.id === win.appId) }))
    .filter((entry) => entry.app?.showInTaskbar);

  const handleClick = (id: string, minimized: boolean, focused: boolean) => {
    if (minimized) return restoreWindow(id);
    if (focused) return minimizeWindow(id);
    focusWindow(id);
  };

  return (
    <div className="taskbar fixed top-0 left-0 right-0 bg-gray-950/75 backdrop-blur-md flex items-center px-4 z-[100] border-b border-gray-700/50 shadow-[0_2px_12px_rgba(0,0,0,0.45)] pointer-events-auto">
      <div className="arch-logo mr-3 text-green-400 flex items-center justify-center flex-shrink-0">
        <Image
          src={archLinuxLogo}
          alt="Arch Linux Logo"
          width={24}
          height={24}
          className="w-6 h-6 object-contain transition-all duration-300"
        />
      </div>

      <div className="active-apps flex items-center space-x-1 ml-2 h-full">
        {entries.map(({ win, app }) => (
          <button
            key={win.id}
            type="button"
            onClick={() => handleClick(win.id, win.minimized, win.focused)}
            title={app!.name}
            className={`taskbar-item h-full px-3 flex items-center gap-2 cursor-pointer border-b-2 ${
              win.focused
                ? "border-blue-400 bg-gray-800/60 text-blue-200"
                : "border-transparent hover:border-blue-500"
            } ${win.minimized ? "opacity-60" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app!.icon}
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            <span className="t-sm text-blue-300">{app!.name}</span>
          </button>
        ))}
      </div>

      <div className="system-tray ml-auto flex items-center gap-2">
        <div className="tray-icon w-9 h-9 flex items-center justify-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="tray-icon w-9 h-9 flex items-center justify-center rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m12.728 0l-3.536 3.536M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <Clock />
      </div>
    </div>
  );
}
