import React, { useState } from 'react';
import {
  Counter,
  GenreSelect,
  MovieDetails,
  MovieTile,
  SearchForm,
  SortControl,
} from './components';
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

  const movie: Movie = {
    id: '1',
    posterUrl:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lHu1wtNaczFPGFDTrjCSzeLPTKN.jpg',
    title: 'Bohemian Rhapsody',
    releaseYear: 2018,
    rating: 8.5,
    duration: '2h 35min',
    description: 'A biographical drama...',
    genres: ['Drama', 'Biography', 'Music'],
  };

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

        <MovieTile
          data-cy={`movie-tile-${movie.id}`}
          movie={movie}
          onClick={() => setSelectedMovie(movie)}
          onEdit={() => console.log('Edit', movie.title)}
          onDelete={() => console.log('Delete', movie.title)}
        />
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
      </main>
    </div>
  );
}

export default App;
