import { jsx as _jsx } from "react/jsx-runtime";
import FetchGenreMoviesList from '../../components/GenreMoviesList/FetchGenreMoviesList';
const GenreMoviesPage = () => {
    return (_jsx("div", { className: "genres-page", children: _jsx(FetchGenreMoviesList, {}) }));
};
export default GenreMoviesPage;
