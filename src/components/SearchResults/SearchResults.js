import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import MoviePreview from '../MoviePreview/MoviePreview';
import "./SearchResults.css";
const SearchResults = ({ results, onSelect }) => {
    if (results.length === 0) {
        return null;
    }
    return (_jsx("ul", { className: "search-results list-reset", children: results.map(movie => (_jsx("li", { className: "search-result-item", children: _jsx(Link, { to: `/movie/${movie.id}`, onClick: () => onSelect(movie.id), children: _jsx(MoviePreview, { movie: movie }) }) }, movie.id))) }));
};
export default SearchResults;
