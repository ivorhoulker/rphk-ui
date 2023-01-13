import { ComponentStoryFn, Meta } from '@storybook/react';

import { ChatView } from '.';
import { TextInput } from '../../Primitives/TextInput';
import { Wrapper } from '../../placeholders/Wrapper';

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
  messages: [
    { id: 'test1', message: 'asjdiao', user: 'Ivor' },
    { id: 'test21', message: 'asasdjdiao', user: 'Bob' },
    { id: 'test3', message: 'asjdasdiao', user: 'Ivor' },
    { id: 'test4', message: 'asjdafsiao', user: 'Ivor' },
    { id: 'test241', message: 'asjasddiao', user: 'Jim' },
    { id: 'test4123', message: 'asjdfgasaiao', user: 'Ivor' },
    { id: 'teast1', message: 'asjdiao', user: 'Ivor' },
    { id: 'teast21', message: 'asasdjdiao', user: 'Bob' },
    { id: 'tesat3', message: 'asjdasdiao', user: 'Ivor' },
    { id: 'teast4', message: 'asjdafsiao', user: 'Ivor' },
    { id: 'teast241', message: 'asjasddiao', user: 'Jim' },
    { id: 'testa4123', message: 'asjdfgasaiao', user: 'Ivor' },
  ],
};
