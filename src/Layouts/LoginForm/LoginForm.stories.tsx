import { ComponentStoryFn, Meta } from '@storybook/react';

import { LoginForm } from '.';
import { TextInput } from '../../Primitives/TextInput';

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <TextInput id="username" />,
};
