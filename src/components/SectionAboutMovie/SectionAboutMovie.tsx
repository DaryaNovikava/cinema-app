import React, { useState } from 'react';
import './SectionAboutMovie.css';
import { MovieSchema } from "../../api/Movie";
import { useMoviesData } from "../../api/Movie";
import { Movie } from "../../api/Movie";
import { API_URL } from "../../api/Movie";
import Loader from "../../ui/Loader/Loader";
import RatingInfo from "../../ui/RatingInfo/RatingInfo";
import formatRuntime from '../../utils/formatRuntime';
import { Button } from '../../ui/Button/Button';
import {ButtonLike } from '../../ui/ButtonLike/ButtonLike';
import { ButtonUpdate}  from '../../ui/ButtonUpdate/ButtonUpdate';
import placeholderImage from '../../assets/images/film-image.png';
import MovieInfoTable from '../MovieInfoTable/MovieInfoTable';
import { useNavigate } from 'react-router-dom';
import ModalTrailer from '../ModalTrailer/ModalTrailer';

interface SectionAboutMovieProps {
  movieId?: number;
  hideAboutButton?: boolean;
  hideUpdateButton?: boolean;
  hideMovieInfo?: boolean;
}

export const SectionAboutMovie: React.FC<SectionAboutMovieProps>  = ({ movieId, hideAboutButton, hideUpdateButton, hideMovieInfo }) => {
  const navigate = useNavigate();
  const fetchUrl = movieId ? `${API_URL}movie/${movieId}` : `${API_URL}movie/random`;
  const { data: movie, isLoading, isError, refetch } = useMoviesData<Movie>(fetchUrl, MovieSchema);
  const runtimeMovie = movie?.runtime;
  const [isTrailerOpen, setIsTrailerOpen] = useState(false); // Состояние для модального окна

  const handleUpdateClick = () => {
    if (!movieId) {
      refetch();
    }
  };

  const handleAboutClick = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  const handleTrailerClick = () => {
    if (movie?.trailerUrl) {
      setIsTrailerOpen(true); // Открыть модальное окно
      console.log(movie.trailerUrl)
    }
  };

  const handleCloseModal = () => {
    setIsTrailerOpen(false); // Закрыть модальное окно
  };

  console.log(movie)
  return (
    <section className="hero">
    { isLoading ? (
      <Loader />
    ) : isError? (
      <div>Error fetching movie</div>
    ) : movie ? (

      <div className="container container_movie">
        <div className='hero-preview'>
          <div className="hero__content">
            <div className="hero-info">
            <RatingInfo size="Large" rating={movie.tmdbRating}/>
            <span className='hero-info_text'>{movie.releaseYear}</span>
            <span className='hero-info_text'>{movie.genres[0]}</span>
            <span className='hero-info_text'>{formatRuntime(runtimeMovie)}</span>
          </div>
          <h1 className="hero__title">
            {movie.title}
          </h1>
          <p className="hero__descr">
            {movie.plot}
          </p>
          <div className="hero__buttons">
          <Button type="button" kind="primary" onClick={handleTrailerClick} style={{width:"171px"}}>
            Трейлер
          </Button>
          {!hideAboutButton && (
            <Button
              type="button"
              kind="secondary"
              onClick={handleAboutClick}
              style={{width:"171px"}}
            >
              О фильме
            </Button>
          )}
          <ButtonLike movieId={movie.id} />
          {!hideUpdateButton && <ButtonUpdate onClick={handleUpdateClick}/>}

          </div>

      </div>
        <img className='hero-img' src={movie.backdropUrl || placeholderImage} alt={movie.title} />
        </div>
      {!hideMovieInfo && (
        <MovieInfoTable
          language={movie.language}
          budget={movie.budget}
          revenue={movie.revenue}
          director={movie.director}
          production={movie.production}
          awardsSummary={movie.awardsSummary}
        />
      )}
      </div>
    ) : (
      <div>Movies list is empty</div>
    )}

      {/* Модальное окно с трейлером */}
      <ModalTrailer trailerUrl={movie?.trailerUrl || ''} isOpen={isTrailerOpen} onClose={handleCloseModal} />
     </section>
  );
};

export default SectionAboutMovie;
