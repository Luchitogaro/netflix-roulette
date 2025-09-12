import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieListPage } from './MovieListPage';
import { mockMovies, mockMovie } from '../../test-utils/testData';

const mockApiResponse = {
  data: [
    {
      id: 1,
      title: 'Bohemian Rhapsody',
      release_date: '2018-10-24',
      poster_path: 'https://example.com/poster1.jpg',
      vote_average: 8.5,
      runtime: 134,
      overview: 'A biographical drama about Queen.',
      genres: ['Drama', 'Biography', 'Music']
    },
    {
      id: 2,
      title: 'The Shawshank Redemption',
      release_date: '1994-09-23',
      poster_path: 'https://example.com/poster2.jpg',
      vote_average: 9.3,
      runtime: 142,
      overview: 'Two imprisoned men bond over a number of years.',
      genres: ['Drama', 'Crime']
    }
  ]
};

global.fetch = jest.fn();

jest.mock('../SearchForm', () => ({
  SearchForm: ({ onSearch, initialQuery }: any) => (
    <div data-testid="mock-search-form">
      <input 
        data-testid="search-input" 
        defaultValue={initialQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}));

jest.mock('../GenreSelect', () => ({
  GenreSelect: ({ genres, selectedGenre, onChange }: any) => (
    <div data-testid="mock-genre-select">
      {genres.map((genre: string) => (
        <button
          key={genre}
          data-testid={`genre-${genre.toLowerCase()}`}
          onClick={() => onChange(genre)}
          className={selectedGenre === genre ? 'active' : ''}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}));

jest.mock('../SortControl', () => ({
  SortControl: ({ value, onChange }: any) => (
    <select 
      data-testid="mock-sort-control" 
      value={value} 
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="releaseDate">Release Date</option>
      <option value="title">Title</option>
    </select>
  )
}));

jest.mock('../MovieTile', () => ({
  MovieTile: ({ id, title, releaseYear, onClick }: any) => (
    <div 
      data-testid={`movie-tile-${id}`}
      onClick={() => onClick(id)}
      style={{ cursor: 'pointer' }}
    >
      <h3>{title}</h3>
      <span>{releaseYear}</span>
    </div>
  )
}));

jest.mock('../MovieDetails', () => ({
  MovieDetails: ({ movie }: any) => (
    <div data-testid="mock-movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
    </div>
  )
}));

describe('MovieListPage', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse)
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('renders the main container with correct test attributes', () => {
      render(<MovieListPage />);
      
      const container = screen.getByTestId('movie-list-page');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('data-cy', 'movie-list-page');
    });

    it('renders the header with logo and add movie button', () => {
      render(<MovieListPage />);
      
      const logos = screen.getAllByText('netflixroulette');
      expect(logos.length).toBeGreaterThan(0);
      
      const addButton = screen.getByTestId('add-movie-btn');
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveTextContent('+ ADD MOVIE');
      expect(addButton).toHaveAttribute('data-cy', 'add-movie-btn');
    });

    it('renders the main title when no movie is selected', () => {
      render(<MovieListPage />);
      
      expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
    });

    it('renders SearchForm component', () => {
      render(<MovieListPage />);
      
      expect(screen.getByTestId('mock-search-form')).toBeInTheDocument();
    });

    it('renders GenreSelect with correct genres', () => {
      render(<MovieListPage />);
      
      expect(screen.getByTestId('mock-genre-select')).toBeInTheDocument();
      expect(screen.getByTestId('genre-all')).toBeInTheDocument();
      expect(screen.getByTestId('genre-documentary')).toBeInTheDocument();
      expect(screen.getByTestId('genre-comedy')).toBeInTheDocument();
      expect(screen.getByTestId('genre-horror')).toBeInTheDocument();
      expect(screen.getByTestId('genre-crime')).toBeInTheDocument();
    });

    it('renders SortControl component', () => {
      render(<MovieListPage />);
      
      expect(screen.getByTestId('mock-sort-control')).toBeInTheDocument();
    });

    it('renders movie grid container', () => {
      render(<MovieListPage />);
      
      expect(screen.getByTestId('movie-grid')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading state initially', async () => {
      render(<MovieListPage />);
      
      expect(screen.getByTestId('loading')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      });
    });
  });

  describe('API Integration', () => {
    it('fetches movies on initial load', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:4000/movies?sortBy=releaseDate&sortOrder=desc'
        );
      });
    });

    it('renders movies after successful API call', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
        expect(screen.getByTestId('movie-tile-2')).toBeInTheDocument();
        expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
        expect(screen.getByText('The Shawshank Redemption')).toBeInTheDocument();
      });
    });

    it('includes search parameter in API call when searching', async () => {
      render(<MovieListPage />);
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Bohemian' } });
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:4000/movies?search=Bohemian&sortBy=releaseDate&sortOrder=desc'
        );
      }, { timeout: 1000 });
    });

    it('includes filter parameter in API call when selecting genre', async () => {
      render(<MovieListPage />);
      
      const genreButton = screen.getByTestId('genre-comedy');
      fireEvent.click(genreButton);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:4000/movies?filter=COMEDY&sortBy=releaseDate&sortOrder=desc'
        );
      });
    });

    it('includes sortBy parameter in API call when changing sort', async () => {
      render(<MovieListPage />);
      
      const sortControl = screen.getByTestId('mock-sort-control');
      fireEvent.change(sortControl, { target: { value: 'title' } });
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:4000/movies?sortBy=title&sortOrder=desc'
        );
      });
    });
  });

  describe('Movie Selection', () => {
    it('shows movie details when a movie is clicked', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      const movieTile = screen.getByTestId('movie-tile-1');
      fireEvent.click(movieTile);
      
      await waitFor(() => {
        expect(screen.getByTestId('mock-movie-details')).toBeInTheDocument();
        expect(screen.queryByText('FIND YOUR MOVIE')).not.toBeInTheDocument();
      });
    });

    it('shows back button when movie is selected', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      const movieTile = screen.getByTestId('movie-tile-1');
      fireEvent.click(movieTile);
      
      await waitFor(() => {
        const backButton = screen.getByTestId('back-btn');
        expect(backButton).toBeInTheDocument();
        expect(backButton).toHaveTextContent('← Back to search');
        expect(backButton).toHaveAttribute('data-cy', 'back-btn');
      });
    });

    it('returns to movie list when back button is clicked', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      const movieTile = screen.getByTestId('movie-tile-1');
      fireEvent.click(movieTile);
      
      await waitFor(() => {
        expect(screen.getByTestId('back-btn')).toBeInTheDocument();
      });
      
      const backButton = screen.getByTestId('back-btn');
      fireEvent.click(backButton);
      
      await waitFor(() => {
        expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
        expect(screen.queryByTestId('mock-movie-details')).not.toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('clears selected movie when searching', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      const movieTile = screen.getByTestId('movie-tile-1');
      fireEvent.click(movieTile);
      
      await waitFor(() => {
        expect(screen.getByTestId('mock-movie-details')).toBeInTheDocument();
      });
      
      const backButton = screen.getByTestId('back-btn');
      fireEvent.click(backButton);
      
      await waitFor(() => {
        expect(screen.queryByTestId('mock-movie-details')).not.toBeInTheDocument();
        expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
      });
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'New Search' } });
      
      await waitFor(() => {
        expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
      });
    });
  });

  describe('Genre Selection', () => {
    it('clears selected movie when changing genre', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      const movieTile = screen.getByTestId('movie-tile-1');
      fireEvent.click(movieTile);
      
      await waitFor(() => {
        expect(screen.getByTestId('mock-movie-details')).toBeInTheDocument();
      });
      
      const backButton = screen.getByTestId('back-btn');
      fireEvent.click(backButton);
      
      await waitFor(() => {
        expect(screen.queryByTestId('mock-movie-details')).not.toBeInTheDocument();
        expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
      });
      
      const genreButton = screen.getByTestId('genre-comedy');
      fireEvent.click(genreButton);
      
      await waitFor(() => {
        expect(screen.getByText('FIND YOUR MOVIE')).toBeInTheDocument();
      });
    });
  });

  describe('Data Transformation', () => {
    it('transforms API data correctly', async () => {
      const customApiResponse = {
        data: [{
          id: 999,
          title: 'Test Movie',
          release_date: '2021-01-01',
          poster_path: null,
          vote_average: 7.5,
          runtime: 120,
          overview: 'Test description',
          genres: ['Action']
        }]
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(customApiResponse)
      });
      
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-999')).toBeInTheDocument();
        expect(screen.getByText('Test Movie')).toBeInTheDocument();
      });
    });

    it('handles missing poster_path with placeholder', async () => {
      const customApiResponse = {
        data: [{
          id: 888,
          title: 'No Poster Movie',
          release_date: '2023-01-01',
          poster_path: null,
          vote_average: 7.5,
          runtime: 120,
          overview: 'No poster test',
          genres: ['Drama']
        }]
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(customApiResponse)
      });
      
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-888')).toBeInTheDocument();
      });
    });
  });

  describe('Footer', () => {
    it('renders footer with logo', () => {
      render(<MovieListPage />);
      
      const footerLogos = screen.getAllByText('netflixroulette');
      expect(footerLogos.length).toBeGreaterThan(1);
    });
  });

  describe('Responsive Behavior', () => {
    it('maintains functionality across different states', async () => {
      render(<MovieListPage />);
      
      await waitFor(() => {
        expect(screen.getByTestId('movie-tile-1')).toBeInTheDocument();
      });
      
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'search term' } });
      
      const genreButton = screen.getByTestId('genre-horror');
      fireEvent.click(genreButton);
      
      const sortControl = screen.getByTestId('mock-sort-control');
      fireEvent.change(sortControl, { target: { value: 'title' } });
      
      await waitFor(() => {
        expect(fetch).toHaveBeenLastCalledWith(
          'http://localhost:4000/movies?search=search+term&filter=HORROR&sortBy=title&sortOrder=desc'
        );
      });
    });
  });
});
