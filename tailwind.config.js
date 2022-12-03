const colors = require('tailwindcss/colors');
const path = require('path');

module.exports = {
  darkMode: 'class',
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],

  theme: {
    extend: {
      colors: {
        primary: colors.purple,
        secondary: colors.sky,
        gray: colors.slate,
      },
    },
  },
  plugins: [],
};
