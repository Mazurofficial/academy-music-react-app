import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Input from '@/components/ui/Input/Input';
import type { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
   tags: ['autodocs'],
   component: Input,
   args: {
      onChange: fn(),
   },
};

type Story = StoryObj<StoryProps>;

export const Default: Story = {
   args: {
      placeholder: 'Test input',
      label: 'Test input',
   },
   render: (args) => <Input {...args} />,
};

export const WithError: Story = {
   args: {
      placeholder: 'Test input',
      label: 'Test input',
      error: true,
      errorText: 'Testing error message',
   },
   render: (args) => <Input {...args} />,
};

export default meta;
