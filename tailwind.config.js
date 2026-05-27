/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#1a4d2e',
        'sage-green': '#8b9a7a',
        'gold': '#d4af37',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
