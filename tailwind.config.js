import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui(
    {themes: {
      light: {
        colors: {
          primary: {
            //DEFAULT: "#59a98d",
            DEFAULT: "#266561",
            foreground: "#ECF2EA",
          },
          secondary: {
            DEFAULT: "#b65d5a",
            //DEFAULT: "#926167",
            //DEFAULT: "#cda998",
            foreground: "#ECF2EA",
          },
          background: "#ECF2EA",
          foreground: "#262725",
          black: "#262725",
          white: "#f6fcfe",
          //default: "#fe907a",
        }
      }, 
      dark: {
        colors: {
          primary: "#59a98d",
          white: "#f6fcfe",
          black: "#262725",
          background: "#262725",
          foreground: "#ECF2EA",
          content1: "#2F312F",
          neutral: {
            50: "#262725",
            100: "#2F312F",
            200: "#3A3C3A",
            300: "#454745",
            400: "#505250",
            500: "#5B5D5B",
            
          }
        }
      }
    }
  })]
}
