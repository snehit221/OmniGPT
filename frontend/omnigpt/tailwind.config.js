/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./stylesheets/login.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primarybg': '#111827',
      }
    },
  },
  plugins: [],
}

