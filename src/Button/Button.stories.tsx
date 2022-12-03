import { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta: Meta<typeof Button> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Primary = () => <Button variant="primary">Test</Button>;
export const Secondary = () => <Button variant="secondary">Test</Button>;
