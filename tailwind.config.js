/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Tahoma"],
      },
      colors: {
        "gender-accent": "var(--gender-accent)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "banner-0": "url('/banners/0.jpeg')",
        "banner-1": "url('/banners/1.jpeg')",
        "banner-2": "url('/banners/2.jpeg')",
        "banner-3": "url('/banners/3.jpeg')",
        "banner-4": "url('/banners/4.jpeg')",
        "banner-5": "url('/banners/5.jpeg')",
        "banner-6": "url('/banners/6.jpeg')",
        "banner-7": "url('/banners/7.jpeg')",
        "banner-8": "url('/banners/8.jpeg')",
        "banner-9": "url('/banners/9.jpeg')",
      },
      minHeight: {
        navless: "calc(100vh - 67px)",
        window: "calc(100vh - 67px - 49px)",
      },
      maxHeight: {
        navless: "calc(100vh - 67px)",
        window: "calc(100vh - 67px - 49px)",
      },
      height: {
        header: "67px",
        footer: "49px",
        messaging: "calc(100vh - 97px)",
        "messaging-navless": "calc(100vh - 67px - 97px)",
        navless: "calc(100vh - 67px)",
        window: "calc(100vh - 67px - 49px)",
      },
      boxShadow: {
        outter: "0 1px 3px 0px rgba(0, 0, 0, 0.6)",
        "t-outter": "0px -8px 6px -4px rgba(0, 0, 0, 0.1)",
        "outter-xl": "0 1px 3px 1px rgba(0, 0, 0, 0.6)",
        "outter-soft": "0px 1px 8px 0px rgba(0, 0, 0, 0.3)",
        "inner-xl": "inset 0 1px 3px 0px rgba(0, 0, 0, 0.6)",
      },
      textShadow: {
        xs: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        sm: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.4)",
        lg: "4px 4px 8px rgba(0, 0, 0, 0.5)",
        xl: "4px 4px 16px rgba(0, 0, 0, 0.6)",
      },
      gridTemplateColumns: {
        32: "repeat(32, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
