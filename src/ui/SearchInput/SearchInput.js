import { jsx as _jsx } from "react/jsx-runtime";
import './SearchInput.css';
export const SearchInput = ({ value, onChange, onBlur, autoFocus, }) => {
    return (_jsx("input", { placeholder: "\u041F\u043E\u0438\u0441\u043A", className: "search-input", value: value, onChange: onChange, onBlur: onBlur, autoFocus: autoFocus }));
};
export default SearchInput;
