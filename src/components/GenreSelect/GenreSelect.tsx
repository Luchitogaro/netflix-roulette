import React from "react";
import "./GenreSelect.css";

export interface GenreSelectProps {
  genres: string[]; // ["ALL", "COMEDY", …]
  selectedGenre: string; // current highlight
  onSelect: (genre: string) => void;
}

export const GenreSelect: React.FC<GenreSelectProps> = ({
  genres,
  selectedGenre,
  onSelect,
}) => {
  return (
    <nav className="genre-select">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          className={`genre-btn ${genre === selectedGenre ? "active" : ""}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </nav>
  );
};
