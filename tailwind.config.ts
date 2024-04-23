/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,ts,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#fff8e5",
          "100": "#fff1cc",
          "200": "#ffe499",
          "300": "#ffd666",
          "400": "#ffc933",
          "500": "#ffbb00",
          "600": "#cc9600",
          "700": "#997000",
          "800": "#664b00",
          "900": "#332500",
          "950": "#1a1300",
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
