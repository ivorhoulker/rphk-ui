import { ComponentStoryFn, Meta } from '@storybook/react';

import { Arrow } from '.';

const meta: Meta<typeof Arrow> = {
  component: Arrow,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Arrow> = (args) => <Arrow {...args} />;

export const Up = Template.bind({});
Up.args = {
  variant: 'up',
  active: false,
};

export const ActiveUp = Template.bind({});
ActiveUp.args = {
  variant: 'up',
  active: true,
};

export const Down = Template.bind({});
Down.args = {
  variant: 'down',
};

export const Left = Template.bind({});
Left.args = {
  variant: 'left',
};

export const Right = Template.bind({});
Right.args = {
  variant: 'right',
};

export const UpLeft = Template.bind({});
UpLeft.args = {
  variant: 'up-left',
};

export const UpRight = Template.bind({});
UpRight.args = {
  variant: 'up-right',
};

export const DownLeft = Template.bind({});
DownLeft.args = {
  variant: 'down-left',
};

export const DownRight = Template.bind({});
DownRight.args = {
  variant: 'down-right',
};
