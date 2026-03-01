import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kymatics: {
          mint: "#C8F7C1",
          purple: "#E1A2FC",
          primary: "#5D4DC2",
          muted: "#CAC4B9",
          cream: "#F2EFE9",
          rose: "#CCBABD",
          dark: "#252525"
        }
      },
      fontFamily: {
        sans: ["Outfit", "var(--font-sans)", "system-ui", "sans-serif"],
        display: ["Sora", "Outfit", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(225,162,252,0.12), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(200,247,193,0.08), transparent), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(225,162,252,0.1), transparent)"
      },
      boxShadow: {
        "glow-mint": "0 0 24px -4px rgba(200, 247, 193, 0.25), 0 0 0 1px rgba(200, 247, 193, 0.15)",
        "glow-purple": "0 0 24px -4px rgba(225, 162, 252, 0.3), 0 0 0 1px rgba(225, 162, 252, 0.2)",
        "glow-mint-lg": "0 0 40px -8px rgba(200, 247, 193, 0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
