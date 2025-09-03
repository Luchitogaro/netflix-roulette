import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieTile } from './MovieTile';
import { mockBasicMovie } from '../../test-utils/testData';

describe('MovieTile', () => {
  it('renders movie info', () => {
    render(<MovieTile {...mockBasicMovie} onClick={jest.fn()} />);
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
  });

  it('calls onClick when the tile is clicked', () => {
    const onClick = jest.fn();
    render(<MovieTile {...mockBasicMovie} onClick={onClick} />);
    fireEvent.click(screen.getByRole('img'));
    expect(onClick).toHaveBeenCalledWith(mockBasicMovie.id);
  });

  it('popup opens and Edit/Delete work', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(<MovieTile {...mockBasicMovie} onEdit={onEdit} onDelete={onDelete} />);

    // Test Edit functionality
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('edit-btn'));
    expect(onEdit).toHaveBeenCalledWith(mockBasicMovie.id);
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();

    // Test Delete functionality
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-btn'));
    expect(onDelete).toHaveBeenCalledWith(mockBasicMovie.id);
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });
});
