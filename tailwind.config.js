export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F4B400",
        secondary: "#111827",
        accent: "#FFD54F",
        bg: {
          light: "#FAFAFA",
          dark: "#0B1220",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1E293B",
        },
      },
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(17, 24, 39, 0.08)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.35)",
        glow: "0 0 30px rgba(244, 180, 0, 0.35)",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 4s ease infinite",
      },
    },
  },
  plugins: [],
}
