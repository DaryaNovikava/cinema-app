import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './CardGenre.css';
import { Link } from 'react-router-dom';
import posterUrl from '../../assets/images/card-image.png';
export const CardGenre = ({ genre, image }) => {
    return (_jsx(Link, { to: `/movie/genres/${genre}`, children: _jsxs("article", { className: "card card-genre__page", children: [_jsx("img", { className: "card-genre__image", src: image || posterUrl, alt: genre }), _jsx("h3", { className: "card-genre__title", children: genre[0].toUpperCase() + genre.slice(1).toLowerCase() })] }) }));
};
