/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0f1115",
        primary: "#2563eb",
        accent: "#ef4444",
        surface: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.12)",
 codex/add-background-carousel-and-styling-components

        ink: "#eaeef6",
 main
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.18)" },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
