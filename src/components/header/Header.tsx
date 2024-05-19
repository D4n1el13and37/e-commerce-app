import React, { useCallback, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.svg';
import classes from './Header.module.scss';
import HeaderAuthButtons from './headerAuthBtns/HeaderAuthButtons';
import Button from '../ui/button/Button';
// import HeaderUser from './headerUser/HeaderUser';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Home', path: '/', isActive: true },
    { name: 'Catalog', path: '/catalog', isActive: false },
    { name: 'About', path: '/about', isActive: false },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;

    if (isMenuOpen) {
      body.classList.add('stop-scroll');
    } else {
      body.classList.remove('stop-scroll');
    }

    return () => {
      body.classList.remove('stop-scroll');
    };
  }, [isMenuOpen]);

  return (
    <header>
      <div className={classes.header__container}>
        <Link to="/" className={classes.header__logo}>
          <img src={Logo} alt="Site logo YesToPlants" />
        </Link>
        <div className={classes.header__content}>
          <nav
            className={`${classes.nav} ${isMenuOpen ? classes.nav_active : ''}`}
          >
            <div className={classes.nav__content}>
              <ul className={classes.nav__list}>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? classes.nav__link_active : classes.nav__link
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <HeaderAuthButtons />
              {/* <HeaderUser /> */}
            </div>
          </nav>
          <a href="/card" className={classes.card} aria-label="Shopping card">
            <span className={classes.card__quantity}>16</span>
          </a>
        </div>

        <Button
          className={`${classes.burger} ${isMenuOpen ? `${classes.burger__active}` : ''}`}
          aria-label="Open menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
          onClick={toggleMenu}
        >
          <span className={classes.burger__line}></span>
          <span className={classes.burger__line}></span>
          <span className={classes.burger__line}></span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
