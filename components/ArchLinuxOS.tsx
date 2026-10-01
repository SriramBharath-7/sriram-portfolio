"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import wallpaper from "../public/assets/wallpaper/kali-ferrofluid.jpg";
import DesktopIcons from "./desktop/DesktopIcons";
import Taskbar from "./desktop/Taskbar";
import { usePortfolioContent } from "@/lib/content/provider";

/**
 * Renders the welcome message with two inline markers: **highlight** and
 * `command`. Output is plain React text, never HTML.
 */
function renderInline(text: string): React.ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} className="text-blue-400 font-medium">
            {part.slice(2, -2)}
          </span>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <span key={index} className="bg-slate-700/70 px-1 rounded text-cyan-300 font-mono t-md">
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
}

/** Desktop shell: wallpaper, welcome hint, launcher icons and the top bar. */
export default function ArchLinuxOS() {
  const { welcome, githubWidget } = usePortfolioContent().settings;
  const [showHint, setShowHint] = useState(welcome.enabled);

  useEffect(() => {
    if (!welcome.enabled) return;
    const hintTimer = setTimeout(() => setShowHint(false), welcome.autoCloseSeconds * 1000);
    return () => clearTimeout(hintTimer);
  }, [welcome.enabled, welcome.autoCloseSeconds]);


  return (
    <div className="hyprland-desktop w-full h-full absolute inset-0 z-10">
      {/* Wallpaper with blur effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="wallpaper-blur-container">
          <Image
            src={wallpaper}
            alt="Desktop Wallpaper"
            fill
            priority={false}
            quality={100}
            loading="lazy"
            className="wallpaper-image"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
              filter: "blur(2px)",
              transform: "scale(1.05)" // Slightly scale up to avoid blur edges
            }}
            unoptimized={true}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </div>
      </div>

      {/* Enhanced Welcome hint - Smaller size */}
      {showHint && (
        <div className="welcome-hint fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl z-50 text-center border-2 border-blue-500/40 animate-fadeIn">
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full p-1.5 shadow-lg pulse-glow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-900"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          
          <div className="mb-4 animate-slideUp">
            <h2 className="t-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              {welcome.title}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-2"></div>
          </div>
          
          <div className="mb-4 animate-fadeIn delay-300">
            {/* Only Terminal Instructions */}
            <div className="instruction-container bg-slate-800/70 p-4 rounded-lg border border-blue-500/30 text-left animate-float">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-blue-500/20 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-blue-400 font-bold t-lg">{welcome.heading}</span>
              </div>
              <p className="text-gray-300 t-md leading-relaxed pl-12">
                {renderInline(welcome.message)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center animate-fadeIn delay-500">
            <div className="w-full h-6 bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-1.5 rounded-md border border-blue-500/30 mb-3 flex items-center justify-center overflow-hidden">
              <div className="h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 w-full animate-scanning"></div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center animate-fadeIn delay-600">
            {welcome.callToAction && (
            <div className="flex items-center justify-center t-md bg-gradient-to-r from-slate-800/90 to-slate-900/90 px-3 py-2.5 rounded-md border border-blue-500/30 w-full mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-400 mr-2 animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="text-blue-400 font-medium">
                {welcome.callToAction}
              </span>
            </div>
            )}
            <div className="t-xs text-gray-400 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 mr-1.5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Auto-closing in a few seconds...</span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop icons with larger size */}
      <DesktopIcons />
      <div className="hyprland-window-effect"></div>

      {/* Hyprland taskbar - with customized transparency */}
      <Taskbar />
      {/* GitHub Star Button - keep behind app windows */}
      {githubWidget.enabled && (
      <div className="fixed bottom-6 right-6 z-20 group">
        <a
          href={githubWidget.url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-widget press flex items-center gap-3 px-4 py-2.5 bg-gray-900/85 hover:bg-gray-800/90 text-white rounded-lg border border-gray-700/60 hover:border-blue-500/50 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-colors duration-150"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-yellow-400 transition-transform duration-150 group-hover:rotate-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.431 8.2 1.191-5.932 5.783 1.4 8.168-7.336-3.857-7.336 3.857 1.4-8.168-5.932-5.783 8.2-1.191z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-[0.625rem] leading-none font-bold text-gray-900">★</span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="t-md font-semibold group-hover:text-blue-300 transition-colors duration-150">{githubWidget.label}</span>
            {githubWidget.caption && (
              <span className="t-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-150 mt-0.5">{githubWidget.caption}</span>
            )}
          </div>
          <div className="px-2 py-1 bg-gray-800/60 rounded-md border border-gray-700/60 group-hover:border-blue-500/40 transition-colors duration-150">
            <span className="t-xs font-mono text-gray-300 group-hover:text-blue-300 transition-colors duration-150">★</span>
          </div>
        </a>
      </div>
      )}

    </div>
  );
}
