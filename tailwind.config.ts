import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        orange: "#ff7961",
        black: "#353535",
        gray: "#f8f8f8",
        white: "#ffffff",
        pink: "#f35c7e",
      },
    },
  },
  plugins: [],
} satisfies Config;
