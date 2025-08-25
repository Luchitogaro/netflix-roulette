import React, { useState } from 'react';
import {
  Counter,
  GenreSelect,
  MovieDetails,
  MovieTile,
  SearchForm,
  SortControl,
} from './components';
import { Movie } from './types';
import { mockMovies } from './test-utils/testData';
import logo from './logo.svg';
import './App.css';

const GENRES = {
  ALL: 'ALL',
  COMEDY: 'COMEDY',
  HORROR: 'HORROR',
  CRIME: 'CRIME',
  DOCUMENTARY: 'DOCUMENTARY',
};

interface Movie {
  id: string;
  posterUrl: string;
  title: string;
  releaseYear: number;
  rating: number;
  duration: string;
  description: string;
  genres: string[];
}

function App() {
  const [selected, setSelected] = useState(GENRES.ALL);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<'releaseDate' | 'title'>('releaseDate');
  const [lastAction, setLastAction] = useState<string>('');
    const [lastActionId, setLastActionId] = useState<string>('');

  const movies: Movie[] = mockMovies;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="app-logo" alt="logo" />
      </header>
      <main>
        <div className="counter-container" data-cy="counter">
          <Counter initialValue={5} />
        </div>

        <div className="search-container">
          <SearchForm
            data-cy-search-input
            data-cy-search-btn
            initialQuery="Avengers"
            onSearch={console.log}
          />
        </div>

        <div
          className="controls-row"
          data-cy="controls-row"
        >
          <div className="genre-select-container" data-cy="genre-select">
            <GenreSelect
              genres={Object.keys(GENRES)}
              selectedGenre={selected}
              onChange={setSelected}
            />
          </div>
          <SortControl
            value={sortBy}
            onChange={setSortBy}
            data-cy="sort-control"
          />
        </div>

        <div className="movies-grid" data-cy="movies-grid">
          {movies.map((movie) => (
            <MovieTile
              key={movie.id}
              data-cy={`movie-tile-${movie.id}`}
              id={movie.id}
              posterUrl={movie.posterUrl}
              title={movie.title}
              releaseYear={movie.releaseYear}
              genres={movie.genres}
              onClick={(movieId) => {
                const selectedMovie = movies.find(m => m.id === movieId);
                if (selectedMovie) {
                  setSelectedMovie(selectedMovie);
                }
              }}
              onEdit={(movieId) => {
                setLastAction('edit');
                setLastActionId(movieId);
              }}
              onDelete={(movieId) => {
                setLastAction('delete');
                setLastActionId(movieId);
              }}
            />
          ))}
        </div>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
        
        {/* Test helper - shows last action for Cypress tests */}
        <div data-cy="last-action" style={{ display: 'none' }}>
          {lastAction && `Last action: ${lastAction} for movie ${lastActionId}`}
        </div>
      </main>
    </div>
  );
}

export default App;
