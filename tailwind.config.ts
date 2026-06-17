import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter-synapse)", "system-ui", "sans-serif"],
        space: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono-synapse)", "Menlo", "monospace"],
      },
      colors: {
        primary: "#C9A227",
        background: "#021524",
        surface: "#0e2131",
        "on-surface": "#d1e5fb",
        outline: "#99907b",
        "surface-container": "#0e2131",
      },
    },
  },
  plugins: [],
};

export default config;
