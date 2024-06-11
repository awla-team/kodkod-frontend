/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
      },
    },
  },
  plugins: [],
  prefix: 'tw-',
  important: true,
  corePlugins: {
    preflight: false,
  },
};
