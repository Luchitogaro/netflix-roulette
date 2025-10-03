import React, { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

export const AddMovieForm: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  const handleSubmit = async (movieData: MovieFormData) => {
    try {
      const apiData = {
        title: movieData.title,
        release_date: movieData.releaseDate,
        poster_path: movieData.movieUrl,
        vote_average: movieData.rating,
        genres: [movieData.genre],
        runtime: parseInt(movieData.runtime.replace(/\D/g, '')) || 0,
        overview: movieData.overview,
      };

      const response = await fetch('http://localhost:4000/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      navigate(`/${result.id}?${searchParams.toString()}`);
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <Dialog title="ADD MOVIE" onClose={handleClose}>
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
};
