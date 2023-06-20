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
      },
      fontSize: {
        small: ['15px', '20px'],
        regular: ['17px', '22px'],
      },
      backgroundImage: {
        'sign-in': "url('assets/images/illustrations/background-sign-in.png')",
      },
    },
  },
  plugins: [],
};
