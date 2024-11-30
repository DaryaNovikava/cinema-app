import './FetchGenreMoviesList.css';
import React, { useEffect } from 'react';
import { Movie, MovieList } from '../../api/Movie';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import { useParams, Link } from 'react-router-dom';
import MoviesList from '../MoviesList/MoviesList';
import { useState } from 'react';
import { Button } from '../../ui/Button/Button';

export const FetchGenreMoviesList: React.FC = () => {
  const { genre } = useParams<{ genre: string | undefined }>();
  const [movies, setMovies] = useState<MovieList>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);

  const fetchMovies = async () => {
    if (!hasMoreMovies) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${API_URL}movie?genre=${genre}&count=10&page=${page}`,
      );
      const data = await response.json();

      if (data.length > 0) {
        setMovies((prevMovies) => {
          const newMovies = data.filter(
            (newMovie: Movie) =>
              !prevMovies.some((movie) => movie.id === newMovie.id),
          );
          return [...prevMovies, ...newMovies];
        });
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMoreMovies(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genre]);

  const visibleMovies = [...movies].sort((a, b) => b.tmdbRating - a.tmdbRating);

  return (
    <main className="container genre-movies">
      <Link to="/movie/genres">
        <h2 className="genre-movies__title">
          {genre && genre[0].toUpperCase() + genre.slice(1).toLowerCase()}
        </h2>
      </Link>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error fetching movies</div>
      ) : movies && movies.length > 0 ? (
        <div className="genre-movies__content">
          <MoviesList movies={visibleMovies} />
          {hasMoreMovies && (
            <Button
              type="button"
              kind="primary"
              onClick={fetchMovies}
              style={{ width: '218px', alignSelf: 'center' }}
            >
              Показать еще
            </Button>
          )}
        </div>
      ) : (
        <div className="genre-movies-empty">
          <p className="genre-movies-empty__title">Movies list is empty</p>
        </div>
      )}
    </main>
  );
};

export default FetchGenreMoviesList;
