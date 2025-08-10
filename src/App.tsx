import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GenreSelect, SearchForm } from "./components";

const genres = ["ALL", "COMEDY", "HORROR", "CRIME", "DOCUMENTARY"];

function App() {
  const [selected, setSelected] = useState("ALL");

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          width={"200px"}
          height={"200px"}
        />
      </header>
      <main>

        <div className="search-container">
          <SearchForm initialQuery="Avengers" onSearch={console.log} />
        </div>

        <div className="genre-select-container">
          <GenreSelect
            genres={genres}
            selectedGenre={selected}
            onSelect={setSelected}
          />
        </div>

      </main>
    </div>
  );
}

export default App;
