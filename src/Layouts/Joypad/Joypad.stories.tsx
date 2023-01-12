import { ComponentStoryFn, Meta } from '@storybook/react';

import { Joypad } from '.';
import { Video } from '../../Primitives/Video';

const meta: Meta<typeof Joypad> = {
  component: Joypad,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Joypad> = (args) => <Joypad {...args} />;

export const Square = Template.bind({});
Square.args = {
  className: 'aspect-square',
};
