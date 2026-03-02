/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#0E1320',
        'electric-lavender': '#8B7DFF',
        'cool-mist': '#ECEAF4',
        'slate-gray': '#2C2F3A',
        primary: '#8B7DFF',
        background: '#0E1320',
        surface: '#2C2F3A',
        text: '#ECEAF4',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      transitionTimingFunction: {
        'power3-out': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      }
    },
  },
  plugins: [],
}
