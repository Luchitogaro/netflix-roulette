import React, { useState, KeyboardEvent, FC } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
}

export const SearchForm: FC<SearchFormProps> = ({
  initialQuery = '',
  onSearch,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const triggerSearch = () => onSearch(query.trim());

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') triggerSearch();
  };

  return (
    <div className="search-form">
      <input
        className="search-input"
        placeholder="What do you want to watch?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search movies"
      />
      <button className="search-button" onClick={triggerSearch}>
        SEARCH
      </button>
    </div>
  );
};