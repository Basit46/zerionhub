/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        pry: {
          50: "#E9E9FF",
          100: "#D0D0FF",
          200: "#A9A9FF",
          300: "#8282FF",
          400: "#5A5AFA",
          500: "#4242E6",
          600: "#3232DC", // main brand
          700: "#2424B5",
          800: "#18188A",
          900: "#0E0E5C",
        },
        aqua: {
          50: "#E6FFFB",
          100: "#B3FFF3",
          200: "#80FFE8",
          300: "#4DFFD9",
          400: "#1AEFD1",
          500: "#00D3C4", // main accent
          600: "#00A8A4",
          700: "#007F84",
          800: "#005D61",
          900: "#003C3F",
        },
        gray: {
          50: "#F9F9F9",
          100: "#E6E6E6",
          200: "#CFCFCF",
          300: "#A3A3A3",
          400: "#5A5A5A",
          500: "#333333",
          600: "#1C1C1C", // main background
          700: "#181818",
          800: "#121212",
          900: "#0C0C0C",
        },
        text: {
          50: "#FFFFFF",
          100: "#F5F5F5",
          200: "#E4E4E4", // main text
          300: "#CFCFCF",
          400: "#A1A1A1",
          500: "#7D7D7D",
          600: "#6B7280",
          700: "#4B5563",
          800: "#374151",
          900: "#1F2937",
        },
        accent: {
          blue: {
            100: "#DBEAFE",
            200: "#93C5FD",
            300: "#60A5FA",
            400: "#3B82F6",
            500: "#2563EB",
            600: "#1D4ED8",
          },
          cyan: {
            400: "#06B6D4",
          },
          purple: {
            400: "#7C3AED",
          },
        },
        success: {
          400: "#10B981",
        },
        warning: {
          400: "#F59E0B",
        },
        error: {
          400: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--poppins)", "sans-serif"],
      },
      screens: {
        vsm: "450px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
