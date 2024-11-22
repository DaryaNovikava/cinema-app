import React from 'react';
import { useState, useEffect } from 'react';
import './AccountPage.css';
import { getUserFavorites } from '../../api/Movie';
import { Button } from '../../ui/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MovieList } from '../../api/Movie';
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

const AccountPage: React.FC = () => {
  const { logout, user } = useAuth();
  const [favorites, setFavorites] = useState<MovieList>([]);
  const [userFavorites, setUserFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'favorites' | 'settings'>(
    'favorites',
  );
  const navigate = useNavigate();
  const { width } = useResize();
  const isMobile = Boolean(width < 768);

  useEffect(() => {
    if (user) {
      getUserFavorites()
        .then((data) => {
          console.log(data);
          const favoriteIds = data.map((item: { id: number }) => item.id);
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
          const moviesPromises = userFavorites.map((movieId) =>
            getMovieById(movieId),
          );
          const moviesData = await Promise.all(moviesPromises);
          setFavorites(moviesData);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
        }
      };
      getFavouriteMovies();
    } else {
      setIsLoading(false);
    }
  }, [userFavorites]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRemoveMovie = async (id: number) => {
    try {
      await removeMovieFromFavorites(id);
      setFavorites(favorites.filter((movie) => movie.id !== id)); // Убираем фильм из списка
      setUserFavorites(userFavorites.filter((movieId) => movieId !== id)); // Убираем id из избранных
    } catch (error) {
      console.error('Ошибка при удалении фильма из избранного:', error);
    }
  };

  return (
    <div className=" container account-page">
      <h1 className="account__title">Мой аккаунт</h1>
      <div className="account__tabs">
        <button
          className="btn-reset btn_tab tab_favourites"
          onClick={() => setActiveTab('favorites')}
        >
          {isMobile ? 'Избранное' : 'Избранные фильмы'}
        </button>
        <button
          className="btn-reset btn_tab tab_settings"
          onClick={() => setActiveTab('settings')}
        >
          {isMobile ? 'Настройки' : 'Настройки аккаунта'}
        </button>
      </div>

      <div>
        {activeTab === 'favorites' &&
          (isLoading ? (
            <Loader />
          ) : isError ? (
            <div>Ошибка при загрузке фильмов</div>
          ) : isMobile ? (
            <div className="movies-slider">
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                }}
              >
                {favorites.map((movie) => (
                  <SwiperSlide key={movie.id} className="custom-slide">
                    <CardMain
                      id={movie.id}
                      originalTitle={movie.originalTitle}
                      posterUrl={movie.posterUrl}
                      onRemove={handleRemoveMovie}
                      showRemoveButton={true}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <MoviesList
              movies={favorites}
              onRemoveMovie={handleRemoveMovie}
              showRemoveButton={true}
            />
          ))}

        {activeTab === 'settings' && (
          <div>
            <div className="user-info">
              <div className="user-name_wrapper">
                <UserView
                  userName={user?.name}
                  userSurname={user?.surname}
                ></UserView>
                <div className="user_name">
                  <p className="user-name_surname">Имя Фамилия</p>
                  <p className="user-name-data">
                    {' '}
                    {`${user?.name} ${user?.surname}`}
                  </p>
                </div>
              </div>

              <div className="user-name_wrapper">
                <div className="user-view">
                  <div className="user-view__email" />
                </div>
                <div className="user_name">
                  <p className="user-name_surname">Электронная почта</p>
                  <p className="user-name-data">{user?.email}</p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              kind="primary"
              onClick={handleLogout}
              style={{ width: '262px' }}
            >
              Выход из аккаунта
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
