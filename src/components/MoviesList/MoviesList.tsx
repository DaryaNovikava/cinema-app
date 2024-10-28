import { MovieList } from '../../api/Movie';
import './MoviesList.css';
import CardMain from '../../ui/CardMain/CardMain';

export interface MoviesListProps {
  movies: MovieList;
  onRemoveMovie?: (id: number) => void;
  showRemoveButton?: boolean;
}
export const MoviesList: React.FC<MoviesListProps> = ({
  movies = [],
  onRemoveMovie,
  showRemoveButton,
}) => {
  return (
    <section className="movies__top10">
      <ul className="list-reset movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movies-list__item">
            <CardMain
              id={movie.id}
              originalTitle={movie.originalTitle}
              posterUrl={movie.posterUrl}
              onRemove={onRemoveMovie}
              showRemoveButton={showRemoveButton}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MoviesList;
