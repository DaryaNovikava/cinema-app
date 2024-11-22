import { useParams } from 'react-router-dom';
import { SectionAboutMovie } from '../../components/SectionAboutMovie/SectionAboutMovie';

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  return (
    <div className="movie-page">
      <SectionAboutMovie
        movieId={Number(movieId)}
        hideAboutButton={true}
        hideUpdateButton={true}
        hideMovieInfo={false}
        isMoviePage={true}
      />
    </div>
  );
};

export default MoviePage;
