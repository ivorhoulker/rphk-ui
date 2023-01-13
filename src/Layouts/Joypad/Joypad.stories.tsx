import { ComponentStoryFn, Meta } from '@storybook/react';

import { Joypad } from '.';

const meta: Meta<typeof Joypad> = {
  component: Joypad,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Template: ComponentStoryFn<typeof Joypad> = (args) => (
  <Wrapper>
    <Joypad {...args} />
  </Wrapper>
);

export const Small = Template.bind({});
Small.args = {
  onChange: ({ x, y }) => {
    console.log({ x, y });
  },
  height: 120,
};

export const Medium = Template.bind({});
Medium.args = {
  onChange: ({ x, y }) => {
    console.log({ x, y });
  },
  height: 200,
};

export const Large = Template.bind({});
Large.args = {
  onChange: ({ x, y }) => {
    console.log({ x, y });
  },
  height: 400,
};
