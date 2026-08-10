"use client";
import React from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillHeatmapProps {
  skills: Skill[];
}

export default function SkillHeatmap({ skills }: SkillHeatmapProps) {
  const getHeatColor = (level: number) => {
    if (level >= 90) return "#39d353";
    if (level >= 80) return "#26a641";
    if (level >= 70) return "#006d32";
    if (level >= 60) return "#0e4429";
    return "#161b22";
  };

  return (
    <div className="bg-default border border-border rounded-md p-6">
      <h3 className="text-sm text-gh-secondary font-mono uppercase tracking-wider mb-4">
        Skill Proficiency Heatmap
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-3 p-3 rounded-md border border-border hover:border-gh-muted transition-colors group"
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold font-mono"
              style={{
                backgroundColor: getHeatColor(skill.level),
                color: skill.level >= 70 ? "#fff" : "#8b949e",
              }}
            >
              {skill.level}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gh-text font-mono truncate group-hover:text-gh-blue transition-colors">
                {skill.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex-1 h-1 bg-canvas rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${skill.level}%`,
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
