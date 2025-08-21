import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GenreSelect } from './GenreSelect';

const genres = {
  ALL: 'ALL',
  COMEDY: 'COMEDY',
  HORROR: 'HORROR',
};
const onChange = jest.fn();

describe('GenreSelect', () => {
  afterEach(() => onChange.mockClear());

  it('renders all genres passed in props', () => {
    render(<GenreSelect genres={Object.keys(genres)} selectedGenre="ALL" onChange={onChange} />);
    Object.keys(genres).forEach((g) =>
      expect(screen.getByRole('button', { name: genres[g as keyof typeof genres] })).toBeInTheDocument()
    );
  });

  it('highlights selected genre', () => {
    render(<GenreSelect genres={Object.keys(genres)} selectedGenre="COMEDY" onChange={onChange} />);
    expect(screen.getByRole('button', { name: genres['COMEDY'] })).toHaveClass('active');
    expect(screen.getByRole('button', { name: genres['HORROR'] })).not.toHaveClass('active');
  });

  it('calls onChange with correct genre after click', () => {
    render(<GenreSelect genres={Object.keys(genres)} selectedGenre="ALL" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: genres['HORROR'] }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('HORROR');
  });
});
