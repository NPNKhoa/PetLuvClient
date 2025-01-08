/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f79400',
          dark: '#d87a00',
        },
        secondary: {
          light: '#0e1826',
          dark: '#09111b',
        },
        tertiary: {
          light: '#cfcfcf',
          dark: '#aeaeae',
        },
      },
    },
  },
  plugins: [],
};
