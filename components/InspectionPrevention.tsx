'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import CustomAlert from './CustomAlert';

const InspectionPrevention = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'right-click' | 'dev-tools' | 'inspect'>('inspect');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastWindowSizeRef = useRef({ width: 0, height: 0 });
  const isTabSwitchingRef = useRef(false);

  // Function to show custom alert with rate limiting
  const showCustomAlert = useCallback((message: string, type: 'right-click' | 'dev-tools' | 'inspect') => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setAttemptCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    let devToolsOpen = false;
    let initialCheckTimeout: NodeJS.Timeout;

    // Function to detect dev tools with improved logic
    const detectDevTools = () => {
      // Don't run detection until component is fully initialized
      if (!isInitialized) return;

      // Don't run detection if we're in the middle of a tab switch
      if (isTabSwitchingRef.current) return;

      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      // Additional check for more reliable detection
      const isDevToolsOpen = widthThreshold || heightThreshold;
      
      if (isDevToolsOpen) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          showCustomAlert(
            'Developer tools are disabled on this website. Please respect our terms of use.',
            'dev-tools'
          );
        }
      } else {
        devToolsOpen = false;
      }
    };

    // Smart resize handler that distinguishes between tab switching and dev tools
    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Set new timeout for debounced detection
      resizeTimeoutRef.current = setTimeout(() => {
        const currentSize = { width: window.innerWidth, height: window.innerHeight };
        const lastSize = lastWindowSizeRef.current;
        
        // Check if this is likely a tab switch (small changes) vs dev tools (large changes)
        const sizeChange = Math.abs(currentSize.width - lastSize.width) + Math.abs(currentSize.height - lastSize.height);
        
        // If it's a significant change (>50px total), it's likely dev tools
        if (sizeChange > 50) {
          lastWindowSizeRef.current = currentSize;
          detectDevTools();
        } else {
          // Small change, likely tab switch - update size but don't detect
          lastWindowSizeRef.current = currentSize;
        }
      }, 200); // Reduced debounce time for better responsiveness
    };

    // Handle tab visibility changes more intelligently
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is being hidden - mark as switching
        isTabSwitchingRef.current = true;
      } else {
        // Tab is becoming visible - wait a bit then allow detection
        setTimeout(() => {
          isTabSwitchingRef.current = false;
        }, 300);
      }
    };

    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showCustomAlert(
        'Right-click is disabled on this website. Please respect our terms of use.',
        'right-click'
      );
    };

    // Disable keyboard shortcuts for developer tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for common dev tools shortcuts
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.key === 'F12') ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
        showCustomAlert(
          'Developer tools are disabled on this website. Please respect our terms of use.',
          'dev-tools'
        );
      }
    };

    // Detect element inspection
    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const computedStyle = window.getComputedStyle(e.target);
        if (computedStyle.position === 'fixed' && computedStyle.zIndex === '9999') {
          showCustomAlert(
            'Element inspection is disabled on this website. Please respect our terms of use.',
            'inspect'
          );
        }
      }
    };

    // Add console warning
    console.warn('Inspection is disabled on this website. Please respect our terms of use.');

    // Initialize with a delay to prevent false positives
    const initializeDetection = () => {
      // Store initial window size
      lastWindowSizeRef.current = { 
        width: window.innerWidth, 
        height: window.innerHeight 
      };
      
      // Wait for the page to fully load and stabilize
      initialCheckTimeout = setTimeout(() => {
        setIsInitialized(true);
        // Initial check after initialization
        detectDevTools();
      }, 1000); // 1 second delay to ensure page is stable
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize);

    // Initialize detection
    initializeDetection();

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      if (initialCheckTimeout) {
        clearTimeout(initialCheckTimeout);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [showCustomAlert, isInitialized]);

  // Handle multiple attempts
  useEffect(() => {
    if (attemptCount > 3) {
      const message = 'Multiple inspection attempts detected. Please note that this behavior may be logged.';
      showCustomAlert(message, 'inspect');
    }
  }, [attemptCount, showCustomAlert]);

  return (
    <CustomAlert
      message={alertMessage}
      isVisible={showAlert}
      onClose={() => setShowAlert(false)}
      type={alertType}
    />
  );
};

export default InspectionPrevention; 