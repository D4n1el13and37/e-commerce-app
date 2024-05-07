import React from 'react';
import classes from './Button.module.scss';

interface ButtonInterface {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  title?: string;
  isMain?: boolean;
  children?: React.ReactNode;
  isDisabled?: boolean;
  isFilled?: boolean;
}

function Button({ ...props }: ButtonInterface) {
  return (
    <button
      disabled={props.isDisabled}
      onClick={props.onClick}
      title={props.title}
      className={`${props.isMain ? classes.main : ''} ${props.isFilled ? classes.filled : ''} ${classes.button}`}
      type={props.type || 'button'}
    >
      {props.children}
    </button>
  );
}

export default Button;
