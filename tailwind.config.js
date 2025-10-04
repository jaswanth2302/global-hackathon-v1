/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm': {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fbd9c1',
          300: '#f8c19e',
          400: '#f4a574',
          500: '#f08a4a',
          600: '#e16b2a',
          700: '#b85520',
          800: '#944420',
          900: '#783a1d',
        },
        'sage': {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a3b2a3',
          400: '#7f8f7f',
          500: '#647064',
          600: '#4f5a4f',
          700: '#404940',
          800: '#353c35',
          900: '#2d322d',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
