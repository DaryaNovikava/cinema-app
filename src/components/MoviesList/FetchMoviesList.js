import { jsx as _jsx } from "react/jsx-runtime";
import { API_URL, MovieListSchema, useMoviesData, } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import MoviesList from './MoviesList';
export const FetchMoviesList = () => {
    const { data: movies, isLoading, isError, } = useMoviesData(API_URL + 'movie/', MovieListSchema);
    return (_jsx("main", { className: "container", children: isLoading ? (_jsx(Loader, {})) : isError ? (_jsx("div", { children: "Error fetching movies" })) : movies ? (_jsx(MoviesList, { movies: movies })) : (_jsx("div", { children: "Movies list is empty" })) }));
};
export default FetchMoviesList;
