/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "kurva-kot": "url('/src/assets/kurva-kot.png')",
        background: "url('/src/assets/background.png')",
      },
    },
  },
  plugins: [],
};
