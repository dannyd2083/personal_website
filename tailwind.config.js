/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        AbrilFatface: ["Abril Fatface", "cursive"],
        Lato: ["Lato","sans-serif"],
      },
      colors: {
        'regal-yellow': '#fee715',
      },
    },
  },
  plugins: [],
}
