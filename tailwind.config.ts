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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#F2BAC9",
          light: "#F5DCE5",
          dark: "#E8A4B8",
          foreground: "#5f2a3e",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#F2BAC9",
          "primary-content": "#5f2a3e",
          secondary: "#F5DCE5",
          "secondary-content": "#8B5A6B",
          accent: "#E8A4B8",
          neutral: "#3D4451",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        dark: {
          primary: "#F2BAC9",
          "primary-content": "#5f2a3e",
          secondary: "#E8A4B8",
          "secondary-content": "#F2BAC9",
          accent: "#D491A8",
          neutral: "#A9B1C3",
          "base-100": "#1f2937",
          "base-200": "#111827",
          "base-300": "#374151",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
};
export default config;
