import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
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
          primary: "#fe907a",
          background: "#ECF2EA"
        }
      }, 
      dark: {
        colors: {
          primary: "#fe907a",
          white: "#ECF2EA",
          background: "#262725"
        }
      }
    }
  })]
}
