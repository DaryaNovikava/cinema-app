import { jsx as _jsx } from "react/jsx-runtime";
import './Loader.css';
const Loader = () => {
    return (_jsx("div", { className: "loader-container", children: _jsx("div", { className: "spinner" }) }));
};
export default Loader;
