import './header.css';
import SearchInput from '../../ui/SearchInput/SearchInput';
import { useEffect } from 'react';
import logo from '../../assets/images/logo.svg';
import { MovieList } from '../../api/Movie';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
import Modal from '../Modal/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../hooks/useModal';

interface HeaderProps {
  searchMovie: string;
  onSearchMovie: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isResultsVisible: boolean;
  searchResults: MovieList;
}

const Header: React.FC<HeaderProps> = ({
  searchMovie,
  onSearchMovie,
  isResultsVisible,
  searchResults,
}) => {
  const { user, isLogged } = useAuth();
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleSelectMovie = (id: number) => {
    navigate(`/movie/${id}`);
  };

  const handleLoginClick = () => {
    if (isLogged) {
      navigate(`/account/${user?.surname}`);
    } else {
      openModal();
    }
  };

  useEffect(() => {
    if (isLogged && isModalOpen) {
      closeModal();
    }
  }, [isLogged, isModalOpen, closeModal]);

  return (
    <header className="header">
      <div className="container header__box">
        <Link to="/">
          <img
            src={logo}
            alt="Лого сайта CinemaGuide"
            className="header__logo"
          />
        </Link>
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
        <div className="search-wrapper">
          <SearchInput value={searchMovie} onChange={onSearchMovie} />
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
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </header>
  );
};

export default Header;
