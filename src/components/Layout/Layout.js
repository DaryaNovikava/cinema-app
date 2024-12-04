import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import { useModalContext } from '../../contexts/ModalContext';
import { useEffect, useState } from 'react';
import { API_URL, MovieListSchema, fetchMoviesData, } from '../../api/Movie';
export const Layout = () => {
    const { isModalOpen, closeModal } = useModalContext();
    const [searchMovie, setSearchMovie] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isResultsVisible, setResultsVisible] = useState(false);
    useEffect(() => {
        const searchMoviesByTitle = async () => {
            if (searchMovie.trim() === '') {
                setResultsVisible(false);
                setSearchResults([]);
                return;
            }
            try {
                const url = `${API_URL}movie?title=${encodeURIComponent(searchMovie)}&count=100`;
                const data = await fetchMoviesData(url, MovieListSchema);
                setSearchResults(data);
                setResultsVisible(true);
            }
            catch (error) {
                console.error('Ошибка при загрузке фильмов по названию:', error);
            }
        };
        searchMoviesByTitle();
    }, [searchMovie]);
    const handleSearchMovie = (event) => {
        setSearchMovie(event.target.value);
    };
    const hideSearchResults = () => {
        setResultsVisible(false);
        setSearchMovie('');
        console.log('Результаты скрыты');
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, { searchMovie: searchMovie, onSearchMovie: handleSearchMovie, isResultsVisible: isResultsVisible, searchResults: searchResults, onHideResults: hideSearchResults }), _jsx("main", { children: _jsx(Outlet, {}) }), _jsx(Footer, {}), _jsx(Modal, { isOpen: isModalOpen, onClose: closeModal })] }));
};
export default Layout;
