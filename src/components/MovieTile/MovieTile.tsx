import React, { useState } from 'react';
import styles from './MovieTile.module.css';

export interface MovieTileProps {
  id: string;
  posterUrl: string;
  title: string;
  releaseYear: number;
  genres: string[];
  onClick?: (movieId: string) => void;
  onEdit?: (movieId: string) => void;
  onDelete?: (movieId: string) => void;
}

export const MovieTile: React.FC<MovieTileProps> = ({
  id,
  posterUrl,
  title,
  releaseYear,
  genres,
  onClick,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={styles.tile}
      data-cy={`movie-tile-${id}`}
      onClick={() => onClick?.(id)}
    >
      <img className={styles.poster} src={posterUrl} alt={title} />

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.year}>{releaseYear}</span>
      </div>

      <p className={styles.genres}>{genres.join(', ')}</p>

      {(onEdit || onDelete) && (
        <button
          className={styles['menu-btn']}
          data-cy={`menu-${id}`}
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
            data-cy={`edit-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(id);
              setMenuOpen(false);
            }}
          >
            Edit
          </li>
          <li
            data-testid="delete-btn"
            data-cy={`delete-${id}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
              setMenuOpen(false);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};
