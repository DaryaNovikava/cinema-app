import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './FetchGenreMoviesList.css';
import { useEffect } from 'react';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import { useParams, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import MoviesList from '../MoviesList/MoviesList';
import { useState } from 'react';
export const FetchGenreMoviesList = () => {
    const { genre } = useParams();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [hasMoreMovies, setHasMoreMovies] = useState(true);
    const [isPaginating, setIsPaginating] = useState(false);
    const fetchMovies = async () => {
        if (!hasMoreMovies || isPaginating)
            return;
        if (page === 1) {
            setIsLoading(true);
        }
        else {
            setIsPaginating(true);
        }
        try {
            const response = await fetch(`${API_URL}movie?genre=${genre}&count=10&page=${page}`);
            const data = await response.json();
            if (data.length > 0) {
                setMovies((prevMovies) => {
                    const newMovies = data.filter((newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id));
                    return [...prevMovies, ...newMovies];
                });
                setPage((prevPage) => prevPage + 1);
            }
            else {
                setHasMoreMovies(false);
            }
        }
        catch (error) {
            console.error('Error fetching movies:', error);
            setError(true);
        }
        finally {
            setIsLoading(false);
            setIsPaginating(false);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, [genre]);
    const sortedMoviesOnFirstPage = page === 1
        ? [...movies].sort((a, b) => b.tmdbRating - a.tmdbRating)
        : movies;
    return (_jsxs("main", { className: "container genre-movies", children: [_jsx(Link, { to: "/movie/genres", children: _jsx("h2", { className: "genre-movies__title", children: genre && genre[0].toUpperCase() + genre.slice(1).toLowerCase() }) }), isLoading ? (_jsx(Loader, {})) : isError ? (_jsx("div", { children: "Error fetching movies" })) : movies && movies.length > 0 ? (_jsx(InfiniteScroll, { dataLength: movies.length, next: fetchMovies, hasMore: hasMoreMovies, loader: _jsx(Loader, {}), scrollThreshold: 0.7, style: { overflow: 'visible' }, endMessage: _jsx("p", { style: { textAlign: 'center', marginTop: '20px' }, children: "You have seen all movies." }), children: _jsx(MoviesList, { movies: sortedMoviesOnFirstPage }) })) : (_jsx("div", { className: "genre-movies-empty", children: _jsx("p", { className: "genre-movies-empty__title", children: "Movies list is empty" }) }))] }));
};
export default FetchGenreMoviesList;
