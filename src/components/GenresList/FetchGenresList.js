import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './FetchGenresList.css';
import { GenreListSchema, useMoviesData } from '../../api/Movie';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import GenresList from './GenresList';
export const FetchGenresList = () => {
    const { data: genres, isLoading, isError, } = useMoviesData(API_URL + 'movie/genres', GenreListSchema);
    console.log(genres);
    return (_jsx("main", { className: "container", children: isLoading ? (_jsx(Loader, {})) : isError ? (_jsx("div", { children: "Error fetching genres" })) : genres ? (_jsxs(_Fragment, { children: [_jsx("h2", { className: "genres__title", children: "\u0416\u0430\u043D\u0440\u044B \u0444\u0438\u043B\u044C\u043C\u043E\u0432" }), _jsx(GenresList, { genres: genres })] })) : (_jsx("div", { children: "Genres list is empty" })) }));
};
export default FetchGenresList;
