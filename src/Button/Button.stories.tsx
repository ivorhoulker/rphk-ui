import { ComponentStory, ComponentStoryFn, Meta, StoryObj } from '@storybook/react';

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
  argTypes: {},
};
export default meta;

const Template: ComponentStoryFn<typeof Button> = (args) => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  variant: 'primary',
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary',
};
