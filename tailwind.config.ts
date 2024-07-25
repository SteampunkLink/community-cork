import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-emerald-200",
    "border-emerald-600",
    "bg-emerald-400",
    "bg-emerald-300",
    "bg-rose-200",
    "border-rose-600",
    "bg-rose-400",
    "bg-rose-300",
    "bg-sky-200",
    "border-sky-600",
    "bg-sky-400",
    "bg-sky-300",
    "bg-violet-200",
    "border-violet-600",
    "bg-violet-400",
    "bg-violet-300",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
