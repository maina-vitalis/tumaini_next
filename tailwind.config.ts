import type { Config } from "tailwindcss";

// Tailwind v4 primarily uses CSS @theme (see globals.css).
// We keep a minimal config for content globs (if needed by tooling) and custom brand colors + animations.
// The old JS plugin using internal flattenColorPalette was removed as it is incompatible with Tailwind 4.

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Brand colors and a few legacy mappings kept for compatibility in case JS config is consulted.
      // Most are now defined in globals.css @theme block.
      colors: {
        greenPrimary: "#31B44C",
        secondary_orange: "#EE6D3D",
        deepBlue: "#1E40AF",
        textColor: "#8A8A8A",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [
    // tailwindcss-animate still provides useful animation utilities / data-state support used by shadcn components
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
  ],
};

export default config;
