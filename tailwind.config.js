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
        // Authentic clay court colors - muted and earthy
        'clay-court': '#8b5a3c',           // Main clay court brown (like Roland Garros)
        'clay-court-light': '#a67c5a',     // Lighter clay variation
        'clay-court-dark': '#6d4528',      // Darker clay variation
        'clay-dust': '#d4b896',           // Clay dust color for highlights
        'clay-dust-light': '#e6d4b8',     // Very light clay dust
        'clay-cream': '#f5f1e8',          // Warm cream for cards
        'clay-cream-dark': '#e8dcc6',     // Darker cream
        'clay-forest': '#3e5233',         // Deep forest green (tennis court surroundings)
        'clay-forest-light': '#4a5e3d',   // Lighter forest green
        'clay-charcoal': '#2c2c2c',       // Charcoal for text

        // Keep legacy
        'regal-yellow': '#fee715',
      },
    },
  },
  plugins: [],
}