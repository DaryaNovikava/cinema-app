import './FetchGenresList.css';
import { GenreList, GenreListSchema, useMoviesData } from '../../api/Movie';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import GenresList from './GenresList';

export const FetchGenresList: React.FC = () => {
  const {
    data: genres,
    isLoading,
    isError,
  } = useMoviesData<GenreList>(API_URL + 'movie/genres', GenreListSchema);

  console.log(genres);
  return (
    <main className="container">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>Error fetching genres</div>
      ) : genres ? (
        <>
          <h2 className="genres__title">Жанры фильмов</h2>
          <GenresList genres={genres} />
        </>
      ) : (
        <div>Genres list is empty</div>
      )}
    </main>
  );
};

export default FetchGenresList;
