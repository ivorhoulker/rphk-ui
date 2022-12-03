const { mergeConfig } = require('vite');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  core: {},
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return {
      ...config,
      // define: {
      //   ...config.define,
      //   global: 'window',
      // },
      // esbuild: {
      //   ...config.esbuild,
      //   jsxInject: `import React from 'react'`,
      // },
    };
  },
  docs: {
    docsPage: 'automatic',
  },
};
