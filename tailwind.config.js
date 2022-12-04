/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
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
        tertiary: colors.slate,
        gray: colors.slate,
      },
      scale: {
        flip: '-1',
      },
    },
  },
  plugins: [],
};
