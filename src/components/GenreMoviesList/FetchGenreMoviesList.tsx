import './FetchGenreMoviesList.css';
import React, { useEffect } from 'react';
import { Movie, MovieList } from '../../api/Movie';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import { useParams, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import MoviesList from '../MoviesList/MoviesList';
import { useState } from 'react';

export const FetchGenreMoviesList: React.FC = () => {
  const { genre } = useParams<{ genre: string | undefined }>();
  const [movies, setMovies] = useState<MovieList>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);

  const fetchMovies = async () => {
    if (!hasMoreMovies || isPaginating) return;

    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsPaginating(true);
    }

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
      setIsPaginating(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [genre]);

  const sortedMoviesOnFirstPage =
    page === 1
      ? [...movies].sort((a, b) => b.tmdbRating - a.tmdbRating)
      : movies;

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
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMovies}
          hasMore={hasMoreMovies}
          loader={<Loader />}
          scrollThreshold={0.7}
          style={{ overflow: 'visible' }}
          endMessage={
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              You have seen all movies.
            </p>
          }
        >
          <MoviesList movies={sortedMoviesOnFirstPage} />
        </InfiniteScroll>
      ) : (
        <div className="genre-movies-empty">
          <p className="genre-movies-empty__title">Movies list is empty</p>
        </div>
      )}
    </main>
  );
};

export default FetchGenreMoviesList;
