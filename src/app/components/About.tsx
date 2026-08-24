"use client";
import React, { useEffect, useRef } from "react";
import { useTheme, type ThemeMode, themeConfigs } from "../context/ThemeContext";

type CardMode = ThemeMode;

const cards: { key: CardMode; title: string; desc: string; accent: string; icon: string }[] = [
  { key: "frontend", title: "Frontend", desc: "Building responsive, performant UIs with React, Next.js, and modern CSS", accent: "#58a6ff", icon: "◨" },
  { key: "backend", title: "Backend", desc: "Designing scalable APIs and services with Node.js, Express, and MongoDB", accent: "#3fb950", icon: "⬡" },
  { key: "fullstack", title: "Full Stack", desc: "End-to-end application development from database design to deployment", accent: "#bc8cff", icon: "⬢" },
];

export default function About() {
  const { theme, setTheme, isTransitioning } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Entrance stagger for cards — runs for all users (shorter for reduced-motion)
  useEffect(() => {
    if (!cardsRef.current) return;

    let ctx: { revert: () => void } | null = null;
    import("gsap").then(async ({ default: gsap }) => {
      const stMod = await import("gsap/ScrollTrigger");
      const ScrollTrigger = (stMod as unknown as { ScrollTrigger?: unknown; default?: unknown }).ScrollTrigger ?? (stMod as unknown as { default: unknown }).default;
      if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger as never);
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ctx = gsap.context(() => {
        const els = cardsRef.current?.querySelectorAll("[data-about-card]") ?? [];
        if (!els.length) return;
        gsap.fromTo(
          els,
          { autoAlpha: 0, y: isReduced ? 6 : 18, scale: isReduced ? 1 : 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: isReduced ? 0.3 : 0.55,
            stagger: isReduced ? 0.04 : 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }, sectionRef);
    });
    return () => ctx?.revert();
  }, []);

  // Pulse active card — runs for all
  useEffect(() => {
    if (!cardsRef.current) return;
    let tween: { kill: () => void } | null = null;
    import("gsap").then(({ default: gsap }) => {
      const active = cardsRef.current?.querySelector(`[data-theme="${theme}"]`) as HTMLElement | null;
      if (!active) return;
      tween = gsap.to(active, {
        boxShadow: `0 0 0 1px ${themeConfigs[theme].accent}, 0 8px 28px ${themeConfigs[theme].accentGlow}`,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => { tween?.kill(); };
  }, [theme]);

  return (
    <section ref={sectionRef} id="about" className="section-spacing bg-canvas">
      <div className="container-main">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-gh-green font-mono text-sm">$</span>
          <h2 className="text-3xl font-bold text-gh-text font-mono">cat about.md</h2>
          <span
            className="ml-auto text-xs font-mono px-2.5 py-1 rounded-full border"
            style={{
              color: themeConfigs[theme].accent,
              borderColor: themeConfigs[theme].borderGlow,
              background: "var(--bg-subtle)",
            }}
          >
            {themeConfigs[theme].label} mode
          </span>
        </div>
        <div className="h-px bg-border mb-12" />

        <div className="max-w-4xl">
          <div className="bg-default border border-border rounded-md overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-subtle border-b border-border">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gh-secondary" fill="currentColor">
                <path d="M14.25 15.75l-4.5-4.5 4.5-4.5 1.5 1.5L12.75 12l3 3.75-1.5 1.5z" />
              </svg>
              <span className="text-sm text-gh-secondary font-mono">About.md</span>
              <span className="ml-auto text-xs font-mono text-gh-muted hidden sm:inline">click a card to switch theme → projects & colors adapt</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <h1 className="text-4xl font-bold text-gh-text border-b border-border pb-4">Hey there!</h1>

              <div className="space-y-4 text-gh-secondary leading-relaxed">
                <p>
                  I&apos;m <strong className="text-gh-text">Parth Manocha</strong>, a Full Stack Developer based in{" "}
                  <strong className="text-gh-text">Jaipur, India</strong>. I&apos;m passionate about building web applications that make a
                  difference.
                </p>
                <p>
                  My journey into tech started with curiosity about how things work. That curiosity led me to programming, and I haven&apos;t looked
                  back since. I specialize in the <span style={{ color: themeConfigs[theme].accent }}>MERN stack</span> and{" "}
                  <span style={{ color: themeConfigs[theme].accent }}>Next.js</span>, with a strong focus on both frontend experiences and backend
                  architecture.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, and constantly
                  pushing myself to learn something new.
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h2 className="text-2xl font-bold text-gh-text mb-4">What I Do</h2>
                <p className="text-sm font-mono text-gh-muted mb-3">Select a focus — theme & projects update with an overlay transition</p>
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cards.map((item) => {
                    const isActive = theme === item.key;
                    return (
                      <button
                        key={item.title}
                        data-about-card
                        data-theme={item.key}
                        onClick={() => setTheme(item.key)}
                        disabled={isTransitioning}
                        aria-pressed={isActive}
                        className={`text-left p-4 border rounded-md transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                          isActive ? "bg-subtle scale-[1.02]" : "bg-transparent hover:bg-subtle/60 hover:scale-[1.01]"
                        } ${isTransitioning ? "pointer-events-none opacity-80" : ""}`}
                        style={{
                          borderColor: isActive ? themeConfigs[item.key].accent : "var(--border)",
                          boxShadow: isActive ? `0 0 0 1px ${themeConfigs[item.key].accent}, 0 4px 20px ${themeConfigs[item.key].accentGlow}` : "none",
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-mono font-bold" style={{ color: item.accent }}>
                            {item.title}
                          </h3>
                          <span
                            className="text-xs font-mono px-1.5 py-0.5 rounded border"
                            style={{
                              opacity: isActive ? 1 : 0,
                              borderColor: item.accent,
                              color: item.accent,
                              background: "rgba(0,0,0,0.25)",
                            }}
                          >
                            ● active
                          </span>
                        </div>
                        <p className="text-sm text-gh-secondary">{item.desc}</p>
                        {!isActive && (
                          <span className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, transparent 60%, ${item.accent}0d)` }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h2 className="text-2xl font-bold text-gh-text mb-4">Tech Stack</h2>
                <div data-scroll-stagger className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "Tailwind CSS",
                    "Git",
                    "REST APIs",
                    "React Native",
                    "PostgreSQL",
                    "Docker",
                    "Vercel",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm font-mono bg-subtle border border-border rounded-full text-gh-secondary hover:text-gh-text transition-all duration-200 cursor-default"
                      style={{ borderColor: undefined }}
                      onMouseEnter={(e) => ((e.currentTarget.style.borderColor = themeConfigs[theme].accent), (e.currentTarget.style.color = themeConfigs[theme].accent))}
                      onMouseLeave={(e) => ((e.currentTarget.style.borderColor = "var(--border)"), (e.currentTarget.style.color = "var(--text-secondary)"))}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
