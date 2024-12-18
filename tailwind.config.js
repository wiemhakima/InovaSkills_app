/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    
    extend: {
      colors:{
        "fidnessColor":"#0C8C9C"
      }
    },
  },
  plugins: [
    require('preline/plugin'),  
  ],
}

