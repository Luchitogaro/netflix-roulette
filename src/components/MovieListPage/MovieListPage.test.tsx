import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { MovieListPage } from './MovieListPage';

jest.mock('../SearchForm', () => ({
  SearchForm: ({ onSearch }: any) => (
    <div data-testid="search-form">
      <input
        data-testid="search-input"
        placeholder="What do you want to watch?"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <button
        data-testid="search-btn"
        onClick={() => onSearch && onSearch('test query')}
      >
        SEARCH
      </button>
    </div>
  ),
}));

jest.mock('../GenreSelect', () => ({
  GenreSelect: ({ onSelect }: any) => (
    <div data-testid="genre-select">
      <button onClick={() => onSelect && onSelect('Action')}>Action</button>
      <button onClick={() => onSelect && onSelect('ALL')}>All</button>
    </div>
  ),
}));

jest.mock('../SortControl', () => ({
  SortControl: ({ onSort }: any) => (
    <div data-testid="sort-control">
      <button onClick={() => onSort && onSort('title')}>Sort by Title</button>
      <button onClick={() => onSort && onSort('releaseDate')}>
        Sort by Date
      </button>
    </div>
  ),
}));

jest.mock('../MovieTile', () => ({
  MovieTile: ({ id, title, onClick, onEdit, onDelete }: any) => (
    <div
      data-testid={`movie-tile-${id}`}
      onClick={() => onClick && onClick(id)}
    >
      <span>{title}</span>
      <button
        data-testid={`edit-btn-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          onEdit && onEdit(id);
        }}
      >
        Edit
      </button>
      <button
        data-testid={`delete-btn-${id}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete(id);
        }}
      >
        Delete
      </button>
    </div>
  ),
}));

const mockNavigate = jest.fn();
const mockSetSearchParams = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => [mockSearchParams, mockSetSearchParams],
}));

global.fetch = jest.fn();

describe('MovieListPage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetSearchParams.mockClear();
    (fetch as jest.Mock).mockClear();

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({
        data: [
          {
            id: 1,
            title: 'Bohemian Rhapsody',
            release_date: '2018-10-24',
            poster_path: 'https://example.com/poster1.jpg',
            vote_average: 8.5,
            runtime: 134,
            overview: 'A biographical drama about Queen.',
            genres: ['Drama', 'Biography', 'Music'],
          },
          {
            id: 2,
            title: 'The Matrix',
            release_date: '1999-03-31',
            poster_path: 'https://example.com/poster2.jpg',
            vote_average: 8.7,
            runtime: 136,
            overview:
              'A computer hacker learns about the true nature of reality.',
            genres: ['Action', 'Sci-Fi'],
          },
        ],
      }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderMovieListPage = () => {
    return render(
      <MemoryRouter>
        <MovieListPage />
      </MemoryRouter>
    );
  };

  describe('Basic Rendering', () => {
    it('renders the main container', () => {
      renderMovieListPage();

      expect(screen.getByTestId('movie-list-page')).toBeInTheDocument();
    });

    it('renders the header with logo', () => {
      renderMovieListPage();

      const logoElements = screen.getAllByText('netflixroulette');
      expect(logoElements).toHaveLength(2);
      expect(logoElements[0]).toHaveClass('logo');
    });

    it('renders the add movie button', () => {
      renderMovieListPage();

      const addButton = screen.getByTestId('add-movie-btn');
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveTextContent('+ ADD MOVIE');
    });

    it('renders child components', () => {
      renderMovieListPage();

      expect(screen.getByTestId('genre-select')).toBeInTheDocument();
      expect(screen.getByTestId('sort-control')).toBeInTheDocument();
    });
  });

  describe('API Integration', () => {
    it('fetches movies when component loads', async () => {
      renderMovieListPage();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc'
        );
      });
    });

    it('displays movies after fetching', async () => {
      renderMovieListPage();

      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      expect(screen.getByTestId('movie-tile-2')).toBeInTheDocument();
      expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
      expect(screen.getByText('The Matrix')).toBeInTheDocument();
    });

    it('handles API response data transformation correctly', async () => {
      renderMovieListPage();

      await waitFor(() => {
        expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
      });
      
      expect(screen.getByText('The Matrix')).toBeInTheDocument();
      expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      expect(screen.getByTestId('movie-tile-2')).toBeInTheDocument();
    });
  });

  describe('Movie Interaction', () => {
    it('navigates to movie details when movie is clicked', async () => {
      renderMovieListPage();

      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });

      const movieTile = screen.getByTestId('movie-tile-1');
      fireEvent.click(movieTile);

      expect(mockNavigate).toHaveBeenCalledWith('/1?');
    });

    it('renders delete buttons for each movie', async () => {
      renderMovieListPage();

      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
        expect(screen.getByTestId('movie-tile-2')).toBeInTheDocument();
      });
      
      expect(screen.getByTestId('movie-tile-2')).toBeInTheDocument();
      expect(screen.getByTestId('edit-btn-1')).toBeInTheDocument();
      expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
      expect(screen.getByTestId('delete-btn-2')).toBeInTheDocument();
    });

    it('renders add movie button', async () => {
      renderMovieListPage();

      const addButton = screen.getByTestId('add-movie-btn');
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveTextContent('+ ADD MOVIE');
    });

    it('navigates to /new when add movie button is clicked', async () => {
      renderMovieListPage();

      const addButton = screen.getByTestId('add-movie-btn');
      fireEvent.click(addButton);

      expect(mockNavigate).toHaveBeenCalledWith('/new');
    });
  });

  describe('Loading and Error States', () => {
    it('shows loading message while fetching movies', async () => {
      (fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: jest.fn().mockResolvedValue({ data: [] }),
                }),
              100
            )
          )
      );

      renderMovieListPage();

      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('shows no movies message when API returns empty results', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ data: [] }),
      });

      renderMovieListPage();

      await waitFor(() => {
        expect(screen.getByTestId('no-movies')).toBeInTheDocument();
      });
      
      expect(screen.getByText('No movies found')).toBeInTheDocument();
    });

    it('shows error message when API fails', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      renderMovieListPage();

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
      });
      
      expect(
        screen.getByText(
          'Unable to connect to the movie service. Please make sure the backend server is running.'
        )
      ).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });
});
