import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { GenreSelect } from './GenreSelect';

const meta: Meta<typeof GenreSelect> = {
  title: 'Components/GenreSelect',
  component: GenreSelect,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

const genres = ['ALL', 'COMEDY', 'HORROR', 'CRIME', 'DOCUMENTARY'];

export const Primary: Story = {
  args: { genres, selectedGenre: 'ALL' },
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedGenre);
    return (
      <GenreSelect
        genres={args.genres}
        selectedGenre={selected}
        onChange={setSelected}
      />
    );
  },
};

export const SelectedComedy: Story = {
  args: { genres, selectedGenre: 'COMEDY' },
};
