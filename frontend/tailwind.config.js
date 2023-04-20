/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "clr-0": "rgb(51, 51, 51)",
        "clr-1": "rgb(100, 92, 255)",
        "clr-2": "rgb(100, 92, 255, 0.5)",
        "clr-3": "rgb(255, 248, 240)"
      },
      fontFamily: {
        kaushan: ["Kaushan Script", 'cursive'],
        poppins: ["Poppins", 'san-serif']
      },
      screens: {
        sm: "600px",
        md: "800px",
        lg: "1200px"
      }
    },
  },
  plugins: [],
}
