/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1600px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "black-backdrop": "rgba(0,0,0,0.7)",
        "white-backdrop": "rgba(255,255,255,0.8)",
      },
      height: {
        100: "28rem",
        128: "48rem",
      },
      width: {
        "95%": "90%",
      },
    },
  },
  plugins: [],
};
