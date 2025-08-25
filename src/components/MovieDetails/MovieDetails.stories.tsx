import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MovieDetails } from './MovieDetails';

const meta: Meta<typeof MovieDetails> = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: {
      id: '1',
      posterUrl:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
      title: 'Bohemian Rhapsody',
      releaseYear: 2018,
      rating: 8.5,
      duration: '2h 35min',
      description: 'A biographical drama...',
      genres: ['Drama', 'Biography', 'Music'],
    },
  },
};
