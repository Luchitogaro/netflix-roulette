import React, { useState, FC } from "react";
import "./SearchForm.css";

interface SearchFormProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export const SearchForm: FC<SearchFormProps> = ({
  initialQuery = "",
  onSearch,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const triggerSearch = () => onSearch(query.trim());

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') triggerSearch();
  };

  return (
    <div className="search-form">
      <input
        className="search-input"
        placeholder="What do you want to watch?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search movies"
        data-cy="search-input"
      />
      <button
        className="search-button"
        data-cy="search-btn"
        onClick={triggerSearch}
        onKeyDown={handleKeyDown}
      >
        SEARCH
      </button>
    </div>
  );

};
