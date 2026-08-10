import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0d1117',
        default: '#161b22',
        subtle: '#1c2128',
        inset: '#010409',
        border: '#30363d',
        'border-muted': '#21262d',
        'gh-text': '#e6edf3',
        'gh-secondary': '#8b949e',
        'gh-muted': '#484f58',
        'gh-blue': '#58a6ff',
        'gh-green': '#3fb950',
        'gh-purple': '#bc8cff',
        'gh-red': '#f85149',
        'gh-orange': '#d29922',
        'gh-cyan': '#39d2c0',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
      },
      maxWidth: {
        'main': '1280px',
      },
    },
  },
  plugins: [],
};
export default config;
