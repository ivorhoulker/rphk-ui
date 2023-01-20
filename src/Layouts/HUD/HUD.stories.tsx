import { ComponentStoryFn, Meta } from '@storybook/react';

import { HUD } from '.';
import { Video } from '../../Primitives/Video';
import { messages } from '../../placeholders/testMessages';

const meta: Meta<typeof HUD> = {
  component: HUD,
  parameters: {
    layout: 'full',
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
  mockMessageSubmit: true,
};

export const SixteenByNineGuides = Template.bind({});
SixteenByNineGuides.args = {
  messages,
  showLayoutDebug: true,
  children: <Video />,
  mockMessageSubmit: true,
};

export const NineBySixteen = Template.bind({});
NineBySixteen.args = {
  messages,
  children: <Video aspect="9/16" />,
  mockMessageSubmit: true,
};

export const NineBySixteenGuides = Template.bind({});
NineBySixteenGuides.args = {
  messages,
  showLayoutDebug: true,
  children: <Video aspect="9/16" />,
  mockMessageSubmit: true,
};

export const FourByThree = Template.bind({});
FourByThree.args = {
  messages,
  children: <Video aspect="4/3" />,
  mockMessageSubmit: true,
};

export const WithGuides = Template.bind({});
WithGuides.args = {
  messages,
  children: <Video />,
  showLayoutDebug: true,
  mockMessageSubmit: true,
};

export const Warning = Template.bind({});
Warning.args = {
  messages,
  children: <Video />,
  warningMessage: 'Warning: leaving safe area.',
  mockMessageSubmit: true,
};
