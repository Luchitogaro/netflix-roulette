import React from 'react';
import { render } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';

describe('MovieDetails', () => {
  it('matches snapshot', () => {
    const movie = {
      id: '1',
      posterUrl: 'https://example.com/poster.jpg',
      title: 'Pulp Fiction',
      releaseYear: 1994,
      rating: 8.9,
      duration: '2h 34min',
      description: 'A classic crime film...',
      genres: ['Crime', 'Drama'],
    };

    const { container } = render(<MovieDetails movie={movie} />);
    expect(container).toMatchSnapshot();
  });
});
