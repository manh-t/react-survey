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
        'x-small': ['13px', '18px'],
        small: ['15px', '20px'],
        regular: ['17px', '22px'],
        large: ['28px', '34px'],
        'x-large': ['34px', '41px'],
      },
      backgroundImage: {
        'sign-in': "url('assets/images/illustrations/background-sign-in.png')",
      },
      letterSpacing: {
        'survey-tighest': '-1px',
        'survey-tighter': '-0.5px',
        'survey-tight': '-0.41px',
        'survey-normal': '-0.24px',
        'survey-wide': '-0.08px',
        'survey-wider': '0.38px',
      },
    },
  },
  plugins: [],
};
