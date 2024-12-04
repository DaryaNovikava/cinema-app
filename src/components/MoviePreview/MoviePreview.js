import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import RatingInfo from '../../ui/RatingInfo/RatingInfo';
import formatRuntime from '../../utils/formatRuntime';
import './MoviePreview.css';
import posterImage from '../../assets/images/card-image.png';
const MoviePreview = ({ movie }) => {
    const runtimeMovie = movie.runtime;
    return (_jsxs("div", { className: "movie-preview", children: [_jsx("img", { className: "movie-preview__poster", src: movie.posterUrl || posterImage, alt: movie.title }), _jsxs("div", { className: "movie-preview__info", children: [_jsxs("div", { className: "hero-info", children: [_jsx(RatingInfo, { size: "Large", rating: movie.tmdbRating }), _jsx("span", { className: "movie-preview__text", children: movie.releaseYear }), _jsx("span", { className: "movie-preview__text", children: movie.genres[0] }), _jsx("span", { className: "movie-preview__text", children: formatRuntime(runtimeMovie) })] }), _jsx("h1", { className: "movie-preview__title", children: movie.title })] })] }));
};
export default MoviePreview;
