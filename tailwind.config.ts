import type { Config } from "tailwindcss";

export default {
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
        sidebarBackground: "#14212F",
        sidebarBackground2: "#1A2837",
        blue1: "#829CF7",
        blue1Hover: "#577BF6",
        green1: "#346012",
        green2: "#4D9019",
        green3: "#66C123",
        green2Hover: "#66C123",
        red1: "#671710",
        red2: "#C72C1D",
        red2Hover: "#FC634F",
        neutralTransparent: "#213243",
        neutralText: "#8A949F",
        button: "#213243",
        buttonHover: "#3F5162",
        buttonActive: "#2C396A",
        buttonActiveHover: "#374C9B",
      },
    },
  },
  plugins: [],
} satisfies Config;
