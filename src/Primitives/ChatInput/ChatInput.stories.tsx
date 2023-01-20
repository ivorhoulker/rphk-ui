import { ComponentStoryFn, Meta } from '@storybook/react';

import { ChatInput } from '.';

const meta: Meta<typeof ChatInput> = {
  component: ChatInput,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof ChatInput> = (args) => <ChatInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'What do you want to say?',
  onValueChange: (value) => {
    console.log({ value });
  },
  onMessageSubmit: (submitValue) => {
    console.log({ submitValue });
  },
};
