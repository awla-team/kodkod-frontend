/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#ecf2ff',
          '100': '#dde6ff',
          '200': '#c2d1ff',
          '300': '#9cb1ff',
          '400': '#7586ff',
          '500': '#646cff',
          '600': '#3b36f5',
          '700': '#322ad8',
          '800': '#2925ae',
          '900': '#262689',
          '950': '#181650',
      },
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
