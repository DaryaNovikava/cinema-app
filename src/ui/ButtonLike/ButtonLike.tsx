import './ButtonLike.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useModalContext } from '../../contexts/ModalContext';
import { useFavorites } from '../../contexts/FavouritesContext';

interface ButtonLikeProps {
  movieId: number;
}

export const ButtonLike: React.FC<ButtonLikeProps> = ({ movieId }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { isLogged } = useAuth();
  const { openModal } = useModalContext();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(movieId));
  }, [favorites, movieId]);

  const handleLike = async () => {
    if (isLogged) {
      try {
        if (isFavorite) {
          await removeFavorite(movieId);
        } else {
          await addFavorite(movieId);
        }
      } catch (error) {
        console.error('Ошибка при изменении статуса избранного:', error);
      }
    } else {
      console.log('Пользователь не авторизован, открываем форму входа.');
      openModal();
    }
  };

  return (
    <button
      className={`btn-reset btn-like ${isFavorite ? 'btn-like_favourite' : ''}`}
      onClick={handleLike}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d={
            isFavorite
              ? 'M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z'
              : 'M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z'
          }
          fill={isFavorite ? '#B4A9FF' : 'white'}
        />
      </svg>
    </button>
  );
};

export default ButtonLike;
