import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import './AccountPage.css';
import { getUserFavorites } from '../../api/Movie';
import { Button } from '../../ui/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';
import CardMain from '../../ui/CardMain/CardMain';
import { getMovieById } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import { UserView } from '../../ui/UserView/UserView';
import { removeMovieFromFavorites } from '../../api/Movie';
import useResize from '../../utils/useResize';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const AccountPage = () => {
    const { logout, user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [activeTab, setActiveTab] = useState('favorites');
    const navigate = useNavigate();
    const { width } = useResize();
    const isMobile = Boolean(width < 768);
    useEffect(() => {
        if (user) {
            getUserFavorites()
                .then((data) => {
                console.log(data);
                const favoriteIds = data.map((item) => item.id);
                setUserFavorites(favoriteIds);
            })
                .catch((error) => {
                console.error('Ошибка при загрузке избранных фильмов:', error);
                setIsError(true);
            });
        }
    }, [user]);
    useEffect(() => {
        if (userFavorites.length > 0) {
            const getFavouriteMovies = async () => {
                try {
                    const moviesPromises = userFavorites.map((movieId) => getMovieById(movieId));
                    const moviesData = await Promise.all(moviesPromises);
                    setFavorites(moviesData);
                    setIsLoading(false);
                }
                catch (error) {
                    setIsError(true);
                    setIsLoading(false);
                }
            };
            getFavouriteMovies();
        }
        else {
            setIsLoading(false);
        }
    }, [userFavorites]);
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleRemoveMovie = async (id) => {
        try {
            await removeMovieFromFavorites(id);
            setFavorites(favorites.filter((movie) => movie.id !== id)); // Убираем фильм из списка
            setUserFavorites(userFavorites.filter((movieId) => movieId !== id)); // Убираем id из избранных
        }
        catch (error) {
            console.error('Ошибка при удалении фильма из избранного:', error);
        }
    };
    return (_jsxs("div", { className: " container account-page", children: [_jsx("h1", { className: "account__title", children: "\u041C\u043E\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442" }), _jsxs("div", { className: "account__tabs", children: [_jsx("button", { className: "btn-reset btn_tab tab_favourites", onClick: () => setActiveTab('favorites'), children: isMobile ? 'Избранное' : 'Избранные фильмы' }), _jsx("button", { className: "btn-reset btn_tab tab_settings", onClick: () => setActiveTab('settings'), children: isMobile ? 'Настройки' : 'Настройки аккаунта' })] }), _jsxs("div", { children: [activeTab === 'favorites' &&
                        (isLoading ? (_jsx(Loader, {})) : isError ? (_jsx("div", { children: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0444\u0438\u043B\u044C\u043C\u043E\u0432" })) : isMobile ? (_jsx("div", { className: "movies-slider", children: _jsx(Swiper, { spaceBetween: 16, slidesPerView: 1, pagination: { clickable: true }, navigation: true, breakpoints: {
                                    576: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                }, children: favorites.map((movie) => (_jsx(SwiperSlide, { className: "custom-slide", children: _jsx(CardMain, { id: movie.id, originalTitle: movie.originalTitle, posterUrl: movie.posterUrl, onRemove: handleRemoveMovie, showRemoveButton: true }) }, movie.id))) }) })) : (_jsx(MoviesList, { movies: favorites, onRemoveMovie: handleRemoveMovie, showRemoveButton: true }))), activeTab === 'settings' && (_jsxs("div", { children: [_jsxs("div", { className: "user-info", children: [_jsxs("div", { className: "user-name_wrapper", children: [_jsx(UserView, { userName: user?.name, userSurname: user?.surname }), _jsxs("div", { className: "user_name", children: [_jsx("p", { className: "user-name_surname", children: "\u0418\u043C\u044F \u0424\u0430\u043C\u0438\u043B\u0438\u044F" }), _jsxs("p", { className: "user-name-data", children: [' ', `${user?.name} ${user?.surname}`] })] })] }), _jsxs("div", { className: "user-name_wrapper", children: [_jsx("div", { className: "user-view", children: _jsx("div", { className: "user-view__email" }) }), _jsxs("div", { className: "user_name", children: [_jsx("p", { className: "user-name_surname", children: "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430" }), _jsx("p", { className: "user-name-data", children: user?.email })] })] })] }), _jsx(Button, { type: "button", kind: "primary", onClick: handleLogout, style: { width: '262px' }, children: "\u0412\u044B\u0445\u043E\u0434 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430" })] }))] })] }));
};
export default AccountPage;
