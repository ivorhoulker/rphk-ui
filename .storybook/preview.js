import '../src/styles/global.css';
import { themes } from '@storybook/theming';
export const parameters = {
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.light },
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
};
