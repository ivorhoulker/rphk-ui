import { ComponentStoryFn, Meta } from '@storybook/react';

import { Dropdown } from '.';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const dropdownData = [
  { id: '1', label: 'First choice' },
  { id: '2', label: 'Second choice' },
  { id: '3', label: 'Third choice' },
  { id: '4', label: 'Fourth choice' },
];

const Template: ComponentStoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  initialSelectedId: '1',
  data: dropdownData,
};

export const Secondary = Template.bind({});
Secondary.args = {
  initialSelectedId: '1',
  variant: 'secondary',
  data: dropdownData,
};
