import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { initialValue: 10 },
};
