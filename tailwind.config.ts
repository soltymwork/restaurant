import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121315",
        foreground: "#f7f7f7",
        muted: "#a3a3a3",
        border: "#2a2a2a",
      },
      fontFamily: {
        serif: ['"Libre Baskerville"', "serif"],
        sans: ['"Hind Siliguri"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
