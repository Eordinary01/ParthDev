"use client";
import React, { useEffect, useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Optional GSAP variant per section */
  variant?: "fade" | "tilt" | "scale" | "clip";
}

export default function SectionReveal({ children, className = "", delay = 0, variant = "fade" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for no-GSAP: IO fade
    let io: IntersectionObserver | null = null;
    let gsapCtx: { revert: () => void } | null = null;
    let cancelled = false;

    const initGsap = async () => {
      try {
        const gsapMod = await import("gsap");
        const gsap = gsapMod.default;
        const stMod = await import("gsap/ScrollTrigger");
        const ScrollTrigger = (stMod as unknown as { ScrollTrigger?: unknown; default?: unknown }).ScrollTrigger ?? (stMod as unknown as { default: unknown }).default;
        if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger as never);
        if (cancelled || !el) return;

        // Remove IO fallback styles
        el.style.opacity = "";
        el.style.transform = "";
        el.style.transition = "";

        const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const duration = isReduced ? 0.35 : 0.7;

        // Per-variant initial states
        if (variant === "tilt") {
          gsap.set(el, { autoAlpha: 0, y: 32, rotationX: 6, transformOrigin: "center top" });
        } else if (variant === "scale") {
          gsap.set(el, { autoAlpha: 0, y: 18, scale: 0.97 });
        } else if (variant === "clip") {
          gsap.set(el, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });
        } else {
          gsap.set(el, { autoAlpha: 0, y: 28 });
        }

        gsapCtx = gsap.context(() => {
          if (variant === "clip") {
            gsap.to(el, {
              autoAlpha: 1,
              clipPath: "inset(0 0% 0 0)",
              duration,
              delay: delay / 1000,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            });
          } else if (variant === "tilt") {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              rotationX: 0,
              duration,
              delay: delay / 1000,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            });
            // subtle scrub parallax after reveal
            gsap.to(el, {
              yPercent: -2,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          } else {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration,
              delay: delay / 1000,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            });
          }

          // Inner stagger for child groups (cards, pills, bars)
          const innerStagger = el.querySelectorAll<HTMLElement>("[data-scroll-stagger]");
          innerStagger.forEach((group) => {
            const items = group.children;
            if (!items.length) return;
            gsap.fromTo(
              items as unknown as HTMLElement[],
              { autoAlpha: 0, y: 16 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.07,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: group as HTMLElement,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });
        }, el);
      } catch {
        // fallback to IO already set below
      }
    };

    // Immediate IO fallback while GSAP loads — ensures content not invisible if GSAP fails
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If GSAP hasn't taken over yet, fade via IO
          if (!gsapCtx) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
          io?.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    initGsap();

    return () => {
      cancelled = true;
      io?.disconnect();
      gsapCtx?.revert();
    };
  }, [delay, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
