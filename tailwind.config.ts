import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F3EAD9",
        "parchment-deep": "#EADFC8",
        ink: "#33101D",
        "ink-soft": "#5A2A38",
        stain: "#8B2E1F",
        "stain-deep": "#6E2115",
        marigold: "#C97D1F",
        "marigold-soft": "#E8B25C",
        card: "#FFFDF8",
        line: "rgba(51, 16, 29, 0.14)",
        "line-strong": "rgba(51, 16, 29, 0.28)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      borderRadius: {
        sharp: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
