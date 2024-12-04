import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import './header.css';
import { useState } from 'react';
import SearchInput from '../../ui/SearchInput/SearchInput';
import { useRef } from 'react';
import logo from '../../assets/images/logo.svg';
import genresIcon from '../../assets/images/genres-icon.svg';
import userIcon from '../../assets/images/user-icon.svg';
import searchIcon from '../../assets/images/search.svg';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
import Modal from '../Modal/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../hooks/useModal';
import useResize from '../../utils/useResize';
const Header = ({ searchMovie, onSearchMovie, isResultsVisible, searchResults, onHideResults, }) => {
    const { user, isLogged } = useAuth();
    const { isModalOpen, openModal, closeModal } = useModal();
    const { width } = useResize();
    const navigate = useNavigate();
    const isTablet = Boolean(width < 1060);
    const [isSearchVisible, setSearchVisible] = useState(false);
    const searchWrapperRef = useRef(null);
    const toggleSearch = () => {
        setSearchVisible((prev) => !prev);
    };
    // Закрытие результатов при потере фокуса
    const handleBlur = (event) => {
        if (!searchWrapperRef.current?.contains(event.relatedTarget)) {
            console.log('Потеря фокуса. Закрываем результаты.');
            onHideResults();
            setSearchVisible(false);
        }
    };
    const handleSelectMovie = (id) => {
        navigate(`/movie/${id}`);
        onHideResults();
    };
    const handleLoginClick = () => {
        if (isLogged) {
            navigate(`/account/${user?.surname}`);
        }
        else {
            openModal();
        }
    };
    return (_jsxs("header", { className: "header", children: [_jsxs("div", { className: "container header__box", children: [(!isTablet || (isTablet && !isSearchVisible)) && (_jsx(Link, { to: "/", children: _jsx("img", { src: logo, alt: "\u041B\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430 CinemaGuide", className: "header__logo" }) })), _jsx("div", { className: "header__menu", children: isTablet && isSearchVisible ? (_jsxs("div", { className: "search-wrapper", ref: searchWrapperRef, children: [_jsx(SearchInput, { value: searchMovie, onChange: onSearchMovie, onBlur: handleBlur, autoFocus: true }), isResultsVisible && (_jsx(SearchResults, { results: searchResults, onSelect: handleSelectMovie }))] })) : isTablet ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/movie/genres", children: _jsx("img", { src: genresIcon, alt: "\u041A \u0441\u043F\u0438\u0441\u043A\u0443 \u0436\u0430\u043D\u0440\u043E\u0432", className: "header__icon" }) }), _jsx("img", { src: searchIcon, alt: "\u041F\u043E\u0438\u0441\u043A \u0444\u0438\u043B\u044C\u043C\u0430", className: "header__icon", onClick: toggleSearch }), _jsx("img", { src: userIcon, alt: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C", className: "header__icon", onClick: handleLoginClick })] })) : (_jsxs(_Fragment, { children: [_jsx("nav", { className: "header__navigation nav", children: _jsxs("ul", { className: "nav__list list-reset", children: [_jsx("li", { className: "nav__item", children: _jsx(Link, { to: "/", className: "nav__link", children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }) }), _jsx("li", { className: "nav__item", children: _jsx(Link, { to: "/movie/genres", className: "nav__link", children: "\u0416\u0430\u043D\u0440\u044B" }) })] }) }), _jsxs("div", { className: "search-wrapper", ref: searchWrapperRef, children: [_jsx(SearchInput, { value: searchMovie, onChange: onSearchMovie, onBlur: handleBlur }), isResultsVisible && (_jsx(SearchResults, { results: searchResults, onSelect: handleSelectMovie }))] }), _jsx("button", { className: "btn-reset nav__link login_btn", onClick: handleLoginClick, children: isLogged && user ? `${user.name}` : 'Войти' })] })) })] }), isModalOpen && _jsx(Modal, { isOpen: isModalOpen, onClose: closeModal })] }));
};
export default Header;
