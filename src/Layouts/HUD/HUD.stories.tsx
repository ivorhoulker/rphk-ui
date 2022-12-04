import { ComponentStoryFn, Meta } from '@storybook/react';

import { HUD } from '.';

const meta: Meta<typeof HUD> = {
  component: HUD,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof HUD> = (args) => <HUD {...args} />;

export const SixteenByNine = Template.bind({});
SixteenByNine.args = {};

export const WithGuides = Template.bind({});
WithGuides.args = {
  showLayoutDebug: true,
};
