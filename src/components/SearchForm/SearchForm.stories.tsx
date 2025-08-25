import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SearchForm } from './SearchForm';

const meta: Meta<typeof SearchForm> = {
  title: 'Components/SearchForm',
  component: SearchForm,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

const mockOnSearch = (query: string) => console.log('search:', query);

export const Empty: Story = {
  args: { initialQuery: '', onSearch: mockOnSearch },
};

export const Prefilled: Story = {
  args: { initialQuery: 'Inception', onSearch: mockOnSearch },
};
