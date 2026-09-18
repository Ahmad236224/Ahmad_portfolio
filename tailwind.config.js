/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2F1ED",
        paper2: "#E8E6E1",
        paper3: "#DEDBD4",
        ink: "#161512",
        graphite: "#5F5C56",
        ghost: "#D5D2CB",
        accent: "#2F4BA0",
        accent2: "#9A4526",
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
