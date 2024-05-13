import React from 'react';
import Logo from './Logo.svg';
import classes from './Header.module.scss';
// import HeaderUser from '../headerUser/HeaderUser';
import HeaderAuthBtns from '../headerAuthBtns/HeaderAuthBtns.tsx';

const Header: React.FC = () => (
  <header>
    <div className={classes.header__container}>
      <a href="/">
        <img src={Logo} alt="Site logo YesToPlants" />
      </a>
      <nav>
        <ul className={classes.nav__list}>
          <li>
            <a
              href="#"
              className={`${classes.nav__link} ${classes.nav__link_active}`}
            >
              Home
            </a>
          </li>
          <li>
            <a href="#" className={classes.nav__link}>
              Catalog
            </a>
          </li>
          <li>
            <a href="#" className={classes.nav__link}>
              About
            </a>
          </li>
        </ul>
      </nav>
      <div className={classes.header__links}>
        <HeaderAuthBtns />
        {/* <HeaderUser /> */}
        <a href="#" className={classes.card} aria-label="Shopping card">
          <span className={classes.card__quantity}>16</span>
        </a>
      </div>
    </div>
  </header>
);

export default Header;
