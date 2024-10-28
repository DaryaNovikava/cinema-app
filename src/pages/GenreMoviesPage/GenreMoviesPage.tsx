// import { useParams } from 'react-router-dom';
import FetchGenreMoviesList from '../../components/GenreMoviesList/FetchGenreMoviesList';

const GenreMoviesPage: React.FC = () => {
  // const { genres } = useParams<{ genres: string }>();

  return (
    <div className="genres-page">
      <FetchGenreMoviesList />
    </div>
  );
};

export default GenreMoviesPage;
