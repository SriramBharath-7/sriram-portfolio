'use client';

import { useEffect, useState, useCallback } from 'react';
import CustomAlert from './CustomAlert';

const InspectionPrevention = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'right-click' | 'dev-tools' | 'inspect'>('inspect');
  const [attemptCount, setAttemptCount] = useState(0);

  // Function to show custom alert with rate limiting
  const showCustomAlert = useCallback((message: string, type: 'right-click' | 'dev-tools' | 'inspect') => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setAttemptCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    let devToolsOpen = false;

    // Function to detect dev tools
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
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

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('resize', detectDevTools);

    // Initial check
    detectDevTools();

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', detectDevTools);
    };
  }, [showCustomAlert]);

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