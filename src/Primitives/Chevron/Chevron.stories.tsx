import { ComponentStoryFn, Meta } from '@storybook/react';

import { Chevron } from '.';

const meta: Meta<typeof Chevron> = {
  component: Chevron,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Chevron> = (args) => <Chevron {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: 'text-white',
};
