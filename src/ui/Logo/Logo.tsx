import LogoIcon from '../../assets/stair.svg';
import React from 'react';
import './Logo.css';

interface LogoProps {
  width: number;
  height: number;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
  return (
    <div className="logo">
      <img
        src={LogoIcon}
        width={width}
        height={height}
        className="logo__icon"
        alt="Logo"
      />
      {/* <span>Eats</span> */}
    </div>
  );
};
export default Logo;
