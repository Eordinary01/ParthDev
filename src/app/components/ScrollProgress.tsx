"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ScrollProgress() {
  const { config } = useTheme();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    import("gsap").then(async ({ default: gsap }) => {
      const stMod = await import("gsap/ScrollTrigger");
      const ScrollTrigger = (stMod as unknown as { ScrollTrigger?: unknown; default?: unknown }).ScrollTrigger ?? (stMod as unknown as { default: unknown }).default;
      if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger as never);
      if (!barRef.current) return;
      ctx = gsap.context(() => {
        gsap.to(barRef.current!, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.35,
          },
        });
        gsap.set(barRef.current!, { scaleX: 0, transformOrigin: "left center" });
      });
    });
    return () => ctx?.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none">
      <div ref={barRef} className="h-full w-full" style={{ background: config.accent, transformOrigin: "left center", transform: "scaleX(0)" }} />
    </div>
  );
}
