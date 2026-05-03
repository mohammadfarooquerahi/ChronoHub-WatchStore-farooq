/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#f59e0b",
      },
    },
  },
  plugins: [],
};
