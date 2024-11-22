import './CardGenre.css';
import { Link } from 'react-router-dom';
import posterUrl from '../../assets/images/card-image.png';

type CardGenreProps = {
  genre: string;
  image: string;
};

export const CardGenre: React.FC<CardGenreProps> = ({ genre, image }) => {
  return (
    <Link to={`/movie/genres/${genre}`}>
      <article className="card card-genre__page">
        <img
          className="card-genre__image"
          src={image || posterUrl}
          alt={genre}
        />
        <h3 className="card-genre__title">
          {genre[0].toUpperCase() + genre.slice(1).toLowerCase()}
        </h3>
      </article>
    </Link>
  );
};
