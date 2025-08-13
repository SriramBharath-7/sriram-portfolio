"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Kali Linux inspired colors
const CURSOR_COLORS = {
  primary: "#60a5fa",    // Soft Bright Blue (main dot) — stands out nicely on dark bg
  secondary: "#1F1E35",  // Dark Purple (follower & ring border) — blends with bg, subtle but visible
  accent: "#A3C4F3",     // Pale Blue Glow (glow effect) — smooth glowing effect with blue tint
};

// Cursor sizes
const CURSOR_SIZES = {
  dot: 5,
  follower: 20,
  ring: 26,
  glow: 82,
};

// Follow speed factors
const FOLLOW_SPEED = {
  cursor: 0.1,
  follower: 0.2,
  ring: 0.3,
  glow: 0.4,
};

const MIN_VIEWPORT_WIDTH = 1024;

const NewCustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLargeViewport, setIsLargeViewport] = useState(false);

  const targetPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const checkViewportSize = () => {
      setIsLargeViewport(window.innerWidth >= MIN_VIEWPORT_WIDTH);
    };

    checkViewportSize();
    window.addEventListener("resize", checkViewportSize);

    return () => {
      window.removeEventListener("resize", checkViewportSize);
    };
  }, []);

  useEffect(() => {
    if (!isLargeViewport) {
      const existingStyle = document.querySelector("style[data-custom-cursor]");
      if (existingStyle) {
        existingStyle.remove();
      }
      return;
    }

    if (
      !cursorRef.current ||
      !followerRef.current ||
      !glowRef.current ||
      !ringRef.current
    )
      return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const glow = glowRef.current;
    const ring = ringRef.current;

    const style = document.createElement("style");
    style.setAttribute("data-custom-cursor", "true");
    style.innerHTML = `
      @media (min-width: ${MIN_VIEWPORT_WIDTH}px) {
        * {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    targetPos.current = { x: initialX, y: initialY };

    gsap.set([cursor, follower, ring, glow], {
      x: initialX,
      y: initialY,
    });

    animationRef.current = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        if (!cursor || !follower || !ring || !glow) return;

        gsap.to(cursor, {
          x: targetPos.current.x,
          y: targetPos.current.y,
          duration: FOLLOW_SPEED.cursor,
          ease: "power1.out",
          overwrite: "auto",
        });

        gsap.to(follower, {
          x: targetPos.current.x,
          y: targetPos.current.y,
          duration: FOLLOW_SPEED.follower,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(ring, {
          x: targetPos.current.x,
          y: targetPos.current.y,
          duration: FOLLOW_SPEED.ring,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(glow, {
          x: targetPos.current.x,
          y: targetPos.current.y,
          duration: FOLLOW_SPEED.glow,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    gsap.to(ring, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    gsap.to(cursor, {
      scale: 1.2,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(glow, {
      opacity: 0.6,
      duration: 3,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    setIsVisible(true);

    return () => {
      if (animationRef.current) animationRef.current.kill();

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);

      const existingStyle = document.querySelector("style[data-custom-cursor]");
      if (existingStyle) existingStyle.remove();
    };
  }, [isLargeViewport]);

  if (!isLargeViewport) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed rounded-full pointer-events-none z-[9999] mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${CURSOR_SIZES.dot}px`,
          height: `${CURSOR_SIZES.dot}px`,
          backgroundColor: CURSOR_COLORS.primary,
          boxShadow: `0 0 5px ${CURSOR_COLORS.primary}`,
          transition: "opacity 0.3s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Follower */}
      <div
        ref={followerRef}
        className={`fixed border-2 rounded-full pointer-events-none z-[9998] mix-blend-difference ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${CURSOR_SIZES.follower}px`,
          height: `${CURSOR_SIZES.follower}px`,
          borderColor: CURSOR_COLORS.secondary,
          backdropFilter: "blur(1px)",
          transition: "opacity 0.3s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`fixed border rounded-full pointer-events-none z-[9997] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${CURSOR_SIZES.ring}px`,
          height: `${CURSOR_SIZES.ring}px`,
          borderColor: `rgba(${hexToRgb(CURSOR_COLORS.secondary)}, 0.3)`,
          backdropFilter: "blur(1px)",
          transition: "opacity 0.3s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Glow */}
      <div
        ref={glowRef}
        className={`fixed rounded-full pointer-events-none z-[9996] ${
          isVisible ? "opacity-40" : "opacity-0"
        }`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${CURSOR_SIZES.glow}px`,
          height: `${CURSOR_SIZES.glow}px`,
          background: `radial-gradient(circle, rgba(${hexToRgb(
            CURSOR_COLORS.accent
          )}, 0.4) 0%, rgba(${hexToRgb(CURSOR_COLORS.accent)}, 0.1) 50%, rgba(${hexToRgb(
            CURSOR_COLORS.accent
          )}, 0) 70%)`,
          filter: "blur(8px)",
          transition: "opacity 0.3s ease",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
};

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : "0, 0, 0";
}

export default NewCustomCursor;
