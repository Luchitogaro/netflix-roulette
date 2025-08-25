import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MovieTile } from './MovieTile';
import { mockBasicMovie } from '../../test-utils/testData';

const meta: Meta<typeof MovieTile> = {
  title: 'Components/MovieTile',
  component: MovieTile,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...mockBasicMovie,
    onClick: (movieId) => console.log('Clicked movie with id:', movieId),
    onEdit: (movieId) => console.log('Edit movie with id:', movieId),
    onDelete: (movieId) => console.log('Delete movie with id:', movieId),
  },
};
