import { jsx as _jsx } from "react/jsx-runtime";
import './MoviesList.css';
import CardMain from '../../ui/CardMain/CardMain';
export const MoviesList = ({ movies = [], onRemoveMovie, showRemoveButton, }) => {
    return (_jsx("section", { className: "movies__top10", children: _jsx("ul", { className: "list-reset movies-list", children: movies.map((movie) => (_jsx("li", { className: "movies-list__item", children: _jsx(CardMain, { id: movie.id, originalTitle: movie.originalTitle, posterUrl: movie.posterUrl, onRemove: onRemoveMovie, showRemoveButton: showRemoveButton }) }, movie.id))) }) }));
};
export default MoviesList;
