import React from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { SearchForm } from '../SearchForm';
import styles from '../MovieListPage/MovieListPage.module.css';

export const SearchFormWrapper: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const handleSearch = (query: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (query) {
      newSearchParams.set('query', query);
    } else {
      newSearchParams.delete('query');
    }
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <div className={styles['main-title']}>FIND YOUR MOVIE</div>
      <div className={styles['search-container']}>
        <SearchForm initialQuery={searchQuery} onSearch={handleSearch} />
      </div>
      <Outlet />
    </>
  );
};
