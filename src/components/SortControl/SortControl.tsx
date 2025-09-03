import React from 'react';
import styles from './SortControl.module.css';

interface SortControlProps {
  value: 'releaseDate' | 'title';
  onChange: (newValue: 'releaseDate' | 'title') => void;
}

export const SortControl: React.FC<SortControlProps> = ({
  value,
  onChange,
}) => (
  <div
    className={styles['sort-control']}
    data-cy="sort-control"
    data-testid="sort-control"
  >
    <span
      className={styles.label}
      data-cy="sort-label"
      data-testid="sort-label"
    >
      SORT BY
    </span>
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value as 'releaseDate' | 'title')}
      data-cy="sort-select"
      data-testid="sort-select"
    >
      <option
        value="releaseDate"
        data-cy="sort-option-releaseDate"
        data-testid="sort-option-releaseDate"
      >
        RELEASE DATE
      </option>
      <option
        value="title"
        data-cy="sort-option-title"
        data-testid="sort-option-title"
      >
        TITLE
      </option>
    </select>
  </div>
);
