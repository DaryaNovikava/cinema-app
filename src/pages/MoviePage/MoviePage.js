import { jsx as _jsx } from "react/jsx-runtime";
import { useParams } from 'react-router-dom';
import { SectionAboutMovie } from '../../components/SectionAboutMovie/SectionAboutMovie';
const MoviePage = () => {
    const { movieId } = useParams();
    return (_jsx("div", { className: "movie-page", children: _jsx(SectionAboutMovie, { movieId: Number(movieId), hideAboutButton: true, hideUpdateButton: true, hideMovieInfo: false, isMoviePage: true }) }));
};
export default MoviePage;
