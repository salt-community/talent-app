import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
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
        black: "#353535",
        gray: "#f8f8f8",
        white: "#ffffff",
        pink: "#f35c7e",
        hoverGray: "#353535",
      },
    },
  },
  plugins: [],
} satisfies Config;
