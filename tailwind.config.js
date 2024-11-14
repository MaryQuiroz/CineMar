/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cinema-red': {
          DEFAULT: '#E50914',
          50: '#FDE8E9',
          100: '#FAC5C7',
          200: '#F69295',
          300: '#F15F63',
          400: '#ED2C32',
          500: '#E50914',
          600: '#B30710',
          700: '#81050B',
          800: '#4F0307',
          900: '#1D0102',
        },
        'cinema-dark': {
          DEFAULT: '#1A1A1A',
          50: '#404040',
          100: '#363636',
          200: '#2C2C2C',
          300: '#222222',
          400: '#1A1A1A',
          500: '#141414',
          600: '#0A0A0A',
          700: '#000000',
        },
        'cinema-gray': {
          DEFAULT: '#2A2A2A',
          50: '#8C8C8C',
          100: '#7A7A7A',
          200: '#686868',
          300: '#565656',
          400: '#444444',
          500: '#2A2A2A',
          600: '#1E1E1E',
          700: '#121212',
          800: '#060606',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      minHeight: {
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      maxHeight: {
        '128': '32rem',
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
    },
  },
  plugins: [
    
  ],
}
