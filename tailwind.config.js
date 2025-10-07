/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lora: ["Lora", "serif"],
        anybody: ["Anybody", "sans-serif"],
        jost: ["Jost", "sans-serif"],
        americana: ["Americana", "serif"],
      },
      colors: {
        lightgray: "#D3D3D3",
        textlight: "#666666",
        btnbg: "#F1F1F1",
        bgdark: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
