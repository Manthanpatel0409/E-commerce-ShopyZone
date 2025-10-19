/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We define our custom color palette here
      colors: {
        'primary': '#5c6ac4',        // A nice, modern indigo
        'primary-hover': '#4a559f',  // A darker shade for hover
        'secondary': '#f4a261',     // An orange accent
        'text-dark': '#242424',     // A soft, dark gray (not pure black)
        'text-light': '#5a677d',    // A lighter gray for subtext
        'background-light': '#f8f9fa', // A very light gray for page backgrounds
      }
    },
  },
  plugins: [],
}