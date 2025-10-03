import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '../Dialog';
import { MovieForm } from '../MovieForm';

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

export const EditMovieForm: React.FC = () => {
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const movieData = await response.json();

        const formData: MovieFormData = {
          id: movieData.id.toString(),
          title: movieData.title,
          releaseDate: movieData.release_date,
          movieUrl: movieData.poster_path,
          rating: movieData.vote_average,
          genre: movieData.genres?.[0] || 'COMEDY',
          runtime: movieData.runtime ? `${movieData.runtime} min` : '',
          overview: movieData.overview || '',
        };

        setMovie(formData);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handleClose = () => {
    if (movieId) {
      navigate(`/${movieId}`);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async (movieData: MovieFormData) => {
    if (!movieId) return;

    try {
      const apiData = {
        id: parseInt(movieId),
        title: movieData.title,
        release_date: movieData.releaseDate,
        poster_path: movieData.movieUrl,
        vote_average: movieData.rating,
        genres: [movieData.genre],
        runtime: parseInt(movieData.runtime.replace(/\D/g, '')) || 0,
        overview: movieData.overview,
      };

      const response = await fetch(`http://localhost:4000/movies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      navigate(`/${result.id}`);
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  if (loading) {
    return (
      <Dialog title="EDIT MOVIE" onClose={handleClose}>
        <div>Loading movie details...</div>
      </Dialog>
    );
  }

  if (error || !movie) {
    return (
      <Dialog title="EDIT MOVIE" onClose={handleClose}>
        <div>Error: {error || 'Movie not found'}</div>
      </Dialog>
    );
  }

  return (
    <Dialog title="EDIT MOVIE" onClose={handleClose}>
      <MovieForm initialMovie={movie} onSubmit={handleSubmit} />
    </Dialog>
  );
};
