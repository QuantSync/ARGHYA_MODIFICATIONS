/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#E6C280',
          500: '#D4AF37',
          600: '#AA820A',
        },
        ruby: {
          800: '#800020',
          900: '#4A0404',
        },
        burgundy: {
          950: '#1F0407',
          900: '#2E080C',
          800: '#3D0C11',
          700: '#521217',
          600: '#731C24',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FAF4EC',
          200: '#F5EBE0',
          300: '#EBE0D3',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shineBorderSpin: {
          to: { '--border-angle': '360deg' },
        },
        cardBorderSpin: {
          to: { '--card-border-angle': '360deg' },
        },
      },
      animation: {
        shineBorderSpin: 'shineBorderSpin 3s linear infinite',
        cardBorderSpin: 'cardBorderSpin 2.8s linear infinite',
      },
    },
  },
  plugins: [],
}
