import { SectionAboutMovie } from '../../components/SectionAboutMovie/SectionAboutMovie';
import SectionTopMovies from '../../components/SectionTopMovies/SectionTopMovies';

export const MainPage: React.FC = () => {
  return (
    <>
      <SectionAboutMovie
        hideAboutButton={false}
        hideUpdateButton={false}
        hideMovieInfo={true}
        isMoviePage={false}
      />
      <SectionTopMovies />
    </>
  );
};

export default MainPage;
