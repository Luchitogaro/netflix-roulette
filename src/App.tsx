import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MovieListPage, SearchFormWrapper, MovieDetailsWrapper } from './components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MovieListPage />}>
            <Route index element={<SearchFormWrapper />} />
            <Route path=":movieId" element={<MovieDetailsWrapper />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
