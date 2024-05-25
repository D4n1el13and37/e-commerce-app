import React, { useCallback, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import HeaderAuthButtons from './headerAuthBtns/HeaderAuthButtons';
import Button from '../ui/button/Button';
import HeaderUser from './headerUser/HeaderUser';
import useAppSelector from '../../hooks/useAppSelector';

import Logo from './Logo.svg';
import classes from './Header.module.scss';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Home', path: '/', isActive: true },
    { name: 'Catalog', path: '/catalog', isActive: false },
    { name: 'About', path: '/about', isActive: false },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setAnimating] = useState(false);

  const toggleMenu = useCallback(() => {
    if (isMenuOpen) {
      setAnimating(true);
      setMenuOpen(false);
    } else {
      setAnimating(false);
      setMenuOpen(true);
    }
  }, [isMenuOpen]);

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

  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);

  return (
    <header>
      <div className={classes.header__container}>
        <Link to="/" className={classes.header__logo}>
          <img src={Logo} alt="Site logo YesToPlants" />
        </Link>
        <div className={classes.header__content}>
          <nav
            className={cn(classes.nav, {
              [classes.nav_active]: isMenuOpen && !isAnimating,
              [classes.nav_closing]: isAnimating,
            })}
          >
            <div className={classes.nav__content}>
              <ul className={classes.nav__list}>
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        cn({
                          [classes.nav__link_active]: isActive,
                          [classes.nav__link]: !isActive,
                        })
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <HeaderAuthButtons />
              {isAuthorized && <HeaderUser />}
            </div>
          </nav>
          <a href="/card" className={classes.card} aria-label="Shopping card">
            <span className={classes.card__quantity}>16</span>
          </a>
        </div>

        <Button
          className={cn(classes.burger, {
            [classes.burger__active]: isMenuOpen,
          })}
          aria-label="Open menu"
          aria-expanded={isMenuOpen ? 'true' : 'false'}
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
                  stroke-miterlimit="10"
                  stroke-width="2"
                  className="burger__header"
                ></line>
                <line
                  x1="6"
                  y1="10"
                  x2="42"
                  y2="10"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  className="burger__header"
                ></line>
                <line
                  x1="6"
                  y1="24"
                  x2="42"
                  y2="24"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  className="burger__header"
                ></line>
              </svg>
            </i>
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
