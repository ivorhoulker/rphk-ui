const { mergeConfig } = require('vite');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-essentials'],
  features: {
    storyStoreV7: true,
  },
  // framework: {
  //   name: '@storybook/react-vite',
  //   options: {},
  // },
  staticDirs: ['../public'],
  // core: {
  //   builder: 'webpack5',
  // },
};
