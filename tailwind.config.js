/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F5F2",
        gold: "#C6A75E",
        brown: "#3E2C2C",
      },
    },
  },
  plugins: [],
}