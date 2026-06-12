"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  className?: string;
  /** How often glitch triggers in ms (average). Default 4000. */
  interval?: number;
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  interval = 4000,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleChange);

    if (mq.matches) return () => mq.removeEventListener("change", handleChange);

    const schedule = () => {
      const delay = 2000 + Math.random() * interval;
      timerRef.current = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200 + Math.random() * 300);
        schedule();
      }, delay);
    };
    schedule();

    return () => {
      clearTimeout(timerRef.current);
      mq.removeEventListener("change", handleChange);
    };
  }, [interval]);

  if (reducedMotion) {
    return (
      <Tag className={className} data-glitch-text="">
        {children}
      </Tag>
    );
  }

  const baseClasses = isGlitching ? "relative inline-block" : "relative inline-block";

  return (
    <Tag className={`${baseClasses} ${className}`} data-glitch-text="">
      {children}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-accent-cyan"
            style={{
              clipPath: "inset(20% 0 55% 0)",
              transform: "translate(-2px, 0)",
              animation: "none",
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-accent-pink"
            style={{
              clipPath: "inset(55% 0 20% 0)",
              transform: "translate(2px, 0)",
              animation: "none",
            }}
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </Tag>
  );
}
