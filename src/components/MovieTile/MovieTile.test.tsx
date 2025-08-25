import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieTile, Movie } from './MovieTile';

const mockMovie: Movie = {
  id: '1',
  posterUrl: 'https://via.placeholder.com/320x455',
  title: 'Bohemian Rhapsody',
  releaseYear: 2018,
  genres: ['Drama', 'Music'],
};

describe('MovieTile', () => {
  it('renders movie info', () => {
    render(<MovieTile movie={mockMovie} onClick={jest.fn()} />);
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
  });

  it('calls onClick when the tile is clicked', () => {
    const onClick = jest.fn();
    render(<MovieTile movie={mockMovie} onClick={onClick} />);
    fireEvent.click(screen.getByRole('img'));
    expect(onClick).toHaveBeenCalledWith(mockMovie);
  });

  it('popup opens and Edit/Delete work', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<MovieTile movie={mockMovie} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('popup')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('edit-btn'));
    expect(onEdit).toHaveBeenCalledWith(mockMovie);

    fireEvent.click(screen.getByTestId('delete-btn'));
    expect(onDelete).toHaveBeenCalledWith(mockMovie);
  });
});
