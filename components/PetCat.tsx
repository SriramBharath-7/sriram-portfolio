"use client";

import { useEffect, useRef, useState } from "react";

type CatState = "follow" | "sit" | "sleep";

export default function PetCat() {
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 40, y: 80 });
  const targetRef = useRef({ x: 40, y: 80 });
  const [state, setState] = useState<CatState>("follow");
  const [mounted, setMounted] = useState(false);
  const lastMoveRef = useRef<number>(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lastMoveRef.current = Date.now();
      targetRef.current = { x: e.clientX + 8, y: e.clientY + 8 };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    setMounted(true);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Animation loop (lerp towards target)
  useEffect(() => {
    const step = () => {
      const now = Date.now();
      const idleMs = now - lastMoveRef.current;

      // Decide state based on distance and idle
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (idleMs > 6000) {
        setState((s) => (s !== "sleep" ? "sleep" : s));
      } else if (dist < 20) {
        setState((s) => (s !== "sit" ? "sit" : s));
      } else {
        setState((s) => (s !== "follow" ? "follow" : s));
      }

      // Lerp
      const speed = state === "follow" ? 0.12 : 0.08;
      posRef.current.x += dx * speed;
      posRef.current.y += dy * speed;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`pet-cat pointer-events-none fixed z-30 select-none ${state}`}
      aria-hidden
    >
      {/* Simple SVG cat with blue eyes */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className="blue-eyes"
      >
        {/* Shadow */}
        <ellipse cx="24" cy="44" rx="12" ry="3" fill="rgba(0,0,0,0.25)" />
        {/* Ears */}
        <path d="M10 16 L16 6 L18 18 Z" fill="#1f2937" />
        <path d="M38 16 L32 6 L30 18 Z" fill="#1f2937" />
        {/* Head */}
        <circle cx="24" cy="22" r="14" fill="#111827" stroke="#0f172a" strokeWidth="1" />
        {/* Hoodie badge */}
        <rect x="17" y="30" width="14" height="10" rx="4" fill="#0b1020" stroke="#374151" strokeWidth="1" />
        <text x="24" y="38" textAnchor="middle" fontSize="7" fill="#9ca3af" fontFamily="monospace">&gt;_</text>
        {/* Eyes */}
        <g filter="url(#glow)">
          <ellipse cx="19" cy="22" rx="3.5" ry="4" fill="#60A5FA" />
          <ellipse cx="29" cy="22" rx="3.5" ry="4" fill="#60A5FA" />
          <circle cx="19" cy="22" r="1.4" fill="#1e40af" />
          <circle cx="29" cy="22" r="1.4" fill="#1e40af" />
        </g>
        {/* Nose */}
        <circle cx="24" cy="25" r="1.2" fill="#9ca3af" />
        {/* Z bubble when sleeping */}
        {state === "sleep" && (
          <g opacity="0.9">
            <text x="36" y="8" fontSize="8" fill="#93C5FD" fontFamily="monospace">Z</text>
          </g>
        )}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <style jsx>{`
        .pet-cat { will-change: transform; transition: transform 120ms ease-out; }
        .pet-cat.follow svg { animation: bob 0.9s ease-in-out infinite; }
        .pet-cat.sit svg { animation: bob 1.6s ease-in-out infinite; opacity: 0.98; }
        .pet-cat.sleep svg { animation: none; opacity: 0.9; }
        .blue-eyes { filter: drop-shadow(0 0 4px #60A5FA) drop-shadow(0 0 7px #93C5FD); }
        @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
        @media (prefers-reduced-motion: reduce) {
          .pet-cat.follow svg, .pet-cat.sit svg { animation: none; }
        }
      `}</style>
    </div>
  );
}


