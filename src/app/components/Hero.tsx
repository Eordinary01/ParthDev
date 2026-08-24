"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import InteractiveTerminal from "./InteractiveTerminal";
import { useTheme } from "../context/ThemeContext";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });
const Avatar3D = dynamic(() => import("./Avatar3D"), { ssr: false });

const handleDownloadResume = () => {
  const link = document.createElement("a");
  link.href = "/Parth Resume.pdf";
  link.download = "Parth_Manocha_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function Hero() {
  const { config } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const terminalWrapRef = useRef<HTMLDivElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const echoRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const failsafe = window.setTimeout(() => {
      if (curtainRef.current) curtainRef.current.style.display = "none";
      [terminalWrapRef.current, avatarWrapRef.current, echoRef.current, headingRef.current, subtitleRef.current, bioRef.current, socialsRef.current, ctasRef.current].forEach((el) => {
        if (el) {
          (el as HTMLElement).style.opacity = "1";
          (el as HTMLElement).style.visibility = "visible";
          (el as HTMLElement).style.transform = "none";
        }
      });
      if (ctasRef.current) Array.from(ctasRef.current.children).forEach((c) => ((c as HTMLElement).style.opacity = "1", (c as HTMLElement).style.visibility = "visible"));
      if (orb1Ref.current) orb1Ref.current.style.opacity = "0.2";
      if (orb2Ref.current) orb2Ref.current.style.opacity = "0.2";
    }, 1900);

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const run = async () => {
      try {
        const gsapMod = await import("gsap");
        const gsap = gsapMod.default;
        const stMod = await import("gsap/ScrollTrigger");
        const ScrollTrigger = (stMod as unknown as { ScrollTrigger?: unknown; default?: unknown }).ScrollTrigger ?? (stMod as unknown as { default: unknown }).default;
        if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger as never);
        if (cancelled) return;
        window.clearTimeout(failsafe);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          if (curtainRef.current) {
            gsap.set(curtainRef.current, { scaleY: 1, transformOrigin: "top", display: "block" });
            tl.to(curtainRef.current, { scaleY: 0, duration: 0.85, ease: "power4.inOut", onComplete: () => { if (curtainRef.current) curtainRef.current.style.display = "none"; } }, 0.12);
          }

          if (orb1Ref.current && orb2Ref.current) {
            tl.fromTo([orb1Ref.current, orb2Ref.current], { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 1.1, stagger: 0.16, ease: "power2.out" }, 0.45);
          }

          // Terminal from left, avatar from right + scale, text stagger
          if (terminalWrapRef.current) tl.fromTo(terminalWrapRef.current, { autoAlpha: 0, x: -42, y: 16, rotationY: -8 }, { autoAlpha: 1, x: 0, y: 0, rotationY: 0, duration: 0.95, ease: "power3.out" }, 0.52);
          if (avatarWrapRef.current) tl.fromTo(avatarWrapRef.current, { autoAlpha: 0, x: 42, scale: 0.92, rotationY: 8 }, { autoAlpha: 1, x: 0, scale: 1, rotationY: 0, duration: 1.0, ease: "power3.out" }, 0.62);
          if (echoRef.current) tl.fromTo(echoRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.92);
          if (headingRef.current) tl.fromTo(headingRef.current, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.66 }, 1.04);
          if (subtitleRef.current) tl.fromTo(subtitleRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.22);
          if (bioRef.current) tl.fromTo(bioRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.34);
          if (socialsRef.current) tl.fromTo(socialsRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.46);
          if (ctasRef.current) {
            const ch = ctasRef.current.children;
            if (ch.length) { gsap.set(ch, { autoAlpha: 0, y: 16 }); tl.to(ch, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.09, ease: "power2.out" }, 1.6); }
          }

          // Scroll parallax
          if (sectionRef.current) {
            if (orb1Ref.current) gsap.to(orb1Ref.current, { yPercent: 28, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.85 } });
            if (orb2Ref.current) gsap.to(orb2Ref.current, { yPercent: -22, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.85 } });
            if (terminalWrapRef.current) gsap.to(terminalWrapRef.current, { yPercent: -5, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.9 } });
            if (avatarWrapRef.current) gsap.to(avatarWrapRef.current, { yPercent: -9, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.75 } });
            const textWrap = sectionRef.current.querySelector("[data-hero-text]");
            if (textWrap) gsap.to(textWrap, { yPercent: -8, opacity: 0.42, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom 58%", scrub: 0.7 } });
          }
        }, sectionRef);
      } catch (err) {
        console.error("Hero GSAP failed", err);
        window.clearTimeout(failsafe);
        if (curtainRef.current) curtainRef.current.style.display = "none";
        [terminalWrapRef.current, avatarWrapRef.current, echoRef.current, headingRef.current, subtitleRef.current, bioRef.current, socialsRef.current, ctasRef.current].forEach((el) => {
          if (el) { (el as HTMLElement).style.opacity = "1"; (el as HTMLElement).style.visibility = "visible"; }
        });
      }
    };
    run();
    return () => { cancelled = true; window.clearTimeout(failsafe); ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center bg-canvas pt-16 overflow-hidden">
      <div ref={curtainRef} aria-hidden="true" className="absolute inset-0 z-20 pointer-events-none" style={{ background: "var(--bg-canvas)", transformOrigin: "top", display: "none" }} />
      <ParticleField accentColor={config.particleHex} />
      <div ref={orb1Ref} className="absolute top-20 left-10 w-72 h-72 opacity-20 rounded-full blur-3xl" style={{ background: config.accent }} />
      <div ref={orb2Ref} className="absolute bottom-20 right-10 w-96 h-96 opacity-20 rounded-full blur-3xl" style={{ background: config.accentSecondary }} />

      <div className="container-main w-full py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-8 items-center">
          {/* Left — terminal */}
          <div ref={terminalWrapRef} className="order-2 lg:order-1">
            <InteractiveTerminal />
          </div>

          {/* Right — intro + avatar side-by-side */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-5 items-center lg:items-start">
              {/* Intro — left */}
              <div data-hero-text className="flex-1 min-w-0 space-y-4 text-center lg:text-left">
                <div>
                  <p ref={echoRef} className="text-gh-secondary font-mono text-sm mb-2">$ echo &quot;Welcome to my terminal&quot;</p>
                  <h1 ref={headingRef} className="text-4xl sm:text-5xl font-bold text-gh-text leading-tight">
                    Hi, I&apos;m <span style={{ color: config.accent, textShadow: `0 0 20px ${config.accentGlow}` }}>Parth</span> Manocha
                  </h1>
                  <p ref={subtitleRef} className="mt-2 text-lg text-gh-secondary">Full Stack Developer</p>
                </div>
                <p ref={bioRef} className="text-gh-secondary leading-relaxed text-sm max-w-lg mx-auto lg:mx-0">
                  I build full-stack web applications with modern technologies. Passionate about clean code, intuitive interfaces, and solving complex problems.
                </p>
                <div ref={socialsRef} className="flex items-center justify-center lg:justify-start gap-5 text-sm font-mono">
                  <a href="https://github.com/Eordinary01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gh-secondary hover:text-gh-blue transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    Eordinary01
                  </a>
                  <a href="https://linkedin.com/in/parthmanocha01" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gh-secondary hover:text-gh-blue transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    parthmanocha01
                  </a>
                </div>
                <div ref={ctasRef} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <a href="https://github.com/Eordinary01" target="_blank" rel="noopener noreferrer" className="btn-primary hover:scale-105 active:scale-95 transition-all duration-200">View GitHub</a>
                  <button onClick={handleDownloadResume} className="btn-outline hover:scale-105 active:scale-95 transition-all duration-200">Download Resume</button>
                  <a href="mailto:parthmanocha66@gmail.com" className="btn-outline hover:scale-105 active:scale-95 transition-all duration-200">Contact</a>
                </div>
              </div>

              {/* Avatar — right of intro */}
              <div ref={avatarWrapRef} className="flex-shrink-0 relative order-first lg:order-last">
                <Avatar3D accent={config.accent} secondary={config.accentSecondary} />
                <div className="absolute -top-1 -right-1 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full border text-[11px] font-mono backdrop-blur-md" style={{ background: "rgba(22,27,34,0.82)", borderColor: config.borderGlow, color: config.accent }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: config.accent }} />
                  {config.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
