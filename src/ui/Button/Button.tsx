import { FC, HTMLAttributes } from 'react';
import './Button.css';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isDisabled?: boolean;
  kind?: 'primary' | 'secondary';
  type?: 'submit' | 'reset' | 'button';
}

export const Button: FC<IButtonProps> = ({
  isLoading,
  isDisabled = isLoading,
  kind = 'primary',
  type,
  ...props
}) => {
  return (
    <button
      disabled={isDisabled}
      type={type}
      className="button"
      data-kind={kind}
      {...props}
    ></button>
  );
};
