/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'col-no': '#ffffff',
      'col-one': '#0A2647',
      'col-two': '#144272',
      'col-three': '#205295',
      'col-four': '#2C74B3',
      'col-yes': '#020617',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}