import type { Config } from "tailwindcss";
import theme, { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: ({ theme }) => ({
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "hsl(var(--black))",
        purple: {
          light: "hsl(var(--purple-light))",
          dark: "hsl(var(--purple-dark))",
        },
        pink: "hsl(var(--pink))",
        yellow: "hsl(var(--yellow))",
        white: "hsl(var(--white))",
      }),
      fontFamily: {
        grotesk: ["var(--font-space-grotesk-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
