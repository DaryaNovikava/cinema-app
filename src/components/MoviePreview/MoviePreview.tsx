import { Movie } from "../../api/Movie";
import RatingInfo from "../../ui/RatingInfo/RatingInfo";
import formatRuntime from "../../utils/formatRuntime";
import "./MoviePreview.css";
import posterImage from '../../assets/images/card-image.png';

interface MoviePreviewProps {
  movie: Movie;
}

const MoviePreview: React.FC<MoviePreviewProps> = ({ movie }) => {
  const runtimeMovie = movie.runtime;

  return (
    <div className="movie-preview">
      <img className="movie-preview__poster" src={movie.posterUrl || posterImage} alt={movie.title} />
      <div className="movie-preview__info">
        <div className="hero-info">
          <RatingInfo size="Large" rating={movie.tmdbRating}/>
          <span className='movie-preview__text'>{movie.releaseYear}</span>
          <span className='hemovie-preview__text'>{movie.genres[0]}</span>
          <span className='movie-preview__text'>{formatRuntime(runtimeMovie)}</span>
        </div>
        <h1 className="movie-preview__title">{movie.title}</h1>
      </div>
    </div>
  );
};

export default MoviePreview;
