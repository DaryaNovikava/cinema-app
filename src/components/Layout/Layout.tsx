import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import { useModalContext } from '../../contexts/ModalContext';
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import {
  API_URL,
  MovieListSchema,
  MovieList,
  fetchMoviesData,
} from '../../api/Movie';

export const Layout: React.FC = () => {
  const { isModalOpen, closeModal } = useModalContext();
  const [searchMovie, setSearchMovie] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MovieList>([]);
  const [isResultsVisible, setResultsVisible] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user, closeModal]);

  useEffect(() => {
    const searchMoviesByTitle = async () => {
      if (searchMovie.trim() === '') {
        setResultsVisible(false);
        setSearchResults([]);
        return;
      }

      try {
        const url = `${API_URL}movie?title=${encodeURIComponent(searchMovie)}&count=100`;
        const data = await fetchMoviesData(url, MovieListSchema);
        setSearchResults(data);
        setResultsVisible(true);
      } catch (error) {
        console.error('Ошибка при загрузке фильмов по названию:', error);
      }
    };

    searchMoviesByTitle();
  }, [searchMovie]);

  const handleSearchMovie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMovie(event.target.value);
  };

  const hideSearchResults = () => {
    setResultsVisible(false);
    setSearchMovie('');
    console.log('Результаты скрыты');
  };

  return (
    <>
      <Header
        searchMovie={searchMovie}
        onSearchMovie={handleSearchMovie}
        isResultsVisible={isResultsVisible}
        searchResults={searchResults}
        onHideResults={hideSearchResults}
      />
      <main>
        <Outlet />
      </main>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Layout;
