import './FetchGenreMoviesList.css';
import { MovieList, MovieListSchema, useMoviesData } from "../../api/Movie";
import { API_URL } from "../../api/Movie";
import Loader from "../../ui/Loader/Loader";
import { useParams, Link } from 'react-router-dom';
import MoviesList from '../MoviesList/MoviesList';
import { useState } from 'react';
import { Button } from '../../ui/Button/Button';

export const FetchGenreMoviesList: React.FC = () => {
  const { data: allMovies, isLoading, isError } = useMoviesData<MovieList>(API_URL + 'movie/', MovieListSchema);
  const { genre } = useParams<{ genre: string | undefined }>();
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(10);

  const movies = allMovies?.filter((movie) =>
    genre?  movie.genres.includes(genre) : false
  ) || [];

  const loadMoreMovies = () => {
    setVisibleMoviesCount(movies.length);
  }

  const visibleMovies = movies.sort((a, b) => b.tmdbRating - a.tmdbRating)
    .slice(0, visibleMoviesCount);

  console.log(movies)
  return (
    <main className="container genre-movies">
      <Link to='/movie/genres'>
        <h2 className='genre-movies__title'>
          {genre && genre[0].toUpperCase() + genre.slice(1).toLowerCase()}
        </h2>
      </Link>
      { isLoading ? (
        <Loader />
      ) : isError? (
        <div>Error fetching movies</div>
      ) : movies && movies.length > 0 ? (
        <div className='genre-movies__content'>
        <MoviesList movies={visibleMovies} />
        {visibleMoviesCount < movies.length && (
          <Button
            type="button"
            kind="primary"
            onClick={loadMoreMovies}
            style={{width:"218px", "alignSelf":"center"}}
          >
            Показать еще
          </Button>
        )}
        </div>
      ) :  (
        <div className="genre-movies-empty">
          <p className="genre-movies-empty__title">
            Movies list is empty
          </p>
        </div>
      )}
    </main>
  );
};

export default FetchGenreMoviesList;