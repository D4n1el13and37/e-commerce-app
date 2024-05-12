import React from 'react';
import Logo from './Logo.svg';
import classes from './Header.module.scss';
import Button from '../ui/button/Button';

const Header: React.FC = () => (
  <header>
    <div className={`${classes.header__container}`}>
      <a href="/">
        <img src={Logo} alt="Site logo YesToPlants" />
      </a>
      <nav>
        <ul className={`${classes.nav__list}`}>
          <li>
            <a
              href="#"
              className={`${classes.nav__link} ${classes.nav__link_active}`}
            >
              Home
            </a>
          </li>
          <li>
            <a href="#" className={`${classes.nav__link}`}>
              Catalog
            </a>
          </li>
          <li>
            <a href="#" className={`${classes.nav__link}`}>
              About
            </a>
          </li>
        </ul>
      </nav>
      <ul className={`${classes.shop_nav__list}`}>
        <li>
          <Button type="submit" isMain={true} isFilled={false}>
            Log In
          </Button>
        </li>
        <li>
          <Button type="submit" isMain={true} isFilled={true}>
            Sig In
          </Button>
        </li>
        <li className={`${classes.shop_nav__item_card}`}>
          <a href="#" className={`${classes.card}`} aria-label="Shopping card">
            <span className={`${classes.card__quantity}`}>16</span>
          </a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
