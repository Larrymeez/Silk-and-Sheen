/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandbg: "#1A1A1A",  // your page background
        gold: "#D4AF37",      // your button color
      },
    },
  },
  plugins: [],
};