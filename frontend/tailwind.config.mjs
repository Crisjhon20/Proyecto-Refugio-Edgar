/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        'teal-950': '#243447',
        'teal-900': '#344b63',
        'teal-800': '#5b3e62',
        'teal-100': '#d8ebe2',
        'yellow-400': '#f47762',
        'yellow-300': '#ffd166',
        'yellow-100': '#fff0d0',
        coral: '#f47762',
        butter: '#ffd166',
        mint: '#b8e0d2',
        lavender: '#e6d8f2',
        plum: '#5b3e62',
        night: '#243447',
        cream: '#fff8ef',
        ink: '#24313b',
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
};
