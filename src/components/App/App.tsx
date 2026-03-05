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
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
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

  const openModal = () => {
    setIsModalOpen(true);
    return;
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
    return;
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster toastOptions={toastOptions} />
      {isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={handleSelect} movies={movies} />
      )}
      {isLoading && <Loader />}
      {isModalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default App;
