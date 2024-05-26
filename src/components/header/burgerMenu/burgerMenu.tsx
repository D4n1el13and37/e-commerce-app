import React from 'react';
import cn from 'classnames';
import classes from './burgerMenu.module.scss';
import Button from '../../ui/button/Button';

interface BurgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, toggleMenu }) => (
  <Button
    className={cn(classes.burger, {
      [classes.burger__active]: isMenuOpen,
    })}
    aria-label="Open menu"
    aria-expanded={isMenuOpen}
    onClick={toggleMenu}
  >
    <span className={classes.burger__wrapper}>
      <i className={classes.burger__i}>
        <svg viewBox="0 0 48 48">
          <line
            x1="6"
            y1="38"
            x2="42"
            y2="38"
            strokeMiterlimit="10"
            strokeWidth="2"
            className="burger__header"
          ></line>
          <line
            x1="6"
            y1="10"
            x2="42"
            y2="10"
            strokeMiterlimit="10"
            strokeWidth="2"
            className="burger__header"
          ></line>
          <line
            x1="6"
            y1="24"
            x2="42"
            y2="24"
            strokeMiterlimit="10"
            strokeWidth="2"
            className="burger__header"
          ></line>
        </svg>
      </i>
    </span>
  </Button>
);

export default BurgerMenu;
