"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type ThemeMode = "default" | "warm";

interface RippleState {
  color: string;
  originX: number;
  originY: number;
  maxRadius: number;
}

interface ThemeContextValue {
  theme: ThemeMode;
  isFlipped: boolean;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("default");
  const [isFlipped, setIsFlipped] = useState(false);
  const [ripple, setRipple] = useState<RippleState | null>(null);
  const rippleOverlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const nextTheme: ThemeMode = theme === "default" ? "warm" : "default";
      const nextFlipped = !isFlipped;
      const rippleColor = nextTheme === "warm" ? "#feb55c" : "#ffffff";

      // Default origin to center of viewport if not passed
      const x = origin ? origin.x : window.innerWidth / 2;
      const y = origin ? origin.y : window.innerHeight / 2;

      // Compute maximum radius to cover the entire screen from (x, y)
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // Flip avatar immediately for instant response
      setIsFlipped(nextFlipped);

      // Setup and trigger the radial ripple animation
      setRipple({
        color: rippleColor,
        originX: x,
        originY: y,
        maxRadius,
      });

      // Animate via Web Animations API for 120fps hardware acceleration
      requestAnimationFrame(() => {
        const el = rippleOverlayRef.current;
        if (!el) {
          setTheme(nextTheme);
          isAnimatingRef.current = false;
          return;
        }

        const animation = el.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 },
            { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`, opacity: 1 },
          ],
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          }
        );

        // Apply theme to document at 350ms so the background is ready under the ripple
        const themeTimer = setTimeout(() => {
          setTheme(nextTheme);
        }, 350);

        animation.onfinish = () => {
          clearTimeout(themeTimer);
          setTheme(nextTheme);
          // Quick fade out of the ripple layer now that page background matches
          const fadeAnim = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 180,
            fill: "forwards",
          });
          fadeAnim.onfinish = () => {
            setRipple(null);
            isAnimatingRef.current = false;
          };
        };
      });
    },
    [theme, isFlipped]
  );

  return (
    <ThemeContext.Provider value={{ theme, isFlipped, toggleTheme }}>
      <div
        data-theme={theme}
        className="w-full min-h-screen transition-colors duration-500 selection:bg-[#0055ff] selection:text-white"
      >
        {children}

        {/* Full-viewport Hardware-Accelerated Ripple Overlay */}
        {ripple && (
          <div
            ref={rippleOverlayRef}
            className="fixed inset-0 pointer-events-none z-50 will-change-[clip-path]"
            style={{
              backgroundColor: ripple.color,
              clipPath: `circle(0px at ${ripple.originX}px ${ripple.originY}px)`,
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("usePortfolioTheme must be used within a ThemeProvider");
  }
  return context;
}
