const GITHUB_USERNAME = "Eordinary01";
const GITHUB_API = "https://api.github.com";

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
  blog: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  "Node.js": "#339933",
  React: "#61dafb",
  "Next.js": "#ffffff",
  MongoDB: "#47A248",
  Express: "#ffffff",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Shell: "#89e051",
};

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub profile");
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20&type=owner`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  return res.json();
}

export async function fetchContributions(): Promise<{
  contributions: ContributionDay[];
  total: number;
}> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("Failed to fetch contributions");
    const data = await res.json();
    return {
      contributions: data.contributions || [],
      total: data.total || 0,
    };
  } catch {
    return { contributions: [], total: 0 };
  }
}

export function getLanguageColor(lang: string): string {
  return languageColors[lang] || "#8b949e";
}

export function getTopLanguages(repos: GitHubRepo[]): { name: string; color: string; percentage: number }[] {
  const langCount: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(langCount).reduce((a, b) => a + b, 0);
  return Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      color: getLanguageColor(name),
      percentage: Math.round((count / total) * 100),
    }));
}

export function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}
