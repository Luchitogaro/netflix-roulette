import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { GenreSelect } from '../GenreSelect';
import { SortControl } from '../SortControl';
import { MovieTile } from '../MovieTile';
import { Dialog } from '../Dialog';
import { Movie } from '../../types';
import styles from './MovieListPage.module.css';

const GENRES = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

type DialogType = 'delete' | null;

interface DialogState {
  type: DialogType;
  movieId?: string;
  movie?: Movie;
}

export const MovieListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<DialogState>({ type: null });

  const searchQuery = searchParams.get('query') || '';
  const sortCriterion =
    (searchParams.get('sortBy') as 'releaseDate' | 'title') || 'releaseDate';
  const activeGenre = searchParams.get('genre') || 'ALL';

  const fetchMovies = useCallback(
    async (query: string, genre: string, sortBy: 'releaseDate' | 'title') => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (query) {
          params.append('search', query);
          params.append('searchBy', 'title');
        }
        if (genre !== 'ALL') params.append('filter', genre);
        params.append('sortBy', sortBy);
        params.append('sortOrder', 'desc');

        const url = `http://localhost:4000/movies?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const apiMovies = data.data || [];

        const transformedMovies: Movie[] = apiMovies.map((movie: any) => ({
          id: movie.id.toString(),
          posterUrl:
            movie.poster_path ||
            'https://via.placeholder.com/300x450/000000/FFFFFF?text=No+Image',
          title: movie.title,
          releaseYear: new Date(movie.release_date).getFullYear(),
          rating: movie.vote_average,
          duration: movie.runtime ? `${movie.runtime} min` : undefined,
          description: movie.overview,
          genres: movie.genres || [],
        }));

        setMovies(transformedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError(
          'Unable to connect to the movie service. Please make sure the backend server is running.'
        );
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchMovies('', 'ALL', 'releaseDate');
  }, [fetchMovies]);

  useEffect(() => {
    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      fetchMovies(searchQuery, activeGenre, sortCriterion);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [searchQuery, activeGenre, sortCriterion, fetchMovies]);

  const handleGenreChange = (genre: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (genre !== 'ALL') {
      newSearchParams.set('genre', genre);
    } else {
      newSearchParams.delete('genre');
    }
    setSearchParams(newSearchParams);
  };

  const handleSortChange = (sortBy: 'releaseDate' | 'title') => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (sortBy !== 'releaseDate') {
      newSearchParams.set('sortBy', sortBy);
    } else {
      newSearchParams.delete('sortBy');
    }
    setSearchParams(newSearchParams);
  };

  const handleMovieClick = (movieId: string) => {
    navigate(`/${movieId}?${searchParams.toString()}`);
  };

  const handleAddMovie = () => {
    navigate('/new');
  };

  const handleDeleteMovie = (movieId: string) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      setDialogState({ type: 'delete', movieId, movie });
    }
  };

  const handleCloseDialog = () => {
    setDialogState({ type: null });
  };

  const handleDeleteConfirm = () => {
    if (dialogState.movieId) {
      console.log('Delete confirmed for movie:', dialogState.movieId);
      setDialogState({ type: null });
    }
  };

  const renderDialogContent = () => {
    switch (dialogState.type) {
      case 'delete':
        return (
          <div>
            <p>Are you sure you want to delete "{dialogState.movie?.title}"?</p>
            <div className={styles['dialog-actions']}>
              <button
                onClick={handleDeleteConfirm}
                className={styles['confirm-btn']}
                data-cy="confirm-delete-btn"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseDialog}
                className={styles['cancel-btn']}
                data-cy="cancel-delete-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getDialogTitle = () => {
    switch (dialogState.type) {
      case 'delete':
        return 'DELETE MOVIE';
      default:
        return '';
    }
  };

  return (
    <div
      className={styles.container}
      data-cy="movie-list-page"
      data-testid="movie-list-page"
    >
      <div className={styles.header}>
        <div className={styles['header-top']}>
          <div className={styles.logo}>netflixroulette</div>
          <button
            className={styles['add-movie-btn']}
            data-cy="add-movie-btn"
            data-testid="add-movie-btn"
            onClick={handleAddMovie}
          >
            + ADD MOVIE
          </button>
        </div>
        <div className={styles['header-content']}>
          <Outlet />
        </div>
      </div>

      <div className={styles['filter-bar']}>
        <GenreSelect
          genres={GENRES}
          selectedGenre={activeGenre}
          onChange={handleGenreChange}
        />
        <SortControl value={sortCriterion} onChange={handleSortChange} />
      </div>

      <div className={styles['movie-grid']} data-testid="movie-grid">
        {loading ? (
          <div className={styles.loading} data-testid="loading">
            Loading...
          </div>
        ) : error ? (
          <div className={styles.error} data-testid="error-message">
            {error}
          </div>
        ) : movies.length === 0 ? (
          <div className={styles['no-movies']} data-testid="no-movies">
            No movies found
          </div>
        ) : (
          movies.map((movie) => (
            <MovieTile
              key={movie.id}
              id={movie.id}
              posterUrl={movie.posterUrl}
              title={movie.title}
              releaseYear={movie.releaseYear}
              genres={movie.genres}
              onClick={handleMovieClick}
              onDelete={handleDeleteMovie}
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.logo}>netflixroulette</div>
      </div>

      {dialogState.type && (
        <Dialog title={getDialogTitle()} onClose={handleCloseDialog}>
          {renderDialogContent()}
        </Dialog>
      )}
    </div>
  );
};
