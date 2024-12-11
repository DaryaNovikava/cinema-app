import formatCurrency from '../../utils/formatCurrency';
import { getLanguage } from '../../utils/getLanguage';
import useResize from '../../utils/useResize';
import './MovieInfoTable.css';

type MovieInfoTableProps = {
  language: string;
  budget: string | null | undefined;
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
  const { width } = useResize();
  const isMobile = Boolean(width < 576);

  return (
    <div className="movie-info-table">
      <h2 className="movie-info-table__title">About the film</h2>
      <table className="movie-info-table__table">
        <tbody>
          <tr className="movie-info-table__row">
            <td className="movie-info-table__label">Original language</td>
            <td
              className={`movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}`}
            ></td>
            <td className="movie-info-table__value">{getLanguage(language)}</td>
          </tr>
          {budget && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Budget</td>
              <td
                className={`movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}`}
              ></td>
              <td className="movie-info-table__value">
                {formatCurrency(budget)}
              </td>
            </tr>
          )}
          {revenue && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Revenue</td>
              <td
                className={`movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}`}
              ></td>
              <td className="movie-info-table__value">
                {formatCurrency(revenue)}
              </td>
            </tr>
          )}
          {director && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Director</td>
              <td
                className={`movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}`}
              ></td>
              <td className="movie-info-table__value">{director}</td>
            </tr>
          )}
          {production && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Production</td>
              <td
                className={`movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}`}
              ></td>
              <td className="movie-info-table__value">{production}</td>
            </tr>
          )}
          {awardsSummary && (
            <tr className="movie-info-table__row">
              <td className="movie-info-table__label">Awards</td>
              <td
                className={`movie-info-table__dots ${isMobile ? 'hidden__dots' : 'dots__visible'}`}
              ></td>
              <td className="movie-info-table__value">{awardsSummary}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieInfoTable;
