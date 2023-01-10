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
};

export const Down = Template.bind({});
Down.args = {
  variant: 'down',
};
