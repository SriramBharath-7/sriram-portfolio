'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CustomAlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type: 'right-click' | 'dev-tools' | 'inspect';
}

const CustomAlert = ({ message, isVisible, onClose, type }: CustomAlertProps) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Initial state
      gsap.set(alertRef.current, { 
        scale: 0.8, 
        opacity: 0,
        y: -50,
        rotation: -5
      });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(iconRef.current, { scale: 0, rotation: -180 });

      // Animate in
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(alertRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
      .to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });
    }
  }, [isVisible]);

  const handleClose = () => {
    // Animate out
    const tl = gsap.timeline({
      onComplete: onClose
    });

    tl.to(iconRef.current, {
      scale: 0,
      rotation: 180,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(alertRef.current, {
      scale: 0.8,
      opacity: 0,
      y: -50,
      rotation: 5,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2")
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2");
  };

  const getIcon = () => {
    switch (type) {
      case 'right-click':
        return '🖱️';
      case 'dev-tools':
        return '🔧';
      case 'inspect':
        return '🔍';
      default:
        return '⚠️';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-blue-900/50 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      <div 
        ref={alertRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-900/90 rounded-lg shadow-xl p-6 max-w-md w-full z-50 border border-blue-500/30 shadow-blue-500/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div 
              ref={iconRef}
              className="text-2xl text-blue-500"
            >
              {getIcon()}
            </div>
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
              Inspection Disabled
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-blue-700 dark:text-blue-200 mb-4 pl-12">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500/10 border border-blue-400/30 text-blue-700 dark:text-blue-200 rounded-md hover:bg-blue-500/20 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomAlert; 