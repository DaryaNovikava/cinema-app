import { jsx as _jsx } from "react/jsx-runtime";
import FetchGenresList from '../../components/GenresList/FetchGenresList';
const GenresPage = () => {
    return (_jsx("div", { className: "genres-page", children: _jsx(FetchGenresList, {}) }));
};
export default GenresPage;
