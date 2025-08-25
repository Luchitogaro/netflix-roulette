import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MovieTile } from './MovieTile';

const meta: Meta<typeof MovieTile> = {
  title: 'Components/MovieTile',
  component: MovieTile,
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
      genres: ['Drama', 'Biography', 'Music'],
    },
    onClick: (m) => console.log('Clicked', m.title),
    onEdit: (m) => console.log('Edit', m.title),
    onDelete: (m) => console.log('Delete', m.title),
  },
};
