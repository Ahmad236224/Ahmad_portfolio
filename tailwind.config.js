/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EDEBE7",
        paper2: "#E5E2DC",
        ink: "#101010",
        graphite: "#6E6B66",
        ghost: "#D8D4CD",
        signal: "#C0432E",
      },
      fontFamily: {
        display: ["TEXAR", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Lakes", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
