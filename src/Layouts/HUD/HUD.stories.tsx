import { ComponentStoryFn, Meta } from '@storybook/react';

import { HUD } from '.';
import { Video } from '../../Primitives/Video';
import { messages } from '../../placeholders/testMessages';

const meta: Meta<typeof HUD> = {
  component: HUD,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Template: ComponentStoryFn<typeof HUD> = (args) => (
  <Wrapper>
    <HUD {...args} />
  </Wrapper>
);

export const SixteenByNine = Template.bind({});
SixteenByNine.args = {
  messages,
  children: <Video />,
};

export const SixteenByNineGuides = Template.bind({});
SixteenByNineGuides.args = {
  messages,
  showLayoutDebug: true,
  children: <Video />,
  handleChange: ({ x, y }) => {
    console.log({ x, y });
  },
};

export const NineBySixteen = Template.bind({});
NineBySixteen.args = {
  messages,
  children: <Video aspect="9/16" />,
  handleChange: ({ x, y }) => {
    console.log({ x, y });
  },
};

export const FourByThree = Template.bind({});
FourByThree.args = {
  messages,
  children: <Video aspect="4/3" />,
  handleChange: ({ x, y }) => {
    console.log({ x, y });
  },
};

export const WithGuides = Template.bind({});
WithGuides.args = {
  messages,
  children: <Video />,
  showLayoutDebug: true,
  handleChange: ({ x, y }) => {
    console.log({ x, y });
  },
};

export const Warning = Template.bind({});
Warning.args = {
  messages,
  children: <Video />,
  warningMessage: 'Warning: leaving safe area.',
  handleChange: ({ x, y }) => {
    console.log({ x, y });
  },
};
