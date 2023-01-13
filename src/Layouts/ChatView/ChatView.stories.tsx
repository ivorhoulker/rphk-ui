import { ComponentStoryFn, Meta } from '@storybook/react';

import { ChatView } from '.';
import { Wrapper } from '../../placeholders/Wrapper';
import { messages } from '../../placeholders/testMessages';

const meta: Meta<typeof ChatView> = {
  component: ChatView,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof ChatView> = (args) => (
  <Wrapper className="h-24 w-96">
    <ChatView {...args} />
  </Wrapper>
);

export const Primary = Template.bind({});
Primary.args = {
  messages,
};
