/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Includes all components in src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Dark blue
        secondary: "#9333EA", // Purple
        accent: "#F59E0B", // Orange
      },
    },
  },
  plugins: [],
};
