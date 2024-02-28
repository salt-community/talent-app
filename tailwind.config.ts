import { nextui } from "@nextui-org/react";
import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "Roboto",
        secondary: "Poppins",
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
      colors: {
        orange: "#ff7961",
        darkOrange: "#FF6348",
        black: "#353535",
        gray: "#f8f8f8",
        white: "#ffffff",
        pink: "#f35c7e",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
