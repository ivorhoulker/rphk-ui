import { ComponentStoryFn, Meta } from '@storybook/react';

import { Tiltpad } from '.';
import { Video } from '../../Primitives/Video';

const meta: Meta<typeof Tiltpad> = {
  component: Tiltpad,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Template: ComponentStoryFn<typeof Tiltpad> = (args) => (
  <Wrapper>
    <Tiltpad {...args} />
  </Wrapper>
);

export const Small = Template.bind({});
Small.args = {
  onChange: ({ y }) => {
    console.log({ tilt: y });
  },
  height: 120,
};

export const Medium = Template.bind({});
Medium.args = {
  onChange: ({ y }) => {
    console.log({ tilt: y });
  },
  height: 200,
};

export const Large = Template.bind({});
Large.args = {
  onChange: ({ y }) => {
    console.log({ tilt: y });
  },
  height: 400,
};
