/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#1f1f1f',
        primary: '#4a7fa7',
        accent: '#e5a3b6',
        success: '#22c55e',
        error: '#ef4444',
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
