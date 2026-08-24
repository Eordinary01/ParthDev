"use client";
import React, { useEffect, useRef } from "react";
import { useTheme, type ThemeMode } from "../context/ThemeContext";

interface FeaturedProject {
  name: string;
  tagline: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  tech: string[];
  gradient: string;
  icon: string;
  themes: ThemeMode[];
}

const featuredProjects: FeaturedProject[] = [
  {
    name: "AttendEase",
    tagline: "Multi-level SaaS ERP platform",
    description:
      "A full-stack SaaS-based ERP platform with multi-level architecture for attendance tracking, employee management, analytics dashboard, and role-based access. Built with React, Node.js, and MongoDB for organizations of all sizes.",
    liveUrl: "https://attend-ease-f.vercel.app/",
    repoUrl: "https://github.com/Eordinary01/AttendEase",
    tech: ["React", "Node.js", "MongoDB", "SaaS", "ERP"],
    gradient: "from-green-500/20 to-emerald-500/20",
    icon: "📋",
    themes: ["fullstack", "frontend", "backend"],
  },
  {
    name: "JECRC Mail Sync",
    tagline: "Gmail priority filter → Telegram bot",
    description:
      "Real-time Gmail priority filtering for JECRC University students. Syncs inboxes, scores emails with a deterministic rule engine, and pushes high-priority placement and exam notices to Telegram and a live dashboard.",
    liveUrl: "https://telegram-bot-web-coral.vercel.app",
    repoUrl: "https://github.com/Eordinary01/Telegram_Bot",
    tech: ["TypeScript", "React", "Express", "PostgreSQL", "Redis", "Docker"],
    gradient: "from-blue-500/20 to-indigo-500/20",
    icon: "🤖",
    themes: ["backend", "fullstack"],
  },
  {
    name: "axon-gateway",
    tagline: "Config-driven distributed API gateway",
    description:
      "A lightweight distributed API gateway built on Fastify with JWT auth, Redis-backed sliding window rate limiting, circuit breaker protection, Prometheus observability, and a live admin dashboard — all from a single routes.json config.",
    liveUrl: "",
    repoUrl: "https://github.com/Eordinary01/axon-gateway",
    tech: ["Node.js", "Fastify", "Redis", "Prometheus", "Next.js", "Docker"],
    gradient: "from-purple-500/20 to-violet-500/20",
    icon: "⚡",
    themes: ["backend", "fullstack"],
  },
  {
    name: "Vehicle Rental System",
    tagline: "Full-stack rental marketplace",
    description:
      "A comprehensive vehicle rental management system with Next.js frontend, Node.js APIs, and MongoDB. Booking flows, admin dashboards, and real-time availability.",
    liveUrl: "https://vehicle-rental-frontend-1hw5.vercel.app/",
    repoUrl: "https://github.com/Eordinary01/vehicle-rental-system",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    icon: "🚗",
    themes: ["frontend", "fullstack"],
  },
  {
    name: "Trainer Sync",
    tagline: "Web + Mobile trainer platform",
    description:
      "Web/Android based Trainer Management Platform built with Next.js and React Native, syncing sessions, progress, and scheduling in real time.",
    liveUrl: "",
    repoUrl: "https://github.com/Eordinary01/Trainer_Sync_app",
    tech: ["Next.js", "React Native", "MongoDB"],
    gradient: "from-violet-500/20 to-purple-500/20",
    icon: "🏋️",
    themes: ["frontend", "fullstack"],
  },
  {
    name: "Expense Tracker",
    tagline: "Finance & budgeting toolkit",
    description:
      "Manage your expenses and maintain a financial backlog with charts, categories, and monthly insights. React + Node.js + MongoDB.",
    liveUrl: "https://expense-trackerf.vercel.app",
    repoUrl: "https://github.com/Eordinary01/Expense-Tracker",
    tech: ["React", "Node.js", "MongoDB", "Charts"],
    gradient: "from-amber-500/20 to-orange-500/20",
    icon: "💰",
    themes: ["frontend", "fullstack", "backend"],
  },
];

export default function FeaturedProjects({ activeTheme }: { activeTheme?: ThemeMode }) {
  const { config } = useTheme();
  const theme: ThemeMode = activeTheme ?? "fullstack";
  const gridRef = useRef<HTMLDivElement>(null);
  // Order featured so that projects matching active theme appear first, with subtle highlight
  const sorted = [...featuredProjects].sort((a, b) => {
    const aMatch = a.themes.includes(theme) ? 0 : 1;
    const bMatch = b.themes.includes(theme) ? 0 : 1;
    return aMatch - bMatch;
  });
  const filtered = sorted.slice(0, 3);

  // Animate on theme change
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-feat-card]");
    if (!cards.length) return;
    import("gsap").then(({ default: gsap }) => {
      gsap.fromTo(cards, { autoAlpha: 0, y: 16, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "power2.out", overwrite: true });
    });
  }, [theme]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm" style={{ color: config.accent }}>#</span>
        <h3 className="text-xl font-bold text-gh-text font-mono">Featured Projects</h3>
        <span className="ml-auto text-xs font-mono text-gh-muted hidden sm:inline">showing for {config.label}</span>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((project) => {
          const isHighlighted = project.themes.includes(theme);
          return (
            <div
              key={project.name}
              data-feat-card
              className="featured-card group"
              style={
                isHighlighted
                  ? { borderColor: config.borderGlow, boxShadow: `0 8px 24px ${config.accentGlow}` }
                  : { opacity: 0.88 }
              }
            >
              <div className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300">
                  {project.icon}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-default/80 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h4 className="text-gh-text font-bold text-lg">{project.name}</h4>
                </div>
                {isHighlighted && (
                  <span
                    className="absolute top-3 right-3 text-[10px] font-mono px-1.5 py-0.5 rounded border"
                    style={{ background: "rgba(0,0,0,0.45)", borderColor: config.accent, color: config.accent }}
                  >
                    ● {config.shortLabel}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-4">
                <p className="text-sm font-mono" style={{ color: config.accent }}>{project.tagline}</p>
                <p className="text-gh-secondary text-sm leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs font-mono bg-subtle border border-border rounded text-gh-secondary">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs flex-1 text-center">
                      Live Demo
                    </a>
                  ) : (
                    <span className="btn-primary text-xs flex-1 text-center opacity-50 cursor-not-allowed">No Live Demo</span>
                  )}
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs flex-1 text-center">
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
