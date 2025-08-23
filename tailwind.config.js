/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        primary: "#4a7fa7",
        accent: "#e5a3b6",
      },
    },
  },
  plugins: [],
};
