import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
} from 'react';
import {
  getUserFavorites,
  addMovieToFavorites,
  removeMovieFromFavorites,
} from '../api/Movie';
import { useAuth } from './AuthContext';

interface FavoritesContextProps {
  favorites: number[];
  addFavorite: (movieId: number) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const FavoritesProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLogged } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (isLogged) {
      getUserFavorites()
        .then((data) => {
          const favoriteIds = data.map((item: { id: number }) => item.id);
          setFavorites(favoriteIds);
        })
        .catch((error) =>
          console.error('Ошибка при загрузке избранных фильмов:', error),
        );
    } else {
      setFavorites([]);
    }
  }, [isLogged]);

  const addFavorite = async (movieId: number) => {
    try {
      await addMovieToFavorites(movieId);
      setFavorites((prevFavorites) => [...prevFavorites, movieId]);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  };

  const removeFavorite = async (movieId: number) => {
    try {
      await removeMovieFromFavorites(movieId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((id) => id !== movieId),
      );
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export default FavoritesProvider;
