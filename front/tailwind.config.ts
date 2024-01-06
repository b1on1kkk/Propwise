import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      borderWidth: {
        1: "1px"
      },
      width: {
        88: "88px"
      },
      padding: {
        10: "10px"
      },
      inset: {
        "248px": "248px",
        "165px": "165px",
        "84px": "84px",
        minus: "-2px",
        "41px": "41px",
        "80px": "80px"
      },
      backdropBlur: {
        xs: "2px"
      },
      maxWidth: {
        screen: "100vw"
      }
    }
  },
  plugins: []
};
export default config;
