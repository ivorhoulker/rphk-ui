import { ComponentStoryFn, Meta } from '@storybook/react';

import { Button } from '.';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
  variant: 'primary',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  children: 'Extra small',
  size: 'xs',
};
export const Small = Template.bind({});
Small.args = {
  children: 'Small',
  size: 'sm',
};
export const Large = Template.bind({});
Large.args = {
  children: 'Large',
  size: 'lg',
};
export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  disabled: true,
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Secondary',
  variant: 'secondary',
};
export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Tertiary',
  variant: 'tertiary',
};
