import React from "react";
import "./GenreSelect.css";

export interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onChange: (genre: string) => void;
}

export const GenreSelect: React.FC<GenreSelectProps> = ({
  genres,
  selectedGenre,
  onChange,
}) => {
  return (
    <div className="genre-select">
      {genres.map((genre) => (
        <button
          key={genre}
          type="button"
          data-cy={`genre-${genre}`}
          className={`genre-btn ${genre === selectedGenre ? "active" : ""}`}
          onClick={() => onChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );

};
