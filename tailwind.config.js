const colors = require('tailwindcss/colors');

module.exports = {
  content: ['src/**/*.{ts,tsx}'],

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
