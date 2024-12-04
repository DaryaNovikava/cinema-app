import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './SectionTopMovies.css';
import { API_URL, MovieListSchema, useMoviesData, } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useResize from '../../utils/useResize';
import MoviesList from '../MoviesList/MoviesList';
import CardMain from '../../ui/CardMain/CardMain';
export const SectionTopMovies = () => {
    const { width } = useResize();
    const showSlider = Boolean(width < 768);
    const { data: movies, isLoading, isError, } = useMoviesData(API_URL + 'movie/top10', MovieListSchema);
    return (_jsx("section", { children: isLoading ? (_jsx("div", { className: "container", style: { height: '400px' }, children: _jsx(Loader, {}) })) : isError ? (_jsxs("div", { className: "container", children: [_jsx("h2", { className: "section__title", children: "\u0422\u043E\u043F 10 \u0444\u0438\u043B\u044C\u043C\u043E\u0432" }), _jsx("p", { children: "Error fetching movies " })] })) : movies ? (_jsxs("div", { className: "container section-top", children: [_jsx("h2", { className: "section__title", children: "\u0422\u043E\u043F 10 \u0444\u0438\u043B\u044C\u043C\u043E\u0432" }), showSlider ? (_jsx("div", { className: "movies-slider", children: _jsx(Swiper, { spaceBetween: 1, slidesPerView: 1, pagination: { clickable: true }, navigation: true, breakpoints: {
                            576: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }, children: movies.map((movie) => (_jsx(SwiperSlide, { className: "custom-slide", children: _jsx(CardMain, { id: movie.id, originalTitle: movie.originalTitle, posterUrl: movie.posterUrl }) }, movie.id))) }) })) : (_jsx(MoviesList, { movies: movies }))] })) : (_jsx("div", { children: "Movies list is empty" })) }));
};
export default SectionTopMovies;
