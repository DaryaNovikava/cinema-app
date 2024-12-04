import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import formatCurrency from '../../utils/formatCurrency';
import { getLanguage } from '../../utils/getLanguage';
import useResize from '../../utils/useResize';
import './MovieInfoTable.css';
export const MovieInfoTable = ({ language, budget, revenue, director, production, awardsSummary, }) => {
    const { width } = useResize();
    const isMobile = Boolean(width < 576);
    return (_jsxs("div", { className: "movie-info-table", children: [_jsx("h2", { className: "movie-info-table__title", children: "\u041E \u0444\u0438\u043B\u044C\u043C\u0435" }), _jsx("table", { className: "movie-info-table__table", children: _jsxs("tbody", { children: [_jsxs("tr", { className: "movie-info-table__row", children: [_jsx("td", { className: "movie-info-table__label", children: "\u042F\u0437\u044B\u043A \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u0430" }), _jsx("td", { className: `movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}` }), _jsx("td", { className: "movie-info-table__value", children: getLanguage(language) })] }), budget && (_jsxs("tr", { className: "movie-info-table__row", children: [_jsx("td", { className: "movie-info-table__label", children: "\u0411\u044E\u0434\u0436\u0435\u0442" }), _jsx("td", { className: `movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}` }), _jsx("td", { className: "movie-info-table__value", children: formatCurrency(budget) })] })), revenue && (_jsxs("tr", { className: "movie-info-table__row", children: [_jsx("td", { className: "movie-info-table__label", children: "\u0412\u044B\u0440\u0443\u0447\u043A\u0430" }), _jsx("td", { className: `movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}` }), _jsx("td", { className: "movie-info-table__value", children: formatCurrency(revenue) })] })), director && (_jsxs("tr", { className: "movie-info-table__row", children: [_jsx("td", { className: "movie-info-table__label", children: "\u0420\u0435\u0436\u0438\u0441\u0441\u0435\u0440" }), _jsx("td", { className: `movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}` }), _jsx("td", { className: "movie-info-table__value", children: director })] })), production && (_jsxs("tr", { className: "movie-info-table__row", children: [_jsx("td", { className: "movie-info-table__label", children: "\u041F\u0440\u043E\u0434\u0430\u0448\u0435\u043D" }), _jsx("td", { className: `movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}` }), _jsx("td", { className: "movie-info-table__value", children: production })] })), awardsSummary && (_jsxs("tr", { className: "movie-info-table__row", children: [_jsx("td", { className: "movie-info-table__label", children: "\u041D\u0430\u0433\u0440\u0430\u0434\u044B" }), _jsx("td", { className: `movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}` }), _jsx("td", { className: "movie-info-table__value", children: awardsSummary })] }))] }) })] }));
};
export default MovieInfoTable;