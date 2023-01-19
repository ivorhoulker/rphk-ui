import { ComponentStoryFn, Meta } from '@storybook/react';

import { Section } from '.';
import { Wrapper } from '../../placeholders/Wrapper';

const meta: Meta<typeof Section> = {
  component: Section,
  parameters: {
    // layout: 'centered',
    layout: 'full',
  },
};
export default meta;

const Template: ComponentStoryFn<typeof Section> = (args) => (
  <Wrapper className="flex w-full min-w-full justify-center">
    <Section {...args} />
  </Wrapper>
);

export const Test = Template.bind({});
Test.args = {
  className: 'dark:bg-gray-700 bg-gray-100 ',
  children: (
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
      industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
      PageMaker including versions of Lorem Ipsum.
    </p>
  ),
};
