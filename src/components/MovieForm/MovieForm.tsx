import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './MovieForm.module.css';

const GENRES = ['COMEDY', 'HORROR', 'CRIME', 'DOCUMENTARY'] as const;

const defaultFormValues = {
  title: '',
  releaseDate: '',
  movieUrl: '',
  rating: 0,
  genre: '',
  runtime: '',
  overview: '',
};

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

export const MovieForm: React.FC<MovieFormProps> = ({
  initialMovie,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues: initialMovie || defaultFormValues,
  });

  const onFormSubmit = (data: MovieFormData) => {
    const movie: MovieFormData = {
      id: initialMovie?.id,
      ...data,
      rating:
        typeof data.rating === 'string' ? parseFloat(data.rating) : data.rating,
    };
    onSubmit(movie);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onFormSubmit)}
      data-cy="movie-form"
      data-testid="movie-form"
    >
      <div className={styles['form-group']}>
        <label htmlFor="title" className={styles.label}>
          TITLE
        </label>
        <input
          type="text"
          id="title"
          className={styles.input}
          data-cy="movie-form-title"
          data-testid="movie-form-title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <span className={styles.error}>{errors.title.message}</span>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="releaseDate" className={styles.label}>
          RELEASE DATE
        </label>
        <div className={styles['input-wrapper']}>
          <input
            type="date"
            id="releaseDate"
            className={styles.input}
            data-cy="movie-form-release-date"
            data-testid="movie-form-release-date"
            {...register('releaseDate', {
              required: 'Release date is required',
            })}
          />
          <span className={styles['calendar-icon']}>📅</span>
        </div>
        {errors.releaseDate && (
          <span className={styles.error}>{errors.releaseDate.message}</span>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="movieUrl" className={styles.label}>
          MOVIE URL
        </label>
        <input
          type="url"
          id="movieUrl"
          className={styles.input}
          placeholder="https://www.example.com"
          data-cy="movie-form-movie-url"
          data-testid="movie-form-movie-url"
          {...register('movieUrl', {
            required: 'Movie URL is required',
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Please enter a valid URL',
            },
          })}
        />
        {errors.movieUrl && (
          <span className={styles.error}>{errors.movieUrl.message}</span>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="rating" className={styles.label}>
          RATING
        </label>
        <input
          type="number"
          id="rating"
          className={styles.input}
          min="0"
          max="10"
          step="0.1"
          data-cy="movie-form-rating"
          data-testid="movie-form-rating"
          {...register('rating', {
            required: 'Rating is required',
            min: { value: 0, message: 'Rating must be at least 0' },
            max: { value: 10, message: 'Rating must be at most 10' },
          })}
        />
        {errors.rating && (
          <span className={styles.error}>{errors.rating.message}</span>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="genre" className={styles.label}>
          GENRE
        </label>
        <select
          id="genre"
          className={styles.select}
          data-cy="movie-form-genre"
          data-testid="movie-form-genre"
          {...register('genre', { required: 'Genre is required' })}
        >
          <option value="">Select Genre</option>
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {errors.genre && (
          <span className={styles.error}>{errors.genre.message}</span>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="runtime" className={styles.label}>
          RUNTIME
        </label>
        <input
          type="text"
          id="runtime"
          className={styles.input}
          placeholder="e.g., 1h 47min"
          data-cy="movie-form-runtime"
          data-testid="movie-form-runtime"
          {...register('runtime', { required: 'Runtime is required' })}
        />
        {errors.runtime && (
          <span className={styles.error}>{errors.runtime.message}</span>
        )}
      </div>

      <div className={styles['form-group']}>
        <label htmlFor="overview" className={styles.label}>
          OVERVIEW
        </label>
        <textarea
          id="overview"
          className={styles.textarea}
          rows={4}
          data-cy="movie-form-overview"
          data-testid="movie-form-overview"
          {...register('overview', { required: 'Overview is required' })}
        />
        {errors.overview && (
          <span className={styles.error}>{errors.overview.message}</span>
        )}
      </div>

      <div className={styles['form-actions']}>
        <button
          type="button"
          onClick={handleReset}
          className={styles['reset-button']}
          data-cy="movie-form-reset"
          data-testid="movie-form-reset"
        >
          RESET
        </button>
        <button
          type="submit"
          className={styles['submit-button']}
          data-cy="movie-form-submit"
          data-testid="movie-form-submit"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
};
