import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { notify, toastOptions } from '../../helpers/hot-toast';

import css from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearch = async (query: string) => {
    setMovies([]);
    try {
      const movies = await fetchMovies(query);
      if (!movies.length) {
        notify('No movies found for your request.');
        return;
      }

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
      <Toaster toastOptions={toastOptions} />
      <MovieGrid movies={movies} />
    </div>
  );
}

export default App;
