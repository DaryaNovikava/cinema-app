import React, { useState, useEffect } from 'react';
import './SectionAboutMovie.css';
import { MovieSchema } from '../../api/Movie';
import { useMoviesData } from '../../api/Movie';
import { Movie } from '../../api/Movie';
import { API_URL } from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import RatingInfo from '../../ui/RatingInfo/RatingInfo';
import formatRuntime from '../../utils/formatRuntime';
import { Button } from '../../ui/Button/Button';
import { ButtonLike } from '../../ui/ButtonLike/ButtonLike';
import { ButtonUpdate } from '../../ui/ButtonUpdate/ButtonUpdate';
import placeholderImage from '../../assets/images/film-image.png';
import MovieInfoTable from '../MovieInfoTable/MovieInfoTable';
import { useNavigate } from 'react-router-dom';
import ModalTrailer from '../ModalTrailer/ModalTrailer';

interface SectionAboutMovieProps {
  movieId?: number;
  hideAboutButton?: boolean;
  hideUpdateButton?: boolean;
  hideMovieInfo?: boolean;
  isMoviePage?: boolean;
}

export const SectionAboutMovie: React.FC<SectionAboutMovieProps> = ({
  movieId,
  hideAboutButton,
  hideUpdateButton,
  hideMovieInfo,
  isMoviePage,
}) => {
  const navigate = useNavigate();
  const fetchUrl = movieId
    ? `${API_URL}movie/${movieId}`
    : `${API_URL}movie/random`;
  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useMoviesData<Movie>(fetchUrl, MovieSchema);
  const runtimeMovie = movie?.runtime;
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [movie]);

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
      setIsTrailerOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsTrailerOpen(false);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <section className="hero">
      {isLoading ? (
        <div className="container" style={{ height: '400px' }}>
          <Loader />
        </div>
      ) : isError ? (
        <div className="container">Error fetching movie</div>
      ) : movie ? (
        <div className="container container_movie">
          <div className="hero-preview">
            <div className="hero__content">
              <div className="hero-info">
                <RatingInfo size="Large" rating={movie.tmdbRating} />
                <span className="hero-info_text">{movie.releaseYear}</span>
                <span className="hero-info_text">{movie.genres[0]}</span>
                <span className="hero-info_text">
                  {formatRuntime(runtimeMovie)}
                </span>
              </div>
              <h1 className="hero__title">{movie.title}</h1>
              <p className="hero__descr">{movie.plot}</p>
              <div
                className={`hero__buttons ${isMoviePage ? 'hero__buttons--movie-page' : 'hero__buttons--main-page'}`}
              >
                <Button
                  type="button"
                  kind="primary"
                  onClick={handleTrailerClick}
                  style={{ width: '171px' }}
                >
                  Trailer
                </Button>
                {!hideAboutButton && (
                  <Button
                    type="button"
                    kind="secondary"
                    onClick={handleAboutClick}
                    style={{ width: '171px' }}
                  >
                    About
                  </Button>
                )}
                <ButtonLike movieId={movie.id} />
                {!hideUpdateButton && (
                  <ButtonUpdate onClick={handleUpdateClick} />
                )}
              </div>
            </div>

            <div className="hero-img-container">
              {movie && !isImageLoaded && (
                <div
                  style={{
                    position: 'absolute',
                    top: '200px',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Loader />
                </div>
              )}
              <img
                className="hero-img"
                src={movie.backdropUrl || placeholderImage}
                alt={movie.title}
                onLoad={handleImageLoad}
                style={{
                  visibility: isImageLoaded ? 'visible' : 'hidden',
                  position: isImageLoaded ? 'relative' : 'absolute',
                }}
              />
            </div>
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
        <div className="container">Movies list is empty</div>
      )}

      <ModalTrailer
        trailerUrl={movie?.trailerUrl || ''}
        isOpen={isTrailerOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default SectionAboutMovie;
