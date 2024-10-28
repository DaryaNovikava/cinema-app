import React from 'react';
import { Link } from 'react-router-dom';
import MoviePreview from '../MoviePreview/MoviePreview';
import { MovieList } from '../../api/Movie';
import "./SearchResults.css"

interface SearchResultsProps {
  results: MovieList;
  onSelect: (id: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <ul className="search-results list-reset">
      {results.map(movie => (
        <li key={movie.id} className="search-result-item">
          <Link to={`/movie/${movie.id}`} onClick={() => onSelect(movie.id)}>
            <MoviePreview movie={movie} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
