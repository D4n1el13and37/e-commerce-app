import React, { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isMain?: boolean;
  isDisabled?: boolean;
  isFilled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  isMain,
  isDisabled,
  isFilled,
  children,
  ...props
}) => (
  <button
    data-testid="button"
    disabled={isDisabled}
    className={`${isMain ? `${classes.main} ` : ''}${isFilled ? `${classes.filled} ` : ''}${classes.button}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
