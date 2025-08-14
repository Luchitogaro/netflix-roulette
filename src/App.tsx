import React, { useState } from 'react';
import { Counter, GenreSelect, SearchForm } from './components';
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

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="app-logo"
          alt="logo"
        />
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

        <div className="genre-select-container" data-cy="genre-select">
          <GenreSelect
            genres={Object.keys(GENRES)}
            selectedGenre={selected}
            onChange={setSelected}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
