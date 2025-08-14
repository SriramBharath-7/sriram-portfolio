'use client';

import { useEffect, useState } from "react";
import { isMobile, isTablet, browserName, osName } from 'react-device-detect';
import Image from 'next/image';

// Updated minimum required viewport dimensions
const MIN_WIDTH = 1291;
const MIN_HEIGHT = 713;

interface DeviceInfo {
  isMobileDevice: boolean;
  isTabletDevice: boolean;
  isLandscape: boolean;
  viewportWidth: number;
  viewportHeight: number;
  browser: string;
  os: string;
  meetsRequirements: boolean;
  isPcOrLaptop: boolean;
}

function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobileDevice: false,
    isTabletDevice: false,
    isLandscape: true,
    viewportWidth: 0,
    viewportHeight: 0,
    browser: '',
    os: '',
    meetsRequirements: true,
    isPcOrLaptop: true,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      // Detect if device is PC/Laptop based on OS and lack of mobile/tablet detection
      const isPcOrLaptop = !isMobile && !isTablet;
      
      setDeviceInfo({
        isMobileDevice: isMobile && !isTablet,
        isTabletDevice: isTablet,
        isLandscape,
        viewportWidth: width,
        viewportHeight: height,
        browser: browserName,
        os: osName,
        meetsRequirements: isPcOrLaptop || (width >= MIN_WIDTH && height >= MIN_HEIGHT),
        isPcOrLaptop,
      });
    };

    // Initial check
    updateDeviceInfo();

    // Add event listeners for resize and orientation change
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Sriram's Portfolio");

  useEffect(() => {
    const texts = [
      "Initializing Sriram's Portfolio",
      'Checking Device Compatibility',
      'Loading Resources',
      'Preparing Environment'
    ];
    let currentIndex = 0;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(progressInterval);
          // Wait a moment then trigger completion
          setTimeout(() => {
            onComplete();
          }, 500);
        }
        return next > 100 ? 100 : next;
      });
    }, 30);

    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center cursor-none">
      <div className="text-center relative w-64">
        <div className="absolute inset-0 bg-transparent"></div>
        <div className="relative">
          <p className="text-blue-400 text-sm animate-pulse mb-6">{loadingText}</p>
          <div className="relative h-16 w-16 mx-auto">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500">
              <div className="absolute inset-0 border-r-2 border-l-2 border-transparent rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-blue-400 text-sm font-mono">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileWarning({ deviceInfo }: { deviceInfo: DeviceInfo }) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setHovered(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getDeviceSpecificMessage = () => {
    if (deviceInfo.isTabletDevice && !deviceInfo.isLandscape) {
      return "Please rotate your tablet to landscape mode for the best experience.";
    }
    if (deviceInfo.viewportWidth < MIN_WIDTH || deviceInfo.viewportHeight < MIN_HEIGHT) {
      return `Your screen resolution (${deviceInfo.viewportWidth}x${deviceInfo.viewportHeight}) is below the recommended minimum of ${MIN_WIDTH}x${MIN_HEIGHT}.`;
    }
    return "This portfolio showcases interactive elements and complex animations that require a larger screen for the optimal experience.";
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 overflow-hidden">
      {/* Existing background animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div 
        className={`
          max-w-md w-full space-y-8 p-8 
          bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl 
          border border-green-500/20 
          transform transition-all duration-700 
          hover:shadow-green-500/10 hover:border-green-500/30
          ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Existing content structure */}
        <div className="text-center relative">
          {/* Logo section */}
          <div className="mb-8 relative group">
            <div className={`
              absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 
              blur-xl rounded-full transform transition-all duration-500
              ${hovered ? 'scale-125 opacity-75' : 'scale-100 opacity-50'}
            `}></div>
            <Image
              src="/assets/ico/hacker.ico"
              alt="Logo"
              width={64}
              height={64}
              className={`
                mx-auto relative transform transition-all duration-500
                hover:scale-110 hover:rotate-3
                ${hovered ? 'rotate-6' : 'rotate-0'}
              `}
            />
          </div>

          {/* Dynamic message based on device */}
          <h2 className={`
            text-3xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-green-400 to-blue-500 mb-2
            transform transition-all duration-500
            ${hovered ? 'scale-105' : 'scale-100'}
          `}>
            {deviceInfo.isTabletDevice ? 'Rotate Device' : 'Desktop Experience Required'}
          </h2>

          <div className={`
            h-1 w-24 mx-auto rounded-full mb-8 transition-all duration-500
            bg-gradient-to-r from-green-400 to-blue-500
            ${hovered ? 'w-32 opacity-100' : 'w-24 opacity-75'}
          `}></div>

          <div className={`
            space-y-6 transform transition-all duration-700 delay-300
            ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}>
            <p className="text-gray-300 text-lg leading-relaxed">
              {getDeviceSpecificMessage()}
            </p>

            {/* Device info box */}
            <div className={`
              bg-gray-900/50 backdrop-blur-lg p-6 rounded-lg 
              border border-green-500/20 transition-all duration-500
              ${hovered ? 'border-green-500/40 shadow-lg' : ''}
            `}>
              <p className="text-green-400 font-medium mb-4">Your Device Information:</p>
              <ul className="text-gray-300 space-y-3">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Device Type: {deviceInfo.isTabletDevice ? 'Tablet' : deviceInfo.isMobileDevice ? 'Mobile' : 'Desktop'}
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Browser: {deviceInfo.browser}
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  OS: {deviceInfo.os}
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Resolution: {deviceInfo.viewportWidth}x{deviceInfo.viewportHeight}
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">•</span>
                  Orientation: {deviceInfo.isLandscape ? 'Landscape' : 'Portrait'}
                </li>
              </ul>
            </div>

            {/* Requirements section */}
            <div className={`
              text-gray-400 text-sm border-t border-gray-700/50 pt-6
              transform transition-all duration-500
              ${hovered ? 'border-gray-600/50' : ''}
            `}>
              <p className="flex items-center justify-center">
                <svg 
                  className={`
                    w-4 h-4 mr-2 transition-all duration-500
                    ${hovered ? 'rotate-180 scale-110' : ''}
                  `}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <span className={`
                  transition-all duration-500
                  ${hovered ? 'text-green-400' : ''}
                `}>
                  Minimum Resolution: {MIN_WIDTH}x{MIN_HEIGHT}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileDetector({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const deviceInfo = useDeviceInfo();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Add a small delay for the fade animation
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  if (!isClient || isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // Show warning if:
  // 1. Device is mobile
  // 2. Device is tablet in portrait mode
  // 3. Viewport is too small (only for non-PC devices)
  const shouldShowWarning = 
    !deviceInfo.isPcOrLaptop && (
      deviceInfo.isMobileDevice || 
      (deviceInfo.isTabletDevice && !deviceInfo.isLandscape) ||
      !deviceInfo.meetsRequirements
    );

  return (
    <div className={`transition-opacity duration-1000 bg-black ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        html, body {
          cursor: none !important;
        }
        button, a, input, textarea, select, [role="button"], [tabindex] {
          cursor: none !important;
        }
        input[type="text"], input[type="email"], textarea {
          cursor: none !important;
        }
        .terminal-output {
          cursor: none !important;
        }
        .command-input-form input {
          cursor: none !important;
        }
      `}</style>
      {shouldShowWarning ? <MobileWarning deviceInfo={deviceInfo} /> : children}
    </div>
  );
} 