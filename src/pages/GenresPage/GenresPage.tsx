import { useParams } from "react-router-dom";
import FetchGenresList from "../../components/GenresList/FetchGenresList";

const GenresPage: React.FC = () => {
  const { genres } = useParams<{ genres: string }>();

  return (
    <div className="genres-page">
      <FetchGenresList/>
    </div>
  );
};

export default GenresPage;
