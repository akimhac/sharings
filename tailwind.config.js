/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4a7fa7',
        accent: '#e5a3b6',
        base: '#1f1f1f',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #0F0F10 0%, #1F1F1F 100%)',
      },
    },
  },
  plugins: [],
};
