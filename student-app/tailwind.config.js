/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#0A0A0C', // The absolute background
        'electric-lavender': '#8B7DFF', // The primary interactive accent
        'cool-mist': '#E2E8F0', // The primary text color
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'], // For all Headers and Buttons
        mono: ['JetBrains Mono', 'monospace'], // For all tiny labels, timestamps, and metadata
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
