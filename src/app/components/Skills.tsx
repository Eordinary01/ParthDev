"use client";
import React, { useState, useEffect } from "react";
import { fetchGitHubRepos, getTopLanguages } from "../../lib/github";
import type { GitHubRepo } from "../../lib/github";
import SkillHeatmap from "./SkillHeatmap";
import { useTheme } from "../context/ThemeContext";

const skillData = [
  { name: "JavaScript", level: 95, color: "#f1e05a" },
  { name: "React/Next.js", level: 90, color: "#61dafb" },
  { name: "TypeScript", level: 85, color: "#3178c6" },
  { name: "Node.js", level: 87, color: "#339933" },
  { name: "Tailwind CSS", level: 92, color: "#38bdf8" },
  { name: "MongoDB", level: 83, color: "#47A248" },
  { name: "Express.js", level: 85, color: "#ffffff" },
  { name: "REST APIs", level: 89, color: "#ff6c37" },
  { name: "Git", level: 88, color: "#f05032" },
  { name: "React Native", level: 70, color: "#61dafb" },
  { name: "Docker", level: 65, color: "#2496ED" },
  { name: "PostgreSQL", level: 72, color: "#4169E1" },
];

const fallbackRepos: GitHubRepo[] = [
  { id: 1, name: "vehicle-rental", description: "", html_url: "", homepage: null, stargazers_count: 2, forks_count: 1, language: "TypeScript", topics: [], created_at: "", updated_at: "", fork: false },
  { id: 2, name: "qnect", description: "", html_url: "", homepage: null, stargazers_count: 3, forks_count: 1, language: "TypeScript", topics: [], created_at: "", updated_at: "", fork: false },
  { id: 3, name: "trainersync", description: "", html_url: "", homepage: null, stargazers_count: 1, forks_count: 0, language: "TypeScript", topics: [], created_at: "", updated_at: "", fork: false },
  { id: 4, name: "attendease", description: "", html_url: "", homepage: null, stargazers_count: 1, forks_count: 0, language: "TypeScript", topics: [], created_at: "", updated_at: "", fork: false },
  { id: 5, name: "assignment-manager", description: "", html_url: "", homepage: null, stargazers_count: 1, forks_count: 0, language: "JavaScript", topics: [], created_at: "", updated_at: "", fork: false },
  { id: 6, name: "bms", description: "", html_url: "", homepage: null, stargazers_count: 0, forks_count: 0, language: "JavaScript", topics: [], created_at: "", updated_at: "", fork: false },
];

export default function Skills() {
  const { config } = useTheme();
  const [topLanguages, setTopLanguages] = useState<{ name: string; color: string; percentage: number }[]>([]);

  useEffect(() => {
    async function fetchLangs() {
      try {
        const repos = await fetchGitHubRepos();
        if (repos.length > 0) setTopLanguages(getTopLanguages(repos));
      } catch {
        setTopLanguages(getTopLanguages(fallbackRepos));
      }
    }
    fetchLangs();
  }, []);

  return (
    <section id="skills" className="section-spacing bg-canvas relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl animate-float-slow" style={{ background: config.accent }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl animate-float-slow-reverse" style={{ background: config.accentSecondary }} />
      </div>

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-8 hero-slide-up">
          <span className="text-gh-green font-mono text-sm">$</span>
          <h2 className="text-3xl font-bold text-gh-text font-mono">cat skills.json</h2>
        </div>
        <div className="h-px bg-border mb-12 hero-slide-up" style={{ animationDelay: "0.1s" }} />

        <div className="max-w-4xl space-y-6">
          {topLanguages.length > 0 && (
            <div className="bg-default border border-border rounded-md p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-shadow duration-300 hero-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-sm text-gh-secondary font-mono uppercase tracking-wider mb-4">
                Most Used Languages
              </h3>
              <div className="flex h-3 rounded-full overflow-hidden mb-4">
                {topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    className="transition-all duration-700 hover:opacity-80 hover:scale-y-150"
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {topLanguages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-1.5">
                    <span
                      className="lang-dot animate-pulse"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-sm text-gh-secondary font-mono">{lang.name}</span>
                    <span className="text-xs text-gh-muted font-mono">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hero-slide-up" style={{ animationDelay: "0.3s" }}>
            <SkillHeatmap skills={skillData} />
          </div>
        </div>
      </div>
    </section>
  );
}
