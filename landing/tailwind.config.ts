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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
