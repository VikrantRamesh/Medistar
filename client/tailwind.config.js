/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './src/**/*.{html,jsx, js}',
    "./node_modules/tw-elements/dist/js/**/*.js"], 
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("tw-elements/dist/plugin.cjs")
  ],
}

