/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        neuzeit: 'Neuzeit S LT Std',
      },
      colors: {
        'black-chinese': '#15151A',
        'black-raisin': '#252525',
      },
      fontSize: {
        xSmall: ['13px', '18px'],
        small: ['15px', '20px'],
        regular: ['17px', '22px'],
      },
    },
  },
  plugins: [],
};
