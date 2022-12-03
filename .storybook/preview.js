import '../src/styles/global.css';
import { themes } from '@storybook/theming';
import dark from './dark';
import light from './light';
export const parameters = {
  darkMode: {
    dark,
    light,
    darkClass: 'dark',
    stylePreview: true,
    current: 'dark',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: dark,
  },
};
