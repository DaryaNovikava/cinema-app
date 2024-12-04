import { jsx as _jsx } from "react/jsx-runtime";
import './GenresList.css';
import { CardGenre } from '../../ui/CardGenre/CardGenre';
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
export const GenresList = ({ genres = [] }) => {
    const genreImages = {
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
    };
    return (_jsx("section", { className: "genres", children: _jsx("ul", { className: "list-reset genres-list", children: genres.map((genre) => (_jsx("li", { className: "genres-list__item", children: _jsx(CardGenre, { genre: genre, image: genreImages[genre] }, genre) }, genre))) }) }));
};
export default GenresList;
