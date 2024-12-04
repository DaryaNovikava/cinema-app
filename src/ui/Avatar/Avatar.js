import { jsx as _jsx } from "react/jsx-runtime";
import "./Avatar.css";
const Avatar = ({ src }) => {
    return (_jsx("div", { className: "profile", children: _jsx("img", { alt: "profile", src: src }) }));
};
export default Avatar;
