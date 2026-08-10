"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchGitHubRepos, fetchGitHubProfile, fetchContributions, getTotalStars, getTopLanguages } from "../../lib/github";
import type { GitHubRepo, GitHubProfile, ContributionDay } from "../../lib/github";
import ContributionGraph from "./ContributionGraph";
import GitHubStats from "./GitHubStats";
import FeaturedProjects from "./FeaturedProjects";

const fallbackRepos: GitHubRepo[] = [
  {
    id: 1, name: "AttendEase", description: "Multi-level SaaS-based ERP platform with attendance tracking and employee management",
    html_url: "https://github.com/Eordinary01/AttendEase", homepage: "https://attend-ease-f.vercel.app/",
    stargazers_count: 0, forks_count: 0, language: "JavaScript", topics: ["react", "nodejs", "mongodb"],
    created_at: "2024-05-03", updated_at: "2026-06-11", fork: false,
  },
  {
    id: 2, name: "Telegram_Bot", description: "Real-time Gmail priority filtering for JECRC University students with Telegram bot",
    html_url: "https://github.com/Eordinary01/Telegram_Bot", homepage: "https://telegram-bot-web-coral.vercel.app",
    stargazers_count: 0, forks_count: 0, language: "TypeScript", topics: ["telegram", "bot", "typescript"],
    created_at: "2026-07-25", updated_at: "2026-08-09", fork: false,
  },
  {
    id: 3, name: "axon-gateway", description: "Config-driven distributed API gateway with JWT auth, rate limiting, and circuit breaker",
    html_url: "https://github.com/Eordinary01/axon-gateway", homepage: "",
    stargazers_count: 0, forks_count: 0, language: "JavaScript", topics: ["api-gateway", "proxy", "docker"],
    created_at: "2026-07-25", updated_at: "2026-07-26", fork: false,
  },
  {
    id: 4, name: "vehicle-rental-system", description: "A comprehensive vehicle rental management system",
    html_url: "https://github.com/Eordinary01/vehicle-rental-system", homepage: "https://vehicle-rental-frontend-1hw5.vercel.app/",
    stargazers_count: 0, forks_count: 0, language: "TypeScript", topics: ["nextjs", "nodejs", "mongodb"],
    created_at: "2024-01-01", updated_at: "2024-06-01", fork: false,
  },
  {
    id: 5, name: "Trainer_Sync_app", description: "Web/Android based Trainer Management Platform",
    html_url: "https://github.com/Eordinary01/Trainer_Sync_app", homepage: "",
    stargazers_count: 0, forks_count: 0, language: "TypeScript", topics: ["nextjs", "react-native", "mongodb"],
    created_at: "2026-07-25", updated_at: "2026-07-25", fork: false,
  },
  {
    id: 6, name: "Expense-Tracker", description: "Manage your expenses and maintain a financial backlog",
    html_url: "https://github.com/Eordinary01/Expense-Tracker", homepage: "https://expense-trackerf.vercel.app",
    stargazers_count: 0, forks_count: 0, language: "JavaScript", topics: ["react", "nodejs", "mongodb"],
    created_at: "2024-03-07", updated_at: "2026-06-23", fork: false,
  },
  {
    id: 7, name: "Exam_automation_Agent", description: "Automated exam management agent",
    html_url: "https://github.com/Eordinary01/Exam_automation_Agent", homepage: "",
    stargazers_count: 0, forks_count: 0, language: "JavaScript", topics: ["automation", "agent"],
    created_at: "2026-07-04", updated_at: "2026-07-04", fork: false,
  },
];

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>(fallbackRepos);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [reposData, profileData, contribData] = await Promise.all([
          fetchGitHubRepos(),
          fetchGitHubProfile(),
          fetchContributions(),
        ]);
        setRepos(reposData.length > 0 ? reposData : fallbackRepos);
        setProfile(profileData);
        setContributions(contribData.contributions);
        setTotalContributions(contribData.total);
      } catch {
        // Use fallback data
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const topLanguages = getTopLanguages(repos);
  const totalStars = getTotalStars(repos);

  const categories = ["All", ...Array.from(new Set(repos.map((r) => {
    if (r.topics?.includes("nextjs") || r.topics?.includes("react")) return "Frontend";
    if (r.topics?.includes("nodejs") || r.topics?.includes("mongodb")) return "Full Stack";
    return "Other";
  })))];

  const filteredRepos = filter === "All"
    ? repos
    : repos.filter((r) => {
        if (filter === "Frontend") return r.topics?.includes("nextjs") || r.topics?.includes("react");
        if (filter === "Full Stack") return r.topics?.includes("nodejs") || r.topics?.includes("mongodb");
        return true;
      });

  const langColorMap: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };

  return (
    <section id="projects" className="section-spacing bg-canvas relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gh-green opacity-10 rounded-full blur-3xl animate-float-slow" />

      <div className="container-main relative z-10">
        <div className="flex items-center gap-3 mb-8 hero-slide-up">
          <span className="text-gh-green font-mono text-sm">$</span>
          <h2 className="text-3xl font-bold text-gh-text font-mono">ls ~/projects</h2>
        </div>
        <div className="h-px bg-border mb-12 hero-slide-up" style={{ animationDelay: "0.1s" }} />

        <div className="mb-16 hero-slide-up" style={{ animationDelay: "0.2s" }}>
          <FeaturedProjects />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 hero-slide-up" style={{ animationDelay: "0.3s" }}>
            {profile && (
              <div className="bg-default border border-border rounded-md p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.login}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full border-2 border-border"
                    unoptimized
                  />
                  <div>
                    <h3 className="text-gh-text font-bold">{profile.name || profile.login}</h3>
                    <p className="text-sm text-gh-secondary font-mono">@{profile.login}</p>
                  </div>
                </div>
                {profile.bio && (
                  <p className="text-sm text-gh-secondary mb-4">{profile.bio}</p>
                )}
                <div className="flex items-center gap-2 text-sm text-gh-secondary">
                  <span className="w-3 h-3 rounded-full bg-gh-green inline-block" />
                  <span>Available for opportunities</span>
                </div>
              </div>
            )}

            <div className="hero-slide-up" style={{ animationDelay: "0.4s" }}>
              <GitHubStats
                publicRepos={profile?.public_repos || repos.length}
                followers={profile?.followers || 0}
                following={profile?.following || 0}
                totalStars={totalStars}
                topLanguages={topLanguages}
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8 hero-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-default border border-border rounded-md p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <h3 className="text-sm text-gh-secondary font-mono uppercase tracking-wider mb-4">
                Contribution Activity
              </h3>
              {!loading && contributions.length > 0 ? (
                <ContributionGraph
                  contributions={contributions}
                  totalContributions={totalContributions}
                />
              ) : (
                <div className="h-32 flex items-center justify-center text-gh-muted font-mono text-sm">
                  {loading ? "Loading contributions..." : "No contribution data available"}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 border-b border-border pb-0 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 text-sm font-mono transition-colors whitespace-nowrap hover:scale-105 active:scale-95 duration-200 ${
                    filter === cat
                      ? "tab-active text-gh-text"
                      : "text-gh-secondary hover:text-gh-text"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.homepage || repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card block group hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(88,166,255,0.2)] transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-gh-secondary flex-shrink-0" fill="currentColor">
                          <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 3h10v2H7V8zm0 4h10v2H7v-2z" />
                        </svg>
                        <h3 className="text-gh-blue font-mono font-semibold group-hover:underline truncate">
                          {repo.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gh-secondary mb-3 line-clamp-2">
                        {repo.description || "No description provided"}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gh-muted">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="lang-dot"
                              style={{ backgroundColor: langColorMap[repo.language] || "#8b949e" }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0z" />
                          </svg>
                          {repo.forks_count}
                        </span>
                        {repo.topics?.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-xs font-mono bg-subtle border border-border rounded-full text-gh-blue"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      {repo.homepage && (
                        <span className="btn-outline text-xs">Live Demo</span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-default border border-border rounded-md p-8 text-center hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gh-text mb-2 font-mono">
                Want to see more?
              </h3>
              <p className="text-gh-secondary mb-4">
                Check out my GitHub profile for all repositories and contributions.
              </p>
              <a
                href="https://github.com/Eordinary01?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block hover:scale-105 active:scale-95 transition-all duration-200"
              >
                View All Repositories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
