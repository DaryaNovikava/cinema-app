import { jsx as _jsx } from "react/jsx-runtime";
import './UserView.css';
export const UserView = ({ userName, userSurname }) => {
    if (userName && userSurname) {
        return (_jsx("div", { className: "user-view", children: _jsx("div", { className: "user-view__logo", children: `${userName.slice(0, 1).toUpperCase()}${userSurname.slice(0, 1).toUpperCase()}` }) }));
    }
};
