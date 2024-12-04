import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './normalize.css';
import './style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import MainPage from './pages/MainPage/MainPage';
import MoviePage from './pages/MoviePage/MoviePage';
import GenresPage from './pages/GenresPage/GenresPage';
import GenreMoviesPage from './pages/GenreMoviesPage/GenreMoviesPage';
import AccountPage from './pages/AccountPage/AccountPage';
import { AuthProvider } from './contexts/AuthContext';
import { ModalProvider } from './contexts/ModalContext';
import { FavoritesProvider } from './contexts/FavouritesContext';
export const App = () => {
    return (_jsx(BrowserRouter, { basename: "/cinema-app", children: _jsx(AuthProvider, { children: _jsx(FavoritesProvider, { children: _jsx(ModalProvider, { children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Layout, {}), children: [_jsx(Route, { index: true, element: _jsx(MainPage, {}) }), _jsx(Route, { path: "movie/:movieId", element: _jsx(MoviePage, {}) }), _jsx(Route, { path: "movie/genres", element: _jsx(GenresPage, {}) }), _jsx(Route, { path: "movie/genres/:genre", element: _jsx(GenreMoviesPage, {}) }), _jsx(Route, { path: "/account/:userSurname", element: _jsx(AccountPage, {}) })] }) }) }) }) }) }));
};
export default App;
