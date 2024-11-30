import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onBlur,
  autoFocus,
}) => {
  return (
    <input
      placeholder="Поиск"
      className="search-input"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
    />
  );
};

export default SearchInput;
