/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe0d0',
          300: '#decbb0',
          400: '#d0b08a',
          500: '#c49a6c',
          600: '#b8845a',
          700: '#996d4a',
          800: '#7d5a40',
          900: '#664a36',
        },
        gold: {
          50: '#fdf9f0',
          100: '#f9f0d8',
          200: '#f2e0b0',
          300: '#e8cc7a',
          400: '#ddb84f',
          500: '#c9a227',
          600: '#b08a1f',
          700: '#8f6f1c',
          800: '#765a1e',
          900: '#634a1c',
        },
        cream: '#faf8f5',
        charcoal: '#2d2d2d',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
