import "./SearchInput.css"

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <input
      placeholder="Поиск"
      className="search-input"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
