import { ComponentStoryFn, Meta } from '@storybook/react';

import { Video } from '.';

const meta: Meta<typeof Video> = {
  component: Video,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Video> = (args) => <Video {...args} />;

export const SixteenByNine = Template.bind({});
SixteenByNine.args = {
  src: '/test_video.webm',
};

export const FourByThree = Template.bind({});
FourByThree.args = {
  src: '/test_video.webm',
  aspect: '4/3',
};

export const Square = Template.bind({});
Square.args = {
  src: '/test_video.webm',
  aspect: 'square',
};

export const NineBySixteen = Template.bind({});
NineBySixteen.args = {
  src: '/test_video.webm',
  aspect: '9/16',
};

export const FlipHorizontal = Template.bind({});
FlipHorizontal.args = {
  src: '/test_video.webm',
  flipHorizontal: true,
};

export const Rotate90 = Template.bind({});
Rotate90.args = {
  src: '/test_video.webm',
  rotate: '90',
};

export const NineBySixteenRotate90 = Template.bind({});
NineBySixteenRotate90.args = {
  src: '/test_video.webm',
  rotate: '90',
  aspect: '9/16',
};

export const Rotate90FourByThree = Template.bind({});
Rotate90FourByThree.args = {
  src: '/test_video.webm',
  rotate: '90',
  aspect: '4/3',
};

export const RotateMinus90FourByThree = Template.bind({});
RotateMinus90FourByThree.args = {
  src: '/test_video.webm',
  rotate: '-90',
  aspect: '4/3',
};
