import { useState } from 'react';

import css from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import SearchBar from '../SearchBar/SearchBar';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    setMovies([]);
    try {
      const movies = await fetchMovies(query);
      setMovies(movies);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Anyway, Ok');
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
    </div>
  );
}

export default App;
