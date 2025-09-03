import React from 'react';
import { render } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';
import { mockDetailedMovie } from '../../test-utils/testData';

describe('MovieDetails', () => {
  it('matches snapshot', () => {
    const { container } = render(<MovieDetails movie={mockDetailedMovie} />);
    expect(container).toMatchSnapshot();
  });
});
