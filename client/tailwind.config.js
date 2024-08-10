/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': 'repeating-linear-gradient(0deg, rgb(17, 17, 17) 0px, rgb(17, 17, 17) 1px, transparent 1px, transparent 51px), repeating-linear-gradient(90deg, rgb(17, 17, 17) 0px, rgb(17, 17, 17) 1px, transparent 1px, transparent 51px), linear-gradient(90deg, hsl(49,0%,3%), hsl(49,0%,3%))',
      },
    },
  },
  plugins: [],
}