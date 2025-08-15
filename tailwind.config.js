/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0f1115",
        surface: "rgba(255,255,255,.04)",
        primary: "#1956d8",
        accent: "#ff6b6b",
        ink: "#eaeef6",
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.18)" },
      fontFamily: {
        sans: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
