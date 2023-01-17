import { ComponentStoryFn, Meta } from '@storybook/react';

import { CustomLink } from '.';

const meta: Meta<typeof CustomLink> = {
  component: CustomLink,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof CustomLink> = (args) => <CustomLink {...args} />;

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

export const Small = Template.bind({});
Small.args = {
  children: 'Small',
  variant: 'primary',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  children: 'Large',
  variant: 'primary',
  size: 'lg',
};
