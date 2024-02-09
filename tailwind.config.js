/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#0C21C1",
        darkBlue: "#000842",
      },
      fontFamily: {
        pops: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
