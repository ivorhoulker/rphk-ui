import { ComponentStoryFn, Meta } from '@storybook/react';

import { NotificationText } from '.';

const meta: Meta<typeof NotificationText> = {
  component: NotificationText,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof NotificationText> = (args) => <NotificationText {...args} />;

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

export const Tertiary = Template.bind({});
Tertiary.args = {
  children: 'Tertiary',
  variant: 'tertiary',
};

export const Warning = Template.bind({});
Warning.args = {
  children: 'Warning',
  variant: 'warning',
};

export const Confirmation = Template.bind({});
Confirmation.args = {
  children: 'Confirmation',
  variant: 'confirmation',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large',
  size: 'lg',
};
export const Small = Template.bind({});
Small.args = {
  children: 'Small',
  size: 'sm',
};
export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  children: 'Extra Small',
  size: 'xs',
};
