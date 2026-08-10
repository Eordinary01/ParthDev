"use client";
import React from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionGraphProps {
  contributions: ContributionDay[];
  totalContributions: number;
  username?: string;
}

export default function ContributionGraph({ contributions, totalContributions, username = "Eordinary01" }: ContributionGraphProps) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getMonthLabels = () => {
    const labels: { label: string; index: number }[] = [];
    let lastMonth = -1;
    contributions.forEach((day, i) => {
      const month = new Date(day.date).getMonth();
      if (month !== lastMonth && labels.length < 12) {
        labels.push({ label: months[month], index: i });
        lastMonth = month;
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day, i) => {
    const dayOfWeek = new Date(day.date).getDay();
    if (i === 0 && dayOfWeek !== 0) {
      for (let j = 0; j < dayOfWeek; j++) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
    }
    currentWeek.push(day);
    if (dayOfWeek === 6 || i === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block">
        {/* Month labels */}
        <div className="flex mb-2 ml-8">
          {monthLabels.map((m, i) => (
            <span
              key={i}
              className="text-xs text-gh-muted font-mono"
              style={{ marginLeft: i === 0 ? `${m.index * 13}px` : `${(m.index - monthLabels[i - 1].index) * 13 - 30}px` }}
            >
              {m.label}
            </span>
          ))}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col mr-2 justify-between py-0">
            {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
              <span key={i} className="text-xs text-gh-muted font-mono h-[13px] leading-[11px]">
                {day}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`contrib-cell contrib-level-${day.level}`}
                    title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end mt-3 gap-1">
          <span className="text-xs text-gh-muted font-mono mr-1">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className={`contrib-cell contrib-level-${level}`} />
          ))}
          <span className="text-xs text-gh-muted font-mono ml-1">More</span>
        </div>

        {/* Total */}
        <p className="text-sm text-gh-secondary mt-2 text-right font-mono">
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
      </div>
    </div>
  );
}
