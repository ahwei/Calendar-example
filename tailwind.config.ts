/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#009393',
          50: '#e6f7f7',
          100: '#ccefef',
          200: '#99dfdf',
          300: '#66cfcf',
          400: '#33bfbf',
          500: '#009393',
          600: '#007676',
          700: '#005858',
          800: '#003b3b',
          900: '#001d1d',
        },
      },
    },
  },
  plugins: [],
};
