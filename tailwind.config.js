/** @type {import('tailwindcss').Config} */
export default {
  prefix: "sg-",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#ffffff",
        primary: "#0055a4",
        accent: "#ef4135",
        success: "#22c55e",
        error: "#ef4135",
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
