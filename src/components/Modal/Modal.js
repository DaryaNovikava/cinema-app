import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AuthForm } from '../AuthForm/AuthForm';
import './Modal.css';
export const Modal = ({ isOpen, onClose }) => {
    if (!isOpen)
        return null;
    const handleOutsideClick = (event) => {
        if (event.target.classList.contains('modal-wrapper')) {
            onClose();
        }
    };
    return (_jsx("div", { className: "modal-wrapper", onClick: handleOutsideClick, children: _jsxs("div", { className: "modal-content", children: [_jsx("button", { className: "modal-button", onClick: onClose }), _jsx(AuthForm, {})] }) }));
};
export default Modal;
