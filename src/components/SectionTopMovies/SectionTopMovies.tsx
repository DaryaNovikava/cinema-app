import './SectionTopMovies.css';
import {
  API_URL,
  MovieList,
  MovieListSchema,
  useMoviesData,
} from '../../api/Movie';
import Loader from '../../ui/Loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useResize from '../../utils/useResize';
import MoviesList from '../MoviesList/MoviesList';
import CardMain from '../../ui/CardMain/CardMain';

export const SectionTopMovies: React.FC = () => {
  const { width } = useResize();
  const showSlider = Boolean(width < 768);
  const {
    data: movies,
    isLoading,
    isError,
  } = useMoviesData<MovieList>(API_URL + 'movie/top10', MovieListSchema);

  return (
    <section>
      {isLoading ? (
        <div className="container" style={{ height: '400px' }}>
          <Loader />
        </div>
      ) : isError ? (
        <div className="container">
          <h2 className="section__title">Top 10 Movies</h2>
          <p>Error fetching movies </p>
        </div>
      ) : movies ? (
        <div className="container section-top">
          <h2 className="section__title">Top 10 Movies</h2>
          {showSlider ? (
            <div className="movies-slider">
              <Swiper
                spaceBetween={1}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                  576: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {movies.map((movie) => (
                  <SwiperSlide key={movie.id} className="custom-slide">
                    <CardMain
                      id={movie.id}
                      originalTitle={movie.originalTitle}
                      posterUrl={movie.posterUrl}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <MoviesList movies={movies} />
          )}
        </div>
      ) : (
        <div>Movies list is empty</div>
      )}
    </section>
  );
};

export default SectionTopMovies;
