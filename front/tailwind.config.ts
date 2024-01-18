import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
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
      },
      boxShadow: {
        rme_shadow: "-10px 0px 10px 2px rgba(34, 60, 80, 0.2)"
      },
      animation: {
        overlay_motion_anim:
          "overlay_motion .25s cubic-bezier(0.33, 1, 0.68, 1) 0s 1 normal none running;"
      },
      keyframes: {
        overlay_motion: {
          "0%": { transform: "translateX(100%)" }
        }
      },
      translate: {
        center_card_avatar: "translate(-50%, -50%);"
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
