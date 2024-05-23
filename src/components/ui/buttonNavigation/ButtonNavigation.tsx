import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import classes from './ButtonNavigation.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLeft?: boolean;
  isRight?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const ButtonNavigation: React.FC<ButtonProps> = ({
  isLeft,
  isRight,
  className,
  ...props
}) => {
  const renderIcon = () => {
    if (isLeft) {
      return (
        <svg
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.479 0.604126L2.02063 9.0625L10.479 17.5209"
            stroke="#758963"
            stroke-width="1.5"
          />
        </svg>
      );
    }

    if (isRight) {
      return (
        <svg
          width="11"
          height="19"
          viewBox="0 0 11 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.47998 17.5216L9.93835 9.06323L1.47998 0.60486"
            stroke="#758963"
            stroke-width="1.5"
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <button
      className={cn(classes.button, className, {
        [classes.left]: isLeft,
        [classes.right]: isRight,
      })}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};

export default ButtonNavigation;
