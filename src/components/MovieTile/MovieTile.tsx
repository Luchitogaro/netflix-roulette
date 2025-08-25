import React, { useState } from 'react';
import styles from './MovieTile.module.css';

export interface Movie {
  id: string;
  posterUrl: string;
  title: string;
  releaseYear: number;
  genres: string[];
}

export interface MovieTileProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  onEdit?: (movie: Movie) => void;
  onDelete?: (movie: Movie) => void;
}

export const MovieTile: React.FC<MovieTileProps> = ({
  movie,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={styles.tile}
      data-cy={`movie-tile-${movie.id}`}
      onClick={() => onClick?.(movie)}
    >
      <img className={styles.poster} src={movie.posterUrl} alt={movie.title} />

      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        <span className={styles.year}>{movie.releaseYear}</span>
      </div>

      <p className={styles.genres}>{movie.genres.join(', ')}</p>

      {(onEdit || onDelete) && (
        <button
          className={styles.menuBtn}
          data-cy={`menu-${movie.id}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          data-testid="menu-toggle"
        >
          ⋮
        </button>
      )}

      {menuOpen && (
        <ul className={styles.popup} data-testid="popup">
          <li
            data-testid="edit-btn"
            data-cy={`edit-${movie.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(movie);
            }}
          >
            Edit
          </li>
          <li
            data-testid="delete-btn"
            data-cy={`delete-${movie.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(movie);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};
