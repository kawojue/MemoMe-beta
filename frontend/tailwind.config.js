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
        "clr-0": "rgb(255, 255, 255)",
        "clr-1": "rgb(0, 111, 201)",
        "clr-2": "rgb(50, 49, 48)",
        "clr-3": "rgb(96, 94, 92)",
        "clr-4": "rgb(25, 126, 208)",
        "clr-5": "rgb(242, 242, 242)",
        "clr-6": "rgb(0, 100, 181)",
        "clr-7": "rgb(232, 232, 232)",
        "clr-8": "rgb(32, 31, 30)",
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
