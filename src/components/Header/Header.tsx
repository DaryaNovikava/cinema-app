import './header.css';
import SearchInput from '../../ui/SearchInput/SearchInput';
import {
  useMoviesData,
  MovieList,
  API_URL,
  MovieListSchema,
} from '../../api/Movie';
import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
import Modal from '../Modal/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../hooks/useModal';

const Header: React.FC = () => {
  const [searchMovie, setSearchMovie] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MovieList>([]);
  const [isResultsVisible, setResultsVisible] = useState<boolean>(false);
  const { user, isLogged } = useAuth();
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const { data: movies } = useMoviesData<MovieList>(
    API_URL + 'movie/',
    MovieListSchema,
  );

  useEffect(() => {
    if (searchMovie.trim() !== '' && movies) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchMovie.toLowerCase()),
      );
      setSearchResults(filteredMovies);
      setResultsVisible(true);
    } else {
      setResultsVisible(false);
    }
  }, [searchMovie, movies]);

  const handleSearchMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const handleSelectMovie = (id: number) => {
    navigate(`/movie/${id}`);
    setResultsVisible(false);
    setSearchMovie('');
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
          <SearchInput value={searchMovie} onChange={handleSearchMovie} />
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
