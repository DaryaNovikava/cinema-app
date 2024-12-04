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

export const App: React.FC = () => {
  return (
    <BrowserRouter basename="/cinema-app">
      <AuthProvider>
        <FavoritesProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="movie/:movieId" element={<MoviePage />} />
                <Route path="movie/genres" element={<GenresPage />} />
                <Route
                  path="movie/genres/:genre"
                  element={<GenreMoviesPage />}
                />
                <Route path="/account/:userSurname" element={<AccountPage />} />
              </Route>
            </Routes>
          </ModalProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
