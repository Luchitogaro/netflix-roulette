import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { MovieDetails } from '../MovieDetails';
import { Movie } from '../../types';
import styles from '../MovieListPage/MovieListPage.module.css';

export const MovieDetailsWrapper: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const transformedMovie: Movie = {
          id: data.id.toString(),
          posterUrl:
            data.poster_path ||
            'https://via.placeholder.com/300x450/000000/FFFFFF?text=No+Image',
          title: data.title,
          releaseYear: new Date(data.release_date).getFullYear(),
          rating: data.vote_average,
          duration: data.runtime ? `${data.runtime} min` : undefined,
          description: data.overview,
          genres: data.genres || [],
        };

        setMovie(transformedMovie);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(
          'Sorry, we could not load the movie details. Please try again later.'
        );
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleBackToList = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return (
      <div className={styles.error} data-testid="error-message">
        {error}
        <br />
        <button
          className={styles['back-btn']}
          onClick={handleBackToList}
          data-cy="back-btn"
          data-testid="back-btn"
        >
          ← Back to search
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        Movie not found
        <br />
        <button
          className={styles['back-btn']}
          onClick={handleBackToList}
          data-cy="back-btn"
          data-testid="back-btn"
        >
          ← Back to search
        </button>
      </div>
    );
  }

  return (
    <>
      <MovieDetails movie={movie} />
      <button
        className={styles['back-btn']}
        onClick={handleBackToList}
        data-cy="back-btn"
        data-testid="back-btn"
      >
        ← Back to search
      </button>
    </>
  );
};
