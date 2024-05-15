import React, { useState, useCallback } from 'react';
import classes from './HeaderUser.module.scss';

const HeaderUser: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsActive((prevState) => !prevState);
  }, []);

  return (
    <div className={classes.container}>
      <button
        className={`${classes.button} ${isActive ? classes.active : ''}`}
        aria-expanded={isActive ? 'true' : 'false'}
        aria-controls="list"
        onClick={toggleMenu}
      ></button>

      <ul className={classes.menu} aria-hidden={!isActive}>
        <li className={classes.menu_item}>
          <a
            className={classes.menu_link}
            href="#"
            tabIndex={isActive ? 0 : -1}
          >
            Account
          </a>
        </li>
        <li className={classes.menu_item}>
          <a
            className={classes.menu_link}
            href="#"
            tabIndex={isActive ? 0 : -1}
          >
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderUser;
