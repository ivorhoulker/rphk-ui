import { ComponentStoryFn, Meta } from '@storybook/react';

import { CloseButton } from '.';

const meta: Meta<typeof CloseButton> = {
  component: CloseButton,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof CloseButton> = (args) => <CloseButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
