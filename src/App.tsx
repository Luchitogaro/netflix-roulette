import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { SearchForm } from "./components";

function App() {
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
        <SearchForm initialQuery="Avengers" onSearch={console.log} />
      </main>
    </div>
  );
}

export default App;
