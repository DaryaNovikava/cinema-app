import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, } from 'react';
import { getUserFavorites, addMovieToFavorites, removeMovieFromFavorites, } from '../api/Movie';
import { useAuth } from './AuthContext';
const FavoritesContext = createContext(undefined);
export const FavoritesProvider = ({ children, }) => {
    const { isLogged } = useAuth();
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if (isLogged) {
            getUserFavorites()
                .then((data) => {
                const favoriteIds = data.map((item) => item.id);
                setFavorites(favoriteIds);
            })
                .catch((error) => console.error('Ошибка при загрузке избранных фильмов:', error));
        }
        else {
            setFavorites([]);
        }
    }, [isLogged]);
    const addFavorite = async (movieId) => {
        try {
            await addMovieToFavorites(movieId);
            setFavorites((prevFavorites) => [...prevFavorites, movieId]);
        }
        catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
        }
    };
    const removeFavorite = async (movieId) => {
        try {
            await removeMovieFromFavorites(movieId);
            setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== movieId));
        }
        catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
        }
    };
    return (_jsx(FavoritesContext.Provider, { value: { favorites, addFavorite, removeFavorite }, children: children }));
};
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
export default FavoritesProvider;
