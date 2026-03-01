import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kymatics: {
          bg: "#00052B",
          surface: "#0a0a3a",
          "surface-elevated": "#12124a",
          mint: "#4BFFCA",
          purple: "#8024E7",
          lavender: "#B187FF",
          cream: "#E8E6F0",
          muted: "#9B97B8"
        }
      },
      fontFamily: {
        sans: ["DM Sans", "var(--font-sans)", "system-ui", "sans-serif"],
        display: ["DM Sans", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "glow-mint":
          "0 0 24px -4px rgba(75, 255, 202, 0.25), 0 0 0 1px rgba(75, 255, 202, 0.15)",
        "glow-purple":
          "0 0 24px -4px rgba(128, 36, 231, 0.3), 0 0 0 1px rgba(128, 36, 231, 0.2)",
        "glow-lavender":
          "0 0 24px -4px rgba(177, 135, 255, 0.25), 0 0 0 1px rgba(177, 135, 255, 0.15)"
      }
    }
  },
  plugins: []
} satisfies Config;
