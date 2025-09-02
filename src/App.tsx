import React, { useState } from 'react';
import {
  Counter,
  Dialog,
  GenreSelect,
  MovieDetails,
  MovieTile,
  SearchForm,
  SortControl,
  MovieForm,
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

function App() {
  const [selected, setSelected] = useState(GENRES.ALL);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<'releaseDate' | 'title'>('releaseDate');
  const [lastAction, setLastAction] = useState<string>('');
  const [lastActionId, setLastActionId] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [actionMovie, setActionMovie] = useState<Movie | null>(null);
  const [actionType, setActionType] = useState<'edit' | 'delete' | null>(null);

  const movies: Movie[] = mockMovies;

  const handleMovieAction = (movieId: string, actionType: 'edit' | 'delete') => {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
      setActionMovie(movie);
      setActionType(actionType);
      setDialogOpen(true);
      setLastAction(actionType);
      setLastActionId(movieId);
    }
  };

  const handleEditMovie = (movieId: string) => handleMovieAction(movieId, 'edit');
  const handleDeleteMovie = (movieId: string) => handleMovieAction(movieId, 'delete');

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setActionMovie(null);
    setActionType(null);
  };

  const handleMovieActionConfirm = () => {
    if (actionMovie) {
      setLastAction(actionType || '');
      setLastActionId(actionMovie.id);
    }
    handleCloseDialog();
  };

  const handleEditSubmit = (editedMovie: any) => handleMovieActionConfirm();
  const handleConfirmDelete = () => handleMovieActionConfirm();

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

        <div className="controls-row" data-cy="controls-row">
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
          <button
            onClick={() => setShowMovieForm(true)}
            className="add-movie-btn"
            data-cy="add-movie-btn"
          >
            Add Movie
          </button>
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
              onEdit={handleEditMovie}
              onDelete={handleDeleteMovie}
            />
          ))}
        </div>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
        
        <div data-cy="last-action" className="test-helper">
          {lastAction && `Last action: ${lastAction} for movie ${lastActionId}`}
        </div>

        {dialogOpen && actionMovie && (
          <Dialog
            title={`${actionType === 'edit' ? 'Edit' : 'Delete'} Movie`}
            onClose={handleCloseDialog}
          >
            {actionType === 'edit' ? (
              <div>
                <p>Edit movie: <strong>{actionMovie.title}</strong></p>
                <MovieForm
                  initialMovie={{
                    id: actionMovie.id,
                    title: actionMovie.title,
                    releaseDate: actionMovie.releaseYear.toString(),
                    movieUrl: actionMovie.posterUrl,
                    rating: actionMovie.rating || 0,
                    genre: actionMovie.genres[0] || 'COMEDY',
                    runtime: actionMovie.duration || '2h 0min',
                    overview: actionMovie.description || '',
                  }}
                  onSubmit={handleEditSubmit}
                />
              </div>
            ) : (
              <div>
                <p>Are you sure you want to delete <strong>{actionMovie.title}</strong>?</p>
                <p>This action cannot be undone.</p>
                <div className="dialog-actions">
                  <button 
                    onClick={handleCloseDialog}
                    className="dialog-cancel-btn"
                    data-cy="dialog-cancel-button"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmDelete}
                    className="dialog-delete-btn"
                    data-cy="dialog-confirm-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </Dialog>
        )}

        {showMovieForm && (
          <Dialog
            title="Add New Movie"
            onClose={() => setShowMovieForm(false)}
          >
            <MovieForm
              onSubmit={(newMovie) => {
                setShowMovieForm(false);
              }}
            />
          </Dialog>
        )}
      </main>
    </div>
  );
}

export default App;
