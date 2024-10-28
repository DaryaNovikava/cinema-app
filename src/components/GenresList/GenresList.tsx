import './GenresList.css';
import { CardGenre } from '../../ui/CardGenre/CardGenre';
import { GenreList } from '../../api/Movie';
import history from '../../assets/images/history.png';
import comedy from '../..//assets/images/comedy.png';
import family from '../../assets/images/family.png';
import drama from '../../assets/images/drama.png';
import adventure from '../../assets/images/adventure.png';
import fantasy from '../../assets/images/fantasy.png';
import thriller from '../../assets/images/thriller.png';
import horror from '../../assets/images/horror.jpeg';
import scifi from '../../assets/images/scifi.jpg';
import standup from '../../assets/images/standup.jpg';
import mystery from '../../assets/images/mystery.png';
import romance from '../../assets/images/romance.jpg';
import music from '../../assets/images/music.jpg';
import crime from '../../assets/images/crime.jpg';
import tv from '../../assets/images/tv.jpg';
import documentary from '../../assets/images/documentary.jpg';
import action from '../../assets/images/action.jpg';
import western from '../../assets/images/western.webp';
import animation from '../../assets/images/animation.jpg';
import war from '../../assets/images/war.jpg';

export interface GenresListProps {
  genres: GenreList;
}

export const GenresList: React.FC<GenresListProps> = ({ genres = [] }) => {
  const genreImages: { [key: string]: string } = {
    history: history,
    comedy: comedy,
    family: family,
    drama: drama,
    adventure: adventure,
    fantasy: fantasy,
    thriller: thriller,
    horror: horror,
    scifi: scifi,
    'stand-up': standup,
    mystery: mystery,
    romance: romance,
    music: music,
    crime: crime,
    'tv-movie': tv,
    documentary: documentary,
    action: action,
    western: western,
    animation: animation,
    war: war,
  }
    return (
      <section className="genres">
        <ul className="list-reset genres-list">
        {genres.map((genre) => (
        <li key={genre} className="genres-list__item">
          <CardGenre
          key={genre}
          genre={genre}
          image={genreImages[genre]}
          // id={movie.id}
          />
           </li>
        ))}
        </ul>
      </section>
    );
};

export default GenresList;
