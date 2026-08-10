"use client";
import React from "react";

interface FeaturedProject {
  name: string;
  tagline: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  tech: string[];
  gradient: string;
  icon: string;
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
  },
];

export default function FeaturedProjects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-gh-orange font-mono text-sm">#</span>
        <h3 className="text-xl font-bold text-gh-text font-mono">Featured Projects</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <div key={project.name} className="featured-card group">
            {/* Gradient header */}
            <div
              className={`h-32 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              <span className="text-5xl opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-300">
                {project.icon}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-default/80 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <h4 className="text-gh-text font-bold text-lg">{project.name}</h4>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <p className="text-gh-blue text-sm font-mono">{project.tagline}</p>
              <p className="text-gh-secondary text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono bg-subtle border border-border rounded text-gh-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-2">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs flex-1 text-center"
                  >
                    Live Demo
                  </a>
                ) : (
                  <span className="btn-primary text-xs flex-1 text-center opacity-50 cursor-not-allowed">
                    No Live Demo
                  </span>
                )}
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs flex-1 text-center"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
