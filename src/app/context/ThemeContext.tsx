"use client";
import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type ThemeMode = "frontend" | "backend" | "fullstack";

export interface ThemeConfig {
  accent: string;
  accentGlow: string;
  accentSecondary: string;
  gradientFrom: string;
  gradientTo: string;
  orbPrimary: string;
  orbSecondary: string;
  particleColor: number;
  particleHex: string;
  selectionBg: string;
  borderGlow: string;
  label: string;
  shortLabel: string;
}

export const themeConfigs: Record<ThemeMode, ThemeConfig> = {
  frontend: {
    accent: "#58a6ff",
    accentGlow: "rgba(88,166,255,0.4)",
    accentSecondary: "#79c0ff",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-cyan-500/20",
    orbPrimary: "bg-gh-blue",
    orbSecondary: "bg-gh-cyan",
    particleColor: 0x58a6ff,
    particleHex: "#58a6ff",
    selectionBg: "rgba(88,166,255,0.3)",
    borderGlow: "rgba(88,166,255,0.35)",
    label: "Frontend",
    shortLabel: "FE",
  },
  backend: {
    accent: "#3fb950",
    accentGlow: "rgba(63,185,80,0.4)",
    accentSecondary: "#56d364",
    gradientFrom: "from-green-500/20",
    gradientTo: "to-emerald-500/20",
    orbPrimary: "bg-gh-green",
    orbSecondary: "bg-emerald-500",
    particleColor: 0x3fb950,
    particleHex: "#3fb950",
    selectionBg: "rgba(63,185,80,0.3)",
    borderGlow: "rgba(63,185,80,0.35)",
    label: "Backend",
    shortLabel: "BE",
  },
  fullstack: {
    accent: "#bc8cff",
    accentGlow: "rgba(188,140,255,0.4)",
    accentSecondary: "#d2a8ff",
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-violet-500/20",
    orbPrimary: "bg-gh-purple",
    orbSecondary: "bg-fuchsia-500",
    particleColor: 0xbc8cff,
    particleHex: "#bc8cff",
    selectionBg: "rgba(188,140,255,0.3)",
    borderGlow: "rgba(188,140,255,0.35)",
    label: "Full Stack",
    shortLabel: "FS",
  },
};

interface ThemeContextValue {
  theme: ThemeMode;
  config: ThemeConfig;
  isTransitioning: boolean;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("fullstack");
  const [pendingTheme, setPendingTheme] = useState<ThemeMode>("fullstack");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const subLabelRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<HTMLDivElement>(null);
  const transitioningRef = useRef(false);

  const setTheme = useCallback((mode: ThemeMode) => {
    if (mode === theme || transitioningRef.current) return;
    transitioningRef.current = true;
    setPendingTheme(mode);
    setIsTransitioning(true);

    const cfg = themeConfigs[mode];
    const root = document.documentElement;
    root.style.setProperty("--theme-accent", cfg.accent);
    root.style.setProperty("--theme-accent-glow", cfg.accentGlow);
    root.style.setProperty("--theme-accent-secondary", cfg.accentSecondary);
    root.style.setProperty("--theme-border-glow", cfg.borderGlow);
    root.style.setProperty("--theme-selection-bg", cfg.selectionBg);
    root.style.setProperty("--theme-particle-hex", cfg.particleHex);

    import("gsap").then(({ default: gsap }) => {
      const overlay = overlayRef.current;
      const label = labelRef.current;
      const sub = subLabelRef.current;
      const grid = gridRef.current;
      const bars = barsRef.current;
      const iris = irisRef.current;
      if (!overlay || !label) {
        setThemeState(mode);
        setIsTransitioning(false);
        transitioningRef.current = false;
        return;
      }
      label.textContent = cfg.label;
      overlay.style.display = "block";

      const done = () => {
        setThemeState(mode);
        // subtle content jiggle under the wipe
        const staggerEls = document.querySelectorAll<HTMLElement>("[data-repo-card], [data-feat-card], [data-about-card]");
        if (staggerEls.length) gsap.to(staggerEls, { y: -6, duration: 0.18, stagger: 0.02, ease: "power2.in", yoyo: true, repeat: 1, overwrite: true });
      };

      const finish = () => {
        overlay.style.display = "none";
        if (grid) grid.style.display = "none";
        if (bars) bars.style.display = "none";
        if (iris) { iris.style.display = "none"; iris.style.clipPath = "circle(0% at 50% 50%)"; }
        setIsTransitioning(false);
        transitioningRef.current = false;
        try { (gsap as unknown as { ScrollTrigger?: { refresh: () => void } }).ScrollTrigger?.refresh(); } catch {}
      };

      // ── PER-STACK UNIQUE TRANSITIONS ──
      if (mode === "frontend") {
        // FRONTEND — Pixel grid dissolve (blue): 6×8 tiles scale from center, not a simple slide
        if (grid) {
          grid.style.display = "grid";
          grid.style.background = cfg.accent;
          const tiles = Array.from(grid.children) as HTMLElement[];
          gsap.set(tiles, { scale: 0, opacity: 0, transformOrigin: "center" });
          gsap.set(label, { autoAlpha: 0, y: 30, letterSpacing: "0.02em" });
          gsap.set(sub!, { autoAlpha: 0, y: 12 });
          const tl = gsap.timeline({ onComplete: done });
          tl.to(tiles, { scale: 1, opacity: 1, duration: 0.42, stagger: { grid: [6, 8], from: "center", amount: 0.32 }, ease: "power3.out" }, 0)
            .to(label, { autoAlpha: 1, y: 0, letterSpacing: "0.08em", duration: 0.45, ease: "back.out(1.15)" }, 0.28)
            .to(sub!, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.38)
            .add(() => {}, 0.85); // hold full cover
          // Out: tiles shrink from center outward
          tl.to(tiles, { scale: 0, opacity: 0, duration: 0.38, stagger: { grid: [6, 8], from: "center", amount: 0.22 }, ease: "power3.in" }, 1.05)
            .to([label, sub!], { autoAlpha: 0, y: -16, duration: 0.2, ease: "power2.in" }, 1.0)
            .add(finish, 1.48);
        } else {
          done(); setTimeout(finish, 600);
        }
      } else if (mode === "backend") {
        // BACKEND — Code-rain / venetian blinds: 7 horizontal bars with monospace code texture, stagger from left
        if (bars) {
          bars.style.display = "flex";
          const barEls = Array.from(bars.children) as HTMLElement[];
          barEls.forEach((b) => (b.style.background = cfg.accent));
          gsap.set(barEls, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(label, { autoAlpha: 0, x: -18, skewX: -6 });
          gsap.set(sub!, { autoAlpha: 0 });
          gsap.set(bars, { opacity: 1 });
          const tl = gsap.timeline({ onComplete: done });
          tl.to(barEls, { scaleX: 1, duration: 0.52, stagger: 0.055, ease: "expo.out" }, 0)
            .to(label, { autoAlpha: 1, x: 0, skewX: 0, duration: 0.5, ease: "power3.out" }, 0.38)
            .to(sub!, { autoAlpha: 0.9, duration: 0.3 }, 0.52);
          // Hold then blinds close to right
          tl.to(barEls, { scaleX: 0, transformOrigin: "right center", duration: 0.48, stagger: 0.04, ease: "expo.in" }, 1.02)
            .to([label, sub!], { autoAlpha: 0, duration: 0.18 }, 0.98)
            .add(finish, 1.5);
          // Subtle code flicker on bars while covered
          gsap.to(barEls, { opacity: 0.96, duration: 0.08, yoyo: true, repeat: 3, stagger: 0.02, ease: "steps(1)" });
        } else { done(); setTimeout(finish, 600); }
      } else {
        // FULLSTACK — Iris radial / morph blob: circle expands from center, morphs, then shrinks
        if (iris) {
          iris.style.display = "block";
          iris.style.background = `radial-gradient(ellipse 90% 90% at 50% 50%, ${cfg.accent} 0%, ${cfg.accentSecondary} 55%, ${cfg.accent} 100%)`;
          iris.style.clipPath = "circle(0% at 50% 50%)";
          gsap.set(label, { autoAlpha: 0, scale: 0.72, rotation: -2 });
          gsap.set(sub!, { autoAlpha: 0, scale: 0.9 });
          gsap.set(iris, { scale: 1, rotation: 0 });
          const tl = gsap.timeline({ onComplete: done });
          tl.to(iris, { clipPath: "circle(72% at 50% 50%)", duration: 0.68, ease: "power3.inOut" }, 0)
            .to(iris, { scale: 1.04, rotation: 1.5, duration: 0.28, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.18)
            .to(label, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.52, ease: "back.out(1.2)" }, 0.32)
            .to(sub!, { autoAlpha: 0.92, scale: 1, duration: 0.32, ease: "power2.out" }, 0.48);
          // Out: iris contracts to center with elastic
          tl.to(iris, { clipPath: "circle(0% at 50% 50%)", duration: 0.62, ease: "power3.inOut" }, 1.08)
            .to([label, sub!], { autoAlpha: 0, scale: 0.88, duration: 0.22, ease: "power2.in" }, 1.02)
            .add(finish, 1.72);
        } else { done(); setTimeout(finish, 600); }
      }
    });
  }, [theme]);

  const config = themeConfigs[theme];

  return (
    <ThemeContext.Provider value={{ theme, config, isTransitioning, setTheme }}>
      {/* Overlay — three layers, only one visible per transition */}
      <div ref={overlayRef} className="theme-overlay" style={{ display: "none" }} aria-hidden="true">
        {/* Frontend grid */}
        <div ref={gridRef} className="overlay-grid" style={{ display: "none" }} aria-hidden="true">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="overlay-grid-tile" />
          ))}
        </div>
        {/* Backend bars */}
        <div ref={barsRef} className="overlay-bars" style={{ display: "none" }} aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="overlay-bar">
              <span className="overlay-bar-code">{`// ${["const server = express()","await db.connect()","app.use(auth)","redis.get(cache)","SELECT * FROM users","docker compose up","pm2 start api"][i % 7]}`}</span>
            </div>
          ))}
        </div>
        {/* Fullstack iris */}
        <div ref={irisRef} className="overlay-iris" style={{ display: "none", clipPath: "circle(0% at 50% 50%)" }} aria-hidden="true" />

        {/* Label — always on top */}
        <div className="theme-overlay-inner" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
          <span ref={labelRef} className="theme-overlay-label">{themeConfigs[pendingTheme].label}</span>
          <span ref={subLabelRef} className="theme-overlay-sublabel">view</span>
        </div>
      </div>
      <div style={{ display: "contents" }}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
