import formatCurrency from "../../utils/formatCurrency";
import { getLanguage } from "../../utils/getLanguage";
import './MovieInfoTable.css';

type MovieInfoTableProps = {
  language: string;
  budget: string  | null | undefined;
  revenue: string | null | undefined;
  director: string | null | undefined;
  production: string | null | undefined;
  awardsSummary: string | null | undefined;
};

export const MovieInfoTable: React.FC<MovieInfoTableProps> = ({
  language,
  budget,
  revenue,
  director,
  production,
  awardsSummary,
}) => {
  return (
    <div className="movie-info-table">
      <h2 className="movie-info-table__title">О фильме</h2>
       <table className="movie-info-table__table">
        <tbody>
          <tr className="movie-info-table__row">
            <td className="movie-info-table__label">Язык оригинала</td>
            <td className="movie-info-table__dots"></td>
            <td className="movie-info-table__value">{getLanguage(language)}</td>
          </tr>
          {budget && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Бюджет</td>
              <td className="movie-info-table__dots"></td>
              <td className="movie-info-table__value">{formatCurrency(budget)}</td>
            </tr>
          )}
           {revenue && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Выручка</td>
              <td className="movie-info-table__dots"></td>
              <td className="movie-info-table__value">{formatCurrency(revenue)}</td>
            </tr>
          )}
           {director && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Режиссер</td>
              <td className="movie-info-table__dots"></td>
              <td className="movie-info-table__value">{director}</td>
            </tr>
          )}
           {production && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Продашен</td>
              <td className="movie-info-table__dots"></td>
              <td className="movie-info-table__value">{production}</td>
            </tr>
          )}
          {awardsSummary && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Награды</td>
              <td className="movie-info-table__dots"></td>
              <td className="movie-info-table__value">{awardsSummary}</td>
            </tr>
          )}
        </tbody>
       </table>
    </div>
  )
}

export default MovieInfoTable
