/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#ffffff",                // fond clair
        ink: "#111827",                 // texte principal
        inkMuted: "#374151",            // texte secondaire
        line: "#E5E7EB",                // séparateurs
        surface: "#ffffff",             // cartes blanches
        surfaceAlt: "#F9FAFB",          // fond alterné
        brand: {
          primary: "#FF385C",           // Airbnb-like
          primaryDark: "#E11D48",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.08)",
        card: "0 8px 24px rgba(0,0,0,.06)",
        cta: "0 12px 28px rgba(255,56,92,.25)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      fontFamily: {
        sans: ['Inter','system-ui','ui-sans-serif','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans'],
        serif: ['Playfair Display','ui-serif','Georgia','Cambria','Times New Roman','Times'],
      },
    },
  },
  plugins: [],
}
