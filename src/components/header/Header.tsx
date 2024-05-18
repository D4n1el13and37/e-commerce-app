import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.svg';
import classes from './Header.module.scss';
import HeaderAuthBtns from './headerAuthBtns/HeaderAuthBtns';
// import HeaderUser from './headerUser/HeaderUser';

const Header: React.FC = () => {
  /*   const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  }; */

  const navLinks = [
    { name: 'Home', path: '/', isActive: true },
    { name: 'Catalog', path: '/catalog', isActive: false },
    { name: 'About', path: '/about', isActive: false },
  ];

  return (
    <header>
      <div className={classes.header__container}>
        <Link to="/">
          <img src={Logo} alt="Site logo YesToPlants" />
        </Link>
        <nav className={classes.nav}>
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
        </nav>
        <div className={classes.header__links}>
          {/* {!loggedIn && <HeaderAuthBtns />} */}
          {/* {loggedIn && <HeaderUser />} */}
          <HeaderAuthBtns />
          <a href="/card" className={classes.card} aria-label="Shopping card">
            <span className={classes.card__quantity}>16</span>
          </a>
        </div>

        <button className="burger" aria-label="Open menu" aria-expanded="false">
          <span className="burger__line"></span>
          <span className="burger__line"></span>
          <span className="burger__line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
