import { Meta, StoryObj } from '@storybook/react';

import { HUD } from '.';

const meta: Meta<typeof HUD> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'HUD',
  component: HUD,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      defaultValue: 'test',
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<typeof HUD>;

export const Primary: Story = {
  args: {
    className: 'test',
  },
};
