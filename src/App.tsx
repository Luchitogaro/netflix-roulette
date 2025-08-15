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
        <div className="counter-container">
          <Counter initialValue={5} />
        </div>

        <div className="search-container">
          <SearchForm initialQuery="Avengers" onSearch={console.log} />
        </div>

        <div className="genre-select-container">
          <GenreSelect
            genres={Object.keys(GENRES)}
            selectedGenre={selected}
            onSelect={setSelected}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
