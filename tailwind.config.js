/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f79400',
          light: '#ffb347',
          dark: '#d87a00',
        },
        secondary: {
          light: '#5b708d',
          DEFAULT: '#0e1826',
        },
        tertiary: {
          light: '#efefef',
          dark: '#aeaeae',
        },
      },
      fontFamily: {
        cute: ['"iciel-crocante"', 'cursive'],
      },
    },
  },
  plugins: [],
};
