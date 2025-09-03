import { Movie } from '../types';

// Single movie for basic testing
export const mockMovie: Movie = {
  id: '1',
  posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
  title: 'Bohemian Rhapsody',
  releaseYear: 2018,
  rating: 8.5,
  duration: '2h 35min',
  description: 'A biographical drama about the legendary British rock band Queen and their lead vocalist Freddie Mercury.',
  genres: ['Drama', 'Biography', 'Music'],
};

// Basic movie for MovieTile testing (without optional fields)
export const mockBasicMovie = {
  id: '1',
  posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
  title: 'Bohemian Rhapsody',
  releaseYear: 2018,
  genres: ['Drama', 'Biography', 'Music'],
};

// Movie for MovieDetails testing
export const mockDetailedMovie: Movie = {
  id: '1',
  posterUrl: 'https://example.com/poster.jpg',
  title: 'Pulp Fiction',
  releaseYear: 1994,
  rating: 8.9,
  duration: '2h 34min',
  description: 'A classic crime film directed by Quentin Tarantino.',
  genres: ['Crime', 'Drama'],
};

// Array of movies for testing multiple items
export const mockMovies: Movie[] = [
  {
    id: '1',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
    title: 'Bohemian Rhapsody',
    releaseYear: 2018,
    rating: 8.5,
    duration: '2h 35min',
    description: 'A biographical drama about the legendary British rock band Queen and their lead vocalist Freddie Mercury.',
    genres: ['Drama', 'Biography', 'Music'],
  },
  {
    id: '2',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
    title: 'The Shawshank Redemption',
    releaseYear: 1994,
    rating: 9.3,
    duration: '2h 22min',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    genres: ['Drama', 'Crime'],
  },
  {
    id: '3',
    posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
    title: 'Inception',
    releaseYear: 2010,
    rating: 8.8,
    duration: '2h 28min',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
  },
];

// Movie for Cypress tests
export const cypressTestMovie: Movie = {
  id: '1',
  posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
  title: 'Bohemian Rhapsody',
  releaseYear: 2018,
  rating: 8.5,
  duration: '2h 35min',
  description: 'A biographical drama about the legendary British rock band Queen and their lead vocalist Freddie Mercury.',
  genres: ['Drama', 'Biography', 'Music'],
};

// Basic movie for Cypress tests
export const cypressBasicTestMovie = {
  id: '1',
  posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
  title: 'Bohemian Rhapsody',
  releaseYear: 2018,
  genres: ['Drama', 'Biography', 'Music'],
};

// Genres for testing
export const mockGenres = ['ALL', 'COMEDY', 'HORROR', 'CRIME', 'DOCUMENTARY', 'DRAMA', 'ACTION', 'ADVENTURE', 'SCI-FI', 'BIOGRAPHY', 'MUSIC'];

// Search queries for testing
export const mockSearchQueries = ['Avengers', 'Batman', 'Spider-Man', 'Iron Man', 'Black Panther'];

// Sort options for testing
export const mockSortOptions = ['releaseDate', 'title', 'rating', 'duration'] as const;
