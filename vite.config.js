// tailwind.config.js
export default {
  corePlugins: {
    preflight: false, // disables Tailwind reset so MUI styles survive
  },
  content: ["./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
