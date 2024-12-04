import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { SectionAboutMovie } from '../../components/SectionAboutMovie/SectionAboutMovie';
import SectionTopMovies from '../../components/SectionTopMovies/SectionTopMovies';
export const MainPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx(SectionAboutMovie, { hideAboutButton: false, hideUpdateButton: false, hideMovieInfo: true, isMoviePage: false }), _jsx(SectionTopMovies, {})] }));
};
export default MainPage;
