import React, { useCallback, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import HeaderAuthButtons from './headerAuthBtns/HeaderAuthButtons';
import HeaderUser from './headerUser/HeaderUser';
import useAppSelector from '../../hooks/useAppSelector';
import BurgerMenu from './burgerMenu/burgerMenu';

import Logo from './Logo.svg';
import classes from './Header.module.scss';

const navLinks = [
  { name: 'Home', path: '/', isActive: true },
  { name: 'Catalog', path: '/catalog', isActive: false },
  { name: 'About', path: '/about', isActive: false },
];

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    body.classList.toggle('stop-scroll', isMenuOpen);

    const handleResize = () => {
      if (window.innerWidth > 900 && isMenuOpen) {
        setMenuOpen(false);
        body.classList.remove('stop-scroll');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      body.classList.remove('stop-scroll');
    };
  }, [isMenuOpen]);

  const isAuthorized = useAppSelector((state) => state.auth.isAutorized);
  const isCart = useAppSelector((state) => state.cart.cart);

  return (
    <header>
      <div className={classes.header__container}>
        <Link to="/" className={classes.header__logo}>
          <img src={Logo} alt="Site logo YesToPlants" />
        </Link>
        <div className={classes.header__content}>
          <nav
            className={cn(classes.nav, {
              [classes.nav_active]: isMenuOpen,
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
              {!isAuthorized && <HeaderAuthButtons />}
              {isAuthorized && <HeaderUser />}
            </div>
          </nav>
          <a
            href="/basket"
            className={classes.basket}
            aria-label="Shopping cart"
          >
            {isCart.lineItems?.length > 0 && (
              <span className={classes.basket__quantity}>
                {isCart.lineItems.length}
              </span>
            )}
          </a>
        </div>

        <BurgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
