import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './CardMain.css';
import posterImage from '../../assets/images/card-image.png';
import { Link } from 'react-router-dom';
export const CardMain = ({ id, originalTitle, posterUrl, onRemove, showRemoveButton, }) => {
    return (_jsxs("article", { className: "card", children: [_jsx(Link, { to: `/movie/${id}`, className: "card_link", children: _jsx("img", { className: "card_image", src: posterUrl || posterImage, alt: originalTitle }) }), showRemoveButton && onRemove && (_jsx("button", { className: "remove_button", onClick: (e) => {
                    e.stopPropagation();
                    onRemove(id);
                } }))] }));
};
export default CardMain;
