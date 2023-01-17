import { ComponentStoryFn, Meta } from '@storybook/react';

import { Loading } from '.';

const meta: Meta<typeof Loading> = {
  component: Loading,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Loading> = (args) => <Loading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'sm',
};
