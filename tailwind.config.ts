import type { Config } from "tailwindcss";

/**
 * Tailwind CSS Configuration for Yuvoo
 *
 * This configuration is set up to work alongside Bootstrap 5.3.3.
 * Tailwind will be used for new components, while Bootstrap remains for existing components.
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Yuvoo Brand Colors
        primary: {
          DEFAULT: "#00BBAE", // Turcoaz/Cyan
          light: "#EBFFFE", // theme-7 - light background variant
          dark: "#009B8F", // Darker variant for hover states
        },
        secondary: {
          DEFAULT: "#FF9B24", // Portocaliu
          light: "#FFECD6", // theme-8 - light background variant
          lighter: "#FFF6EB", // theme-6 - very light background variant
          dark: "#E6891F", // Darker variant for hover states
        },
        accent: {
          DEFAULT: "#7C81FF", // Violet/Albastru
          light: "#B8BBFF", // Light variant
          dark: "#5C61E6", // Darker variant
        },
        // Neutral Colors (from design system)
        neutral: {
          black: "#1B1B1B", // Heading text
          body: "#424242", // Body text
          white: "#FFFFFF", // Background
          grey: {
            1: "#E6E6E6", // Borders, dividers
            2: "#E9CFCF", // Alternative borders
          },
        },
        // Additional theme colors (for reference, can be used if needed)
        theme: {
          1: "#00BBAE", // Primary
          2: "#FF9B24", // Secondary
          3: "#FF577B", // Roz/Roșu (optional)
          4: "#FFF8EB", // Bej deschis
          5: "#FFA455", // Portocaliu deschis
          6: "#FFF6EB", // Bej foarte deschis
          7: "#EBFFFE", // Cyan foarte deschis
          8: "#FFECD6", // Portocaliu foarte deschis
          9: "#FF7C7C", // Roz deschis
          10: "#7C81FF", // Violet (Accent)
          11: "#00B9F1", // Albastru Cyan
        },
      },
      fontFamily: {
        // Fredoka is the primary font (already loaded via Next.js font optimization)
        sans: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
        body: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
        heading: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
      },
      fontSize: {
        // Typography scale from design system
        h1: "96px",
        h2: "64px",
        h3: "32px",
        h4: "23px",
        h5: "16px",
        h6: "16px",
        body: "18px",
      },
      lineHeight: {
        // Line heights from design system
        heading: "1.25",
        body: "30px", // 1.67 for 18px font
        relaxed: "1.7",
        loose: "2",
      },
      borderRadius: {
        // Border radius values from design system
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px", // Most common - .radius-24
        "2xl": "32px",
        "3xl": "50px",
        full: "50%", // Circles
      },
      boxShadow: {
        // Shadow patterns from design system
        card: "0px 16px 32px 0px rgba(0, 0, 0, 0.06)",
        menu: "0px 20px 30px rgba(3, 4, 28, 0.1)",
        modal: "0px 30px 70px 0px rgba(11, 6, 70, 0.08)",
        header: "0 10px 30px rgba(0, 0, 0, 0.12)",
        "header-alt": "0px 4px 10px rgba(3, 4, 28, 0.1)",
        login: "0px 30px 60px rgba(3, 4, 28, 0.1)",
        offcanvas: "-5px 0 20px -5px rgba(0, 0, 0, 0.5)",
      },
      spacing: {
        // Custom spacing values (Bootstrap spacing is also available)
        section: "110px", // pt-110, pb-70 pattern
        "section-lg": "120px",
      },
      animation: {
        // Animation durations from design system
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-in-up": "fadeInUp 0.3s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
  // Important: Prevent Tailwind from conflicting with Bootstrap
  // We use both frameworks - Tailwind for new components, Bootstrap for existing
  corePlugins: {
    // Keep all core plugins enabled
    preflight: false, // Disable Tailwind's base reset to avoid conflicts with Bootstrap
  },
};

export default config;
