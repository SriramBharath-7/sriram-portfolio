"use client";

import { useState } from "react";
import Terminal from "../components/Terminal";
import ArchLinuxOS from "../components/ArchLinuxOS";
import Firefox from "../components/Firefox";
import { DEFAULT_GITHUB_USERNAME } from "../constants/profile";

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showFirefox, setShowFirefox] = useState(false);
  const [showGitHubProjects, setShowGitHubProjects] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [githubUsername, setGithubUsername] = useState(DEFAULT_GITHUB_USERNAME); // Default username
  const [firefoxPosition, setFirefoxPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 50 });

  // Function to handle opening Firefox from Terminal
  const handleOpenFirefox = (showProjects = false, showTools = false, showCertsParam = false) => {
    console.log('Opening Firefox with params:', { showProjects, showTools });
    
    // Set from centralized defaults
    setGithubUsername(DEFAULT_GITHUB_USERNAME);

    // Calculate center position for Firefox
    if (typeof window !== "undefined") {
      // Short timeout to ensure main component is fully rendered
      setTimeout(() => {
        // Find the main OS container to position relative to it
        const osContainer = document.querySelector("main") as HTMLElement;
        if (!osContainer) return;

        // Get OS container dimensions and position
        const osRect = osContainer.getBoundingClientRect();
        const osCenter = {
          x: osRect.left + osRect.width / 2,
          y: osRect.top + osRect.height / 2,
        };

        // Determine the appropriate size of Firefox window
        let width, height, maxWidth;

        if (window.innerWidth < 768) {
          width = "95vw";
          height = "75vh";
          maxWidth = "700px";
        } else if (window.innerWidth < 1024) {
          width = "85vw";
          height = "80vh";
          maxWidth = "1000px";
        } else {
          width = "80vw";
          height = "85vh";
          maxWidth = "1400px";
        }

        // Convert vw/vh to pixels
        const parsedWidth = (parseFloat(width) / 100) * window.innerWidth;
        // Account for maxWidth constraint
        const actualWidth = Math.min(parsedWidth, parseFloat(maxWidth));
        const parsedHeight = (parseFloat(height) / 100) * window.innerHeight;

        // Define waybar height
        const WAYBAR_HEIGHT = 48;

        // Calculate position to center Firefox relative to OS center
        const centerX = Math.floor(osCenter.x - actualWidth / 2);
        const centerY = Math.floor(osCenter.y - parsedHeight / 2);

        // Ensure it's below the waybar and within window bounds
        const boundedX = Math.max(
          0,
          Math.min(window.innerWidth - actualWidth, centerX)
        );
        const boundedY = Math.max(
          WAYBAR_HEIGHT + 2,
          Math.min(window.innerHeight - parsedHeight, centerY)
        );

        // Set centered position for Firefox with precise values
        setFirefoxPosition({
          x: boundedX,
          y: boundedY,
        });
        
        console.log('Firefox position set to:', { x: boundedX, y: boundedY });
        
        // Set these state variables AFTER position is calculated
        setShowFirefox(true);
        setShowGitHubProjects(showProjects);
        setShowTools(showTools);
        setShowCerts(showCertsParam);
        
        console.log('Firefox states set:', { 
          showFirefox: true, 
          showGitHubProjects: showProjects, 
          showTools: showTools 
        });
      }, 50); // Increased timeout to ensure reliable execution
    } else {
      // Still set the states if window is not defined (server-side rendering)
      setShowFirefox(true);
      setShowGitHubProjects(showProjects);
      setShowTools(showTools);
      setShowCerts(showCertsParam);
    }
  };

  return (
    <main className="min-h-screen p-4 font-mono text-green-400 flex items-center justify-center relative overflow-hidden">
      {/* Arch Linux with Hyprland desktop - always show the desktop */}
      <ArchLinuxOS onOpenTerminal={() => setShowTerminal(true)} />

      {/* Terminal component */}
      {showTerminal && (
        <Terminal
          onClose={() => setShowTerminal(false)}
          onOpenFirefox={handleOpenFirefox}
        />
      )}

      {/* Firefox component */}
      {showFirefox && (
        <Firefox
          onClose={() => {
            console.log('Closing Firefox');
            setShowFirefox(false);
            setShowGitHubProjects(false);
            setShowTools(false);
            setShowCerts(false);
          }}
          initialUrl={showCerts ? 'home://certs' : 'home://start'}
          showProjects={showGitHubProjects}
          showTools={showTools}
          githubUsername={githubUsername}
          initialPosition={firefoxPosition}
        />
      )}
    </main>
  );
}
