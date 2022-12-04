import { ComponentStoryFn, Meta } from '@storybook/react';

import { HUD } from '.';
import { Video } from '../../Primitives/Video';

const meta: Meta<typeof HUD> = {
  component: HUD,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof HUD> = (args) => <HUD {...args} />;

export const SixteenByNine = Template.bind({});
SixteenByNine.args = {
  children: <Video />,
};

export const FourByThree = Template.bind({});
FourByThree.args = {
  children: <Video aspect="4/3" />,
};

export const WithGuides = Template.bind({});
WithGuides.args = {
  children: <Video />,
  showLayoutDebug: true,
};

export const Warning = Template.bind({});
Warning.args = {
  children: <Video />,
  warningMessage: 'Warning: leaving safe area.',
};
