import { ComponentStoryFn, Meta } from '@storybook/react';

import { Header } from '.';

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Header> = (args) => <Header {...args} />;

export const Normal = Template.bind({});
Normal.args = { className: '', children: 'Presence' };
