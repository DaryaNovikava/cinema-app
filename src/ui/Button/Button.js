import { jsx as _jsx } from "react/jsx-runtime";
import './Button.css';
export const Button = ({ isLoading, isDisabled = isLoading, kind = 'primary', type, ...props }) => {
    return (_jsx("button", { disabled: isDisabled, type: type, className: "button", "data-kind": kind, ...props }));
};
