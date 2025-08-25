export interface Movie {
  id: string;
  posterUrl: string;
  title: string;
  releaseYear: number;
  rating?: number;
  duration?: string;
  description?: string;
  genres: string[];
}

// Type for basic movie display (used in MovieTile)
export type BasicMovie = Pick<Movie, 'id' | 'posterUrl' | 'title' | 'releaseYear' | 'genres'>;

// Type for detailed movie display (used in MovieDetails)
export type DetailedMovie = Required<Movie>;
