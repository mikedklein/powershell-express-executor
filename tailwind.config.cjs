const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./views/**/*.{html,js,ejs}', './components/**/*.{html,js,ejs}'],
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        pink: colors.pink,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
