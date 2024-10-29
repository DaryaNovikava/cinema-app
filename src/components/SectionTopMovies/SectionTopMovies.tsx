import './SectionTopMovies.css';
import {
  API_URL,
  MovieList,
  MovieListSchema,
  useMoviesData,
} from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import MoviesList from '../MoviesList/MoviesList';

export const SectionTopMovies: React.FC = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useMoviesData<MovieList>(API_URL + 'movie/top10', MovieListSchema);

  return (
    <section>
      {isLoading ? (
        <div className="container" style={{ height: '400px' }}>
          <Loader />
        </div>
      ) : isError ? (
        <div className="container">
          <h2 className="section__title">Топ 10 фильмов</h2>
          <p>Error fetching movies </p>
        </div>
      ) : movies ? (
        <div className="container section-top">
          <h2 className="section__title">Топ 10 фильмов</h2>
          <MoviesList movies={movies} />
        </div>
      ) : (
        <div>Movies list is empty</div>
      )}
    </section>
  );
};

export default SectionTopMovies;
