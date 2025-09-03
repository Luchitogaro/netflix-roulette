import React from 'react';
import styles from './MovieDetails.module.css';
import { Movie } from '../../types';

interface MovieDetailsProps {
  movie: Movie;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div
      className={styles['movie-details']}
      data-cy="movie-details"
      data-testid="movie-details"
    >
      <img
        className={styles.poster}
        src={movie.posterUrl}
        alt={movie.title}
        data-cy="movie-poster"
        data-testid="movie-poster"
      />
      <div
        className={styles.details}
        data-cy="movie-details-info"
        data-testid="movie-details-info"
      >
        <div className={styles.header} data-testid="movie-header">
          <h1
            className={styles.title}
            data-cy="movie-title"
            data-testid="movie-title"
          >
            {movie.title}
          </h1>
          {movie.rating && (
            <span
              className={styles['rating-badge']}
              data-cy="movie-rating"
              data-testid="movie-rating"
            >
              {movie.rating}
            </span>
          )}
        </div>
        {movie.genres && (
          <div
            className={styles.genres}
            data-cy="movie-genres"
            data-testid="movie-genres"
          >
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className={styles['genre-tag']}
                data-testid={`movie-genre-${genre}`}
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        <div className={styles.meta} data-testid="movie-meta">
          <span
            className={styles.year}
            data-cy="movie-year"
            data-testid="movie-year"
          >
            {movie.releaseYear}
          </span>
          <span
            className={styles.duration}
            data-cy="movie-duration"
            data-testid="movie-duration"
          >
            {movie.duration}
          </span>
        </div>
        <p
          className={styles.description}
          data-cy="movie-description"
          data-testid="movie-description"
        >
          {movie.description}
        </p>
      </div>
    </div>
  );
};
