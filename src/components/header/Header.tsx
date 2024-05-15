import React from 'react';
import Logo from './Logo.svg';
import classes from './Header.module.scss';
import HeaderAuthBtns from './headerAuthBtns/HeaderAuthBtns';
// import HeaderUser from './headerUser/HeaderUser';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Home', path: '/', isActive: true },
    { name: 'Catalog', path: '/catalog', isActive: false },
    { name: 'About', path: '/about', isActive: false },
  ];

  return (
    <header>
      <div className={classes.header__container}>
        <a href="/">
          <img src={Logo} alt="Site logo YesToPlants" />
        </a>
        <nav>
          <ul className={classes.nav__list}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.path}
                  className={`${classes.nav__link} ${
                    link.isActive ? classes.nav__link_active : ''
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
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
};

export default Header;
