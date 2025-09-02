import React from 'react';
import styles from './MovieForm.module.css';

const GENRES = ['COMEDY', 'HORROR', 'CRIME', 'DOCUMENTARY'] as const;

interface MovieFormData {
  id?: string;
  title: string;
  releaseDate: string;
  movieUrl: string;
  rating: number;
  genre: string;
  runtime: string;
  overview: string;
}

interface MovieFormProps {
  initialMovie?: MovieFormData;
  onSubmit: (movie: MovieFormData) => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const movieData = Object.fromEntries(formData) as any;
    
    const movie: MovieFormData = {
      id: initialMovie?.id,
      title: movieData.title as string,
      releaseDate: movieData.releaseDate as string,
      movieUrl: movieData.movieUrl as string,
      rating: parseFloat(movieData.rating as string),
      genre: movieData.genre as string,
      runtime: movieData.runtime as string,
      overview: movieData.overview as string,
    };
    
    onSubmit(movie);
  };

  const handleReset = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    if (form) {
      form.reset();
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-cy="movie-form" data-testid="movie-form">
      <div className={styles['form-group']}>
        <label htmlFor="title" className={styles.label}>
          TITLE
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialMovie?.title || ''}
          className={styles.input}
          required
          data-cy="movie-form-title"
          data-testid="movie-form-title"
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="releaseDate" className={styles.label}>
          RELEASE DATE
        </label>
        <div className={styles['input-wrapper']}>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            defaultValue={initialMovie?.releaseDate || ''}
            className={styles.input}
            required
            data-cy="movie-form-release-date"
            data-testid="movie-form-release-date"
          />
          <span className={styles['calendar-icon']}>📅</span>
        </div>
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="movieUrl" className={styles.label}>
          MOVIE URL
        </label>
        <input
          type="url"
          id="movieUrl"
          name="movieUrl"
          defaultValue={initialMovie?.movieUrl || ''}
          className={styles.input}
          placeholder="https://www.example.com"
          required
          data-cy="movie-form-movie-url"
          data-testid="movie-form-movie-url"
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="rating" className={styles.label}>
          RATING
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          defaultValue={initialMovie?.rating || ''}
          className={styles.input}
          min="0"
          max="10"
          step="0.1"
          required
          data-cy="movie-form-rating"
          data-testid="movie-form-rating"
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="genre" className={styles.label}>
          GENRE
        </label>
        <select
          id="genre"
          name="genre"
          defaultValue={initialMovie?.genre || ''}
          className={styles.select}
          required
          data-cy="movie-form-genre"
          data-testid="movie-form-genre"
        >
          <option value="">Select Genre</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="runtime" className={styles.label}>
          RUNTIME
        </label>
        <input
          type="text"
          id="runtime"
          name="runtime"
          defaultValue={initialMovie?.runtime || ''}
          className={styles.input}
          placeholder="e.g., 1h 47min"
          required
          data-cy="movie-form-runtime"
          data-testid="movie-form-runtime"
        />
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="overview" className={styles.label}>
          OVERVIEW
        </label>
        <textarea
          id="overview"
          name="overview"
          defaultValue={initialMovie?.overview || ''}
          className={styles.textarea}
          rows={4}
          required
          data-cy="movie-form-overview"
          data-testid="movie-form-overview"
        />
      </div>

      <div className={styles['form-actions']}>
        <button type="button" onClick={handleReset} className={styles['reset-button']} data-cy="movie-form-reset" data-testid="movie-form-reset">
          RESET
        </button>
        <button type="submit" className={styles['submit-button']} data-cy="movie-form-submit" data-testid="movie-form-submit">
          {initialMovie ? 'SUBMIT' : 'SUBMIT'}
        </button>
      </div>
    </form>
  );
};
