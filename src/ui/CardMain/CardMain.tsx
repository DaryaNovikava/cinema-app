import './CardMain.css';
import posterImage from '../../assets/images/card-image.png';
import { Link } from 'react-router-dom';

type CardProps = {
  id: number;
  originalTitle: string;
  posterUrl: string | undefined;
  onRemove?: (id: number) => void;
  showRemoveButton?: boolean;
};

export const CardMain: React.FC<CardProps> = ({
  id,
  originalTitle,
  posterUrl,
  onRemove,
  showRemoveButton,
}) => {
  return (
    <article className="card">
      <Link to={`/movie/${id}`} className="card_link">
        <img
          className="card_image"
          src={posterUrl || posterImage}
          alt={originalTitle}
        />
      </Link>
      {showRemoveButton && onRemove && (
        <button
          className="remove_button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(id);
          }}
        />
      )}
    </article>
  );
};

export default CardMain;
