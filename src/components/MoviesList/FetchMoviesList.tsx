import {
  API_URL,
  MovieList,
  MovieListSchema,
  useMoviesData,
} from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import MoviesList from './MoviesList';

export const FetchMoviesList: React.FC = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMoviesData<MovieList>(API_URL + 'movie/', MovieListSchema);

  return (
    <main className="container">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error fetching movies</div>
      ) : movies ? (
        <MoviesList movies={movies} />
      ) : (
        <div>Movies list is empty</div>
      )}
    </main>
  );
};

export default FetchMoviesList;
