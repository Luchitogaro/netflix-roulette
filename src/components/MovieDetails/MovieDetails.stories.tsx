import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MovieDetails } from './MovieDetails';
import { mockMovie } from '../../test-utils/testData';

const meta: Meta<typeof MovieDetails> = {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    movie: mockMovie,
  },
};
