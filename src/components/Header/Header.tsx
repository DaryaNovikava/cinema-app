import './header.css';
import { useState } from 'react';
import SearchInput from '../../ui/SearchInput/SearchInput';
import { useRef } from 'react';
import logo from '../../assets/images/logo.svg';
import genresIcon from '../../assets/images/genres-icon.svg';
import userIcon from '../../assets/images/user-icon.svg';
import searchIcon from '../../assets/images/search.svg';
import { MovieList } from '../../api/Movie';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
import Modal from '../Modal/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../hooks/useModal';
import useResize from '../../utils/useResize';

interface HeaderProps {
  searchMovie: string;
  onSearchMovie: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isResultsVisible: boolean;
  searchResults: MovieList;
  onHideResults: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchMovie,
  onSearchMovie,
  isResultsVisible,
  searchResults,
  onHideResults,
}) => {
  const { user, isLogged } = useAuth();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { width } = useResize();
  const navigate = useNavigate();
  const isTablet = Boolean(width < 1060);

  const [isSearchVisible, setSearchVisible] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement | null>(null);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  // Закрытие результатов при потере фокуса
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!searchWrapperRef.current?.contains(event.relatedTarget as Node)) {
      console.log('Потеря фокуса. Закрываем результаты.');
      onHideResults();
      setSearchVisible(false);
    }
  };

  const handleSelectMovie = (id: number) => {
    navigate(`/movie/${id}`);
    onHideResults();
  };

  const handleLoginClick = () => {
    if (isLogged) {
      navigate(`/account/${user?.surname}`);
    } else {
      openModal();
    }
  };

  return (
    <header className="header">
      <div className="container header__box">
        {(!isTablet || (isTablet && !isSearchVisible)) && (
          <Link to="/">
            <img
              src={logo}
              alt="Лого сайта CinemaGuide"
              className="header__logo"
            />
          </Link>
        )}
        <div className="header__menu">
          {isTablet && isSearchVisible ? (
            <div className="search-wrapper" ref={searchWrapperRef}>
              <SearchInput
                value={searchMovie}
                onChange={onSearchMovie}
                onBlur={handleBlur}
                autoFocus
              />
              {isResultsVisible && (
                <SearchResults
                  results={searchResults}
                  onSelect={handleSelectMovie}
                />
              )}
            </div>
          ) : isTablet ? (
            <>
              <Link to="/movie/genres">
                <img
                  src={genresIcon}
                  alt="К списку жанров"
                  className="header__icon"
                />
              </Link>
              <img
                src={searchIcon}
                alt="Поиск фильма"
                className="header__icon"
                onClick={toggleSearch}
              />
              <img
                src={userIcon}
                alt="Пользователь"
                className="header__icon"
                onClick={handleLoginClick}
              />
            </>
          ) : (
            <>
              <nav className="header__navigation nav">
                <ul className="nav__list list-reset">
                  <li className="nav__item">
                    <Link to="/" className="nav__link">
                      Главная
                    </Link>
                  </li>
                  <li className="nav__item">
                    <Link to="/movie/genres" className="nav__link">
                      Жанры
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="search-wrapper" ref={searchWrapperRef}>
                <SearchInput
                  value={searchMovie}
                  onChange={onSearchMovie}
                  onBlur={handleBlur}
                />
                {isResultsVisible && (
                  <SearchResults
                    results={searchResults}
                    onSelect={handleSelectMovie}
                  />
                )}
              </div>

              <button
                className="btn-reset nav__link login_btn"
                onClick={handleLoginClick}
              >
                {isLogged && user ? `${user.name}` : 'Войти'}
              </button>
            </>
          )}
        </div>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </header>
  );
};

export default Header;
