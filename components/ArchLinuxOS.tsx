"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
// Import Firefox dynamically to fix the rendering issue
const Firefox = dynamic(() => import('./Firefox'), { ssr: false });
import firefoxLogo from "../public/assets/svg/firefox.svg";
import terminallogo from "../public/assets/svg/terminal.svg";
import archLinuxLogo from "../public/assets/svg/kali-logo.png";
// Import the wallpaper
import wallpaper from "../public/assets/wallpaper/kali-ferrofluid.jpg";

interface ArchLinuxOSProps {
  onOpenTerminal: (initialPosition?: { x: number; y: number }) => void;
}

export default function ArchLinuxOS({ onOpenTerminal }: ArchLinuxOSProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [showHint, setShowHint] = useState(true);
  const [showFirefox, setShowFirefox] = useState(false);
  const [showFirefoxProjects, setShowFirefoxProjects] = useState(false);
  const [initialWindowPosition, setInitialWindowPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Set initial time and date values on client-side only
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
    setCurrentDate(now.toLocaleDateString());

    // Set the initial window position safely on the client side
    setInitialWindowPosition({
      x: window.innerWidth * 0.025,
      y: window.innerHeight * 0.05 + 48, // Add 48px to start below the waybar
    });

    // Update the time every second
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    }, 1000);

    // Hide hint after 5 seconds (reduced from 10)
    const hintTimer = setTimeout(() => {
      setShowHint(false);
    }, 5000); // Increased to 8 seconds to give more time to read

    return () => {
      clearInterval(timer);
      clearTimeout(hintTimer);
    };
  }, []);

  // Function to handle opening Firefox from Terminal with projects
  const handleOpenFirefox = (showProjects = false, showTools = false) => {
    console.log('ArchLinuxOS: Opening Firefox with params:', { showProjects, showTools });
    
    // Calculate a properly centered position for Firefox
    if (typeof window !== 'undefined') {
      // First determine the appropriate size of Firefox window
      let width, height;
      
      if (window.innerWidth < 768) {
        width = '95vw';
        height = '75vh';
      } else if (window.innerWidth < 1024) {
        width = '85vw';
        height = '80vh';
      } else {
        width = '80vw';
        height = '85vh';
      }
      
      // Convert vw/vh to pixels
      const parsedWidth = (parseFloat(width) / 100) * window.innerWidth;
      const parsedHeight = (parseFloat(height) / 100) * window.innerHeight;
      
      // Define waybar height
      const WAYBAR_HEIGHT = 48;
      
      // Calculate exact center position
      const centerX = (window.innerWidth - parsedWidth) / 2;
      const centerY = (window.innerHeight - parsedHeight) / 2;
      
      // Set centered position for Firefox
      setInitialWindowPosition({
        x: Math.max(0, centerX),
        y: Math.max(WAYBAR_HEIGHT + 2, centerY)
      });

      console.log('ArchLinuxOS: Firefox position set to:', { 
        x: Math.max(0, centerX), 
        y: Math.max(WAYBAR_HEIGHT + 2, centerY) 
      });
    } else {
      // Fallback if window is not defined
      setInitialWindowPosition({
        x: 0,
        y: 56
      });
      console.log('ArchLinuxOS: Using fallback position because window is not defined');
    }
    
    // Use a slight delay to prevent flickering
    setTimeout(() => {
      console.log('ArchLinuxOS: Setting Firefox states');
      setShowFirefoxProjects(showProjects);
      setShowFirefox(true);
    }, 50);
  };

  // Set initial position for windows to be below the waybar
  // This declaration was moved to the useEffect hook to avoid "window is not defined" error

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
        <div className="welcome-hint fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md p-5 rounded-lg shadow-2xl z-50 text-center max-w-md border-2 border-blue-500/40 animate-fadeIn">
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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-blue-400"
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
              Welcome to My Portfolio
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mb-3"></div>
          </div>
          
          <div className="mb-4 animate-fadeIn delay-300">
            {/* Only Terminal Instructions */}
            <div className="instruction-container bg-slate-800/70 p-3 rounded-lg border border-blue-500/30 text-left animate-float">
              <div className="flex items-center mb-1">
                <div className="p-1.5 rounded-full bg-blue-500/20 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-blue-400 font-bold text-sm">Terminal Interaction</span>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed pl-8">
                Click <span className="text-blue-400 font-medium">Terminal</span> icon for CLI. Type <span className="bg-slate-700/70 px-1 rounded text-cyan-300 font-mono text-xs">help</span> for commands.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center animate-fadeIn delay-500">
            <div className="w-full h-6 bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-1.5 rounded-md border border-blue-500/30 mb-2 flex items-center justify-center overflow-hidden">
              <div className="h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 w-full animate-scanning"></div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center animate-fadeIn delay-600">
            <div className="flex items-center justify-center text-xs bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-2 rounded-md border border-blue-500/30 w-full mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-blue-400 mr-1.5 animate-pulse"
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
                Click Terminal to begin exploring
              </span>
            </div>
            <div className="text-[10px] text-gray-400 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 mr-1 text-gray-500"
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

      {/* Firefox browser */}
      {showFirefox && initialWindowPosition && (
        <Firefox
          onClose={() => {
            console.log('ArchLinuxOS: Closing Firefox');
            setShowFirefox(false);
            setShowFirefoxProjects(false);
          }}
          initialUrl={`home://start`}
          showProjects={showFirefoxProjects}
          showTools={false}
          initialPosition={initialWindowPosition}
        />
      )}

      {/* Desktop icons with larger size */}
      <div className="desktop-icons absolute top-16 left-4 grid gap-6 z-30">
        <div
          className="desktop-icon flex flex-col items-center cursor-pointer"
          onClick={() => initialWindowPosition && onOpenTerminal(initialWindowPosition)}
        >
          <div className="icon-bg p-3 mb-2">
            <Image
              src={terminallogo}
              alt="Terminal Logo"
              width={56}
              height={56}
              className="transition-all duration-300"
              style={{ width: '56px', height: '56px', maxWidth: '100%', objectFit: 'contain' }}
              priority
            />
          </div>
          <span className="text-xs text-white font-medium px-2 py-1 rounded">
            Terminal
          </span>
        </div>

        <div
          className="desktop-icon flex flex-col items-center cursor-pointer"
          onClick={() => handleOpenFirefox(false, false)}
        >
          <div className="icon-bg p-3 mb-2">
            <Image
              src={firefoxLogo}
              alt="Firefox Logo"
              width={56}
              height={56}
              className="transition-all duration-300"
              style={{ width: '56px', height: '56px', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>
          <span className="text-xs text-white font-medium px-2 py-1 rounded">
            Firefox
          </span>
        </div>
      </div>

      {/* Hyprland window decorations - subtle border glow */}
      <div className="hyprland-window-effect"></div>

      {/* Hyprland taskbar - with customized transparency */}
      <div className="taskbar fixed top-0 left-0 right-0 h-12 bg-gray-900/60 backdrop-blur-sm flex items-center px-4 z-[100] border-b border-gray-800/40 shadow-md pointer-events-auto">
        <div className="arch-logo mr-4 text-green-400 flex items-center justify-center">
          <Image
            src={archLinuxLogo}
            alt="Arch Linux Logo"
            width={24}
            height={24}
            className="transition-all duration-300"
            style={{ width: '24px', height: '24px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Active applications in taskbar */}
        <div className="active-apps flex space-x-2 ml-4">
          {/* Terminal and Firefox icons will appear here when minimized */}
          {/* The minimized application indicators are created directly in their respective components */}
          {/* This allows each component to control its own taskbar indicator */}
        </div>

        {/* System tray */}
        <div className="system-tray ml-auto flex items-center space-x-4">
          <div className="tray-icon">
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
          <div className="tray-icon">
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
          {currentDate && currentTime && (
            <div className="datetime-widget flex items-center space-x-2 bg-gray-800/40 px-2 py-1 rounded-md border border-gray-700/50 backdrop-blur-sm">
              <div className="date-section flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-green-400 mr-1"
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
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide leading-tight">
                    {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="text-xs text-gray-200 font-medium leading-tight">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="time-section flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-cyan-400 mr-1"
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
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide leading-tight">
                    {new Date().toLocaleTimeString('en-US', { hour12: false }).split(':')[0]}h
                  </span>
                  <span className="text-xs text-gray-200 font-mono leading-tight">
                    {new Date().toLocaleTimeString('en-US', { 
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Star Button */}
      <div className="fixed bottom-4 right-4 z-50 group">
        <a
          href="https://github.com/SriramBharath-7/sriram-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-gray-900/90 to-gray-800/90 hover:from-gray-800/90 hover:to-gray-700/90 text-white px-4 py-2 rounded-lg border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 group-hover:border-blue-500/50"
        >
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400 transform group-hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.431 8.2 1.191-5.932 5.783 1.4 8.168-7.336-3.857-7.336 3.857 1.4-8.168-5.932-5.783 8.2-1.191z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-gray-900">★</span>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium group-hover:text-blue-400 transition-colors duration-300">Star on GitHub</span>
            <span className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Support the project</span>
          </div>
          <div className="ml-2 px-2 py-1 bg-gray-800/50 rounded-md border border-gray-700/50 group-hover:border-blue-500/30 transition-colors duration-300">
            <span className="text-xs font-mono text-gray-300 group-hover:text-blue-400 transition-colors duration-300">★</span>
          </div>
        </a>
      </div>
      
    </div>
  );
}
