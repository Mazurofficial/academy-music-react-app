import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Button from '@/components/ui/Button/Button';
import type { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
   tags: ['autodocs'],
   component: Button,
   args: {
      onClick: fn(),
   },
};

type Story = StoryObj<StoryProps>;

export const Contained: Story = {
   args: {
      variant: 'contained',
   },
   render: (args) => <Button {...args}>Test button</Button>,
};

export const Outlined: Story = {
   args: {
      variant: 'outlined',
   },
   render: (args) => (
      <Button {...args}>
         <div
            style={{
               width: '18px',
               height: '18px',
               backgroundColor: '#ffffff',
               borderRadius: '50%',
            }}
         ></div>
      </Button>
   ),
};

export const Loading: Story = {
   args: {
      loading: true,
   },
   render: (args) => <Button {...args}>Test button</Button>,
};

export default meta;
