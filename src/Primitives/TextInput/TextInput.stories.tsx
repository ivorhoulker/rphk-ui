import { ComponentStoryFn, Meta } from '@storybook/react';

import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof TextInput> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({ placeholder: 'test', className: 'w-60' });
