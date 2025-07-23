/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bio-primary': '#1e40af',
        'bio-secondary': '#3b82f6',
        'bio-accent': '#10b981',
        'bio-dark': '#1f2937',
        'bio-light': '#f8fafc',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
} 