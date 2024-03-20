/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.jsx"],
  theme: {
    extend: {},
    screens: {
      "max-custom_sm": { max: "750px" },
      "max-custom_xsm": { max: "540px" },
    },
  },
  plugins: [],
};
