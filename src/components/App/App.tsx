import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { notify, toastOptions } from '../../helpers/hot-toast';

import css from './App.module.css';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    try {
      const movies = await fetchMovies(query);
      if (!movies.length) {
        notify('No movies found for your request.');
        return;
      }
      setMovies(movies);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster toastOptions={toastOptions} />
      {isError ? <ErrorMessage /> : <MovieGrid movies={movies} />}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
