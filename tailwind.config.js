/** @type {import('tailwindcss').Config} */
export default {
  prefix: "sg-",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#1f1f1f",
        primary: "#4a7fa7",
        accent: "#e5a3b6",
        success: "#22c55e",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.15)" },
    },
  },
  plugins: [],
};
