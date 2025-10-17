import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MovieTile } from './MovieTile';
import { mockBasicMovie } from '../../test-utils/testData';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
}));

describe('MovieTile', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders movie info', () => {
    render(
      <MemoryRouter>
        <MovieTile {...mockBasicMovie} onClick={jest.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
  });

  it('calls onClick when the tile is clicked', () => {
    const onClick = jest.fn();
    render(
      <MemoryRouter>
        <MovieTile {...mockBasicMovie} onClick={onClick} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('img'));
    expect(onClick).toHaveBeenCalledWith(mockBasicMovie.id);
  });

  it('popup opens and Edit/Delete work', () => {
    const onDelete = jest.fn();
    render(
      <MemoryRouter>
        <MovieTile {...mockBasicMovie} onDelete={onDelete} />
      </MemoryRouter>
    );

    // Test Edit functionality - should navigate to edit route
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('edit-btn'));
    expect(mockNavigate).toHaveBeenCalledWith(`/${mockBasicMovie.id}/edit`);
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();

    // Test Delete functionality
    fireEvent.click(screen.getByTestId('menu-toggle'));
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-btn'));
    expect(onDelete).toHaveBeenCalledWith(mockBasicMovie.id);
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });
});
