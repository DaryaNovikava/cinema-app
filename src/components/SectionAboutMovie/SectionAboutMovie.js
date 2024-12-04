import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './SectionAboutMovie.css';
import { MovieSchema } from '../../api/Movie';
import { useMoviesData } from '../../api/Movie';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import RatingInfo from '../../ui/RatingInfo/RatingInfo';
import formatRuntime from '../../utils/formatRuntime';
import { Button } from '../../ui/Button/Button';
import { ButtonLike } from '../../ui/ButtonLike/ButtonLike';
import { ButtonUpdate } from '../../ui/ButtonUpdate/ButtonUpdate';
import placeholderImage from '../../assets/images/film-image.png';
import MovieInfoTable from '../MovieInfoTable/MovieInfoTable';
import { useNavigate } from 'react-router-dom';
import ModalTrailer from '../ModalTrailer/ModalTrailer';
export const SectionAboutMovie = ({ movieId, hideAboutButton, hideUpdateButton, hideMovieInfo, isMoviePage, }) => {
    const navigate = useNavigate();
    const fetchUrl = movieId
        ? `${API_URL}movie/${movieId}`
        : `${API_URL}movie/random`;
    const { data: movie, isLoading, isError, refetch, } = useMoviesData(fetchUrl, MovieSchema);
    const runtimeMovie = movie?.runtime;
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    useEffect(() => {
        setIsImageLoaded(false);
    }, [movie]);
    const handleUpdateClick = () => {
        if (!movieId) {
            refetch();
        }
    };
    const handleAboutClick = () => {
        if (movie?.id) {
            navigate(`/movie/${movie.id}`);
        }
    };
    const handleTrailerClick = () => {
        if (movie?.trailerUrl) {
            setIsTrailerOpen(true);
        }
    };
    const handleCloseModal = () => {
        setIsTrailerOpen(false);
    };
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };
    return (_jsxs("section", { className: "hero", children: [isLoading ? (_jsx("div", { className: "container", style: { height: '400px' }, children: _jsx(Loader, {}) })) : isError ? (_jsx("div", { className: "container", children: "Error fetching movie" })) : movie ? (_jsxs("div", { className: "container container_movie", children: [_jsxs("div", { className: "hero-preview", children: [_jsxs("div", { className: "hero__content", children: [_jsxs("div", { className: "hero-info", children: [_jsx(RatingInfo, { size: "Large", rating: movie.tmdbRating }), _jsx("span", { className: "hero-info_text", children: movie.releaseYear }), _jsx("span", { className: "hero-info_text", children: movie.genres[0] }), _jsx("span", { className: "hero-info_text", children: formatRuntime(runtimeMovie) })] }), _jsx("h1", { className: "hero__title", children: movie.title }), _jsx("p", { className: "hero__descr", children: movie.plot }), _jsxs("div", { className: `hero__buttons ${isMoviePage ? 'hero__buttons--movie-page' : 'hero__buttons--main-page'}`, children: [_jsx(Button, { type: "button", kind: "primary", onClick: handleTrailerClick, style: { width: '171px' }, children: "\u0422\u0440\u0435\u0439\u043B\u0435\u0440" }), !hideAboutButton && (_jsx(Button, { type: "button", kind: "secondary", onClick: handleAboutClick, style: { width: '171px' }, children: "\u041E \u0444\u0438\u043B\u044C\u043C\u0435" })), _jsx(ButtonLike, { movieId: movie.id }), !hideUpdateButton && (_jsx(ButtonUpdate, { onClick: handleUpdateClick }))] })] }), _jsxs("div", { className: "hero-img-container", children: [movie && !isImageLoaded && (_jsx("div", { style: {
                                            position: 'absolute',
                                            top: '200px',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                        }, children: _jsx(Loader, {}) })), _jsx("img", { className: "hero-img", src: movie.backdropUrl || placeholderImage, alt: movie.title, onLoad: handleImageLoad, style: {
                                            visibility: isImageLoaded ? 'visible' : 'hidden',
                                            position: isImageLoaded ? 'relative' : 'absolute',
                                        } })] })] }), !hideMovieInfo && (_jsx(MovieInfoTable, { language: movie.language, budget: movie.budget, revenue: movie.revenue, director: movie.director, production: movie.production, awardsSummary: movie.awardsSummary }))] })) : (_jsx("div", { className: "container", children: "Movies list is empty" })), _jsx(ModalTrailer, { trailerUrl: movie?.trailerUrl || '', isOpen: isTrailerOpen, onClose: handleCloseModal })] }));
};
export default SectionAboutMovie;
