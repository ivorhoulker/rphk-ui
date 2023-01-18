import { ComponentStoryFn, Meta } from '@storybook/react';

import { Button } from '../../Primitives/Button';
import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  heading: 'Welcome to Presence',
  paragraphs: [
    `In Presence, you control your avatar in the real world. Don't do anything you wouldn't do in the real world.`,
    `By agreeing to these terms and conditions, you confirm that you won't randomly go around attacking people's ankles.`,
  ],
  buttons: [
    <Button variant="primary" size="sm">
      I accept
    </Button>,
    <Button variant="tertiary" size="sm">
      Decline
    </Button>,
  ],
};
