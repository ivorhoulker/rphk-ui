import { Meta, StoryObj } from '@storybook/react';

import { Video } from '.';

const meta: Meta<typeof Video> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Video',
  component: Video,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      defaultValue: 'test',
      control: 'text',
    },
    loop: { control: 'boolean', defaultValue: true },
  },
};
export default meta;
type Story = StoryObj<typeof Video>;

export const Primary: Story = {
  args: {
    className: 'test',
  },
};

export const Secondary: Story = {
  args: {
    className: 'test',
  },
};
