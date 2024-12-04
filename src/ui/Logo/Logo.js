import { jsx as _jsx } from "react/jsx-runtime";
import LogoIcon from '../../assets/stair.svg';
import './Logo.css';
const Logo = ({ width, height }) => {
    return (_jsx("div", { className: "logo", children: _jsx("img", { src: LogoIcon, width: width, height: height, className: "logo__icon", alt: "Logo" }) }));
};
export default Logo;
