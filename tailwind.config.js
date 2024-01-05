/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'main-background': '#010409',
        'main-text': '#e6edf3'
      }
    },
  },
  plugins: [],
}

