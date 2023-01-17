import { ComponentStoryFn, Meta } from '@storybook/react';

import { LoginForm } from '.';
import { TextInput } from '../../Primitives/TextInput';
import { Wrapper } from '../../placeholders/Wrapper';

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof LoginForm> = (args) => (
  <Wrapper className="w-60">
    <LoginForm {...args} />
  </Wrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  testSubmitButton: true,
  className: 'w-96',
};
