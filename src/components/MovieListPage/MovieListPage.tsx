import React, { useState, useEffect, useCallback } from 'react';
import { SearchForm } from '../SearchForm';
import { GenreSelect } from '../GenreSelect';
import { SortControl } from '../SortControl';
import { MovieTile } from '../MovieTile';
import { MovieDetails } from '../MovieDetails';
import { Movie } from '../../types';
import styles from './MovieListPage.module.css';

const GENRES = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'];

export const MovieListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriterion, setSortCriterion] = useState<'releaseDate' | 'title'>('releaseDate');
  const [activeGenre, setActiveGenre] = useState('ALL');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(async (query: string, genre: string, sortBy: 'releaseDate' | 'title') => {
    setLoading(true);
    
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (genre !== 'ALL') params.append('filter', genre);
    params.append('sortBy', sortBy);
    params.append('sortOrder', 'desc');

    const url = `http://localhost:4000/movies?${params.toString()}`;
    
    const response = await fetch(url);
    const data = await response.json();
    const apiMovies = data.data || [];
    
    const transformedMovies: Movie[] = apiMovies.map((movie: any) => ({
      id: movie.id.toString(),
      posterUrl: movie.poster_path || 'https://via.placeholder.com/300x450/000000/FFFFFF?text=No+Image',
      title: movie.title,
      releaseYear: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average,
      duration: movie.runtime ? `${movie.runtime} min` : undefined,
      description: movie.overview,
      genres: movie.genres || []
    }));
    
    setMovies(transformedMovies);
    setLoading(false);
  }, []);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedMovie(null);
  };

  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre);
    setSelectedMovie(null);
  };

  const handleSortChange = (sortBy: 'releaseDate' | 'title') => {
    setSortCriterion(sortBy);
  };

  const handleMovieClick = (movieId: string) => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      setSelectedMovie(movie);
    }
  };

  const handleBackToList = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return (
      <div className={styles.container} data-cy="movie-list-page" data-testid="movie-list-page">
        <div className={styles.header}>
          <div className={styles['header-top']}>
            <div className={styles.logo}>netflixroulette</div>
            <button 
              className={styles['add-movie-btn']}
              data-cy="add-movie-btn"
              data-testid="add-movie-btn"
            >
              + ADD MOVIE
            </button>
          </div>
          <div className={styles['header-content']}>
            <MovieDetails movie={selectedMovie} />
          </div>
        </div>
        <div className={styles['filter-bar']}>
          <button 
            className={styles['back-btn']}
            onClick={handleBackToList}
            data-cy="back-btn"
            data-testid="back-btn"
          >
            ← Back to search
          </button>
          <SortControl 
            value={sortCriterion}
            onChange={handleSortChange}
          />
        </div>

        <div className={styles['movie-grid']} data-testid="movie-grid">
          {loading ? (
            <div className={styles.loading} data-testid="loading">Loading...</div>
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
              />
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.logo}>netflixroulette</div>
        </div>

      </div>
    );
  }

  return (
    <div className={styles.container} data-cy="movie-list-page" data-testid="movie-list-page">
      <div className={styles.header}>
        <div className={styles['header-top']}>
          <div className={styles.logo}>netflixroulette</div>
          <button 
            className={styles['add-movie-btn']}
            data-cy="add-movie-btn"
            data-testid="add-movie-btn"
          >
            + ADD MOVIE
          </button>
        </div>
        <div className={styles['header-content']}>
          <div className={styles['main-title']}>FIND YOUR MOVIE</div>
          <div className={styles['search-container']}>
            <SearchForm 
              initialQuery={searchQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className={styles['filter-bar']}>
        <GenreSelect 
          genres={GENRES}
          selectedGenre={activeGenre}
          onChange={handleGenreChange}
        />
        <SortControl 
          value={sortCriterion}
          onChange={handleSortChange}
        />
      </div>

      <div className={styles['movie-grid']} data-testid="movie-grid">
        {loading ? (
          <div className={styles.loading} data-testid="loading">Loading...</div>
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
            />
          ))
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.logo}>netflixroulette</div>
      </div>

    </div>
  );
};
