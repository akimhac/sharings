/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#C1121F',
        secondary: '#1F4B99',
        neutral: '#1F1F1F',
        gold: '#D4AF37',
        base: '#0F0F10',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #0F0F10 0%, #1F1F1F 100%)',
      },
    },
  },
  plugins: [],
};
