import { Meta, StoryObj } from '@storybook/react';

import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      defaultValue: 'test',
      control: 'text',
    },
  },
};
export default meta;
type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  args: {
    className: 'test',
    placeholder: 'test',
  },
};

export const Secondary: Story = {
  args: {
    className: 'test',
  },
};
