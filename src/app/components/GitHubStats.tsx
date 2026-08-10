"use client";
import React from "react";

interface GitHubStatsProps {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars?: number;
  topLanguages?: { name: string; color: string; percentage: number }[];
}

export default function GitHubStats({
  publicRepos,
  followers,
  following,
  totalStars = 0,
  topLanguages = [],
}: GitHubStatsProps) {
  const stats = [
    { label: "Repositories", value: publicRepos, icon: "📦" },
    { label: "Followers", value: followers, icon: "👥" },
    { label: "Following", value: following, icon: "👤" },
    { label: "Total Stars", value: totalStars, icon: "⭐" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-default border border-border rounded-md p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{stat.icon}</span>
              <span className="text-xs text-gh-secondary font-mono uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-gh-text font-mono">
              {stat.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Language bar */}
      {topLanguages.length > 0 && (
        <div className="bg-default border border-border rounded-md p-4">
          <h4 className="text-xs text-gh-secondary font-mono uppercase tracking-wider mb-3">
            Most Used Languages
          </h4>
          <div className="flex h-2 rounded-full overflow-hidden mb-3">
            {topLanguages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                className="transition-all duration-500"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {topLanguages.map((lang) => (
              <div key={lang.name} className="flex items-center gap-1.5">
                <span
                  className="lang-dot"
                  style={{ backgroundColor: lang.color }}
                />
                <span className="text-xs text-gh-secondary font-mono">
                  {lang.name}
                </span>
                <span className="text-xs text-gh-muted font-mono">
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
