import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import classes from './HeaderUser.module.scss';
import Button from '../../ui/button/Button';
import { logout } from '../../../store/authSlice';
import useAppDispatch from '../../../hooks/useAppDispatch';

const HeaderUser: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsActive((prevState) => !prevState);
  }, []);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={classes.container}>
      <Button
        className={cn(classes.button, { [classes.active]: isActive })}
        aria-expanded={isActive ? 'true' : 'false'}
        aria-controls="list"
        onClick={toggleMenu}
      ></Button>

      <ul className={classes.menu} aria-hidden={!isActive}>
        {/* <li className={classes.menu_item}>
          <Button className={classes.menu_link} tabIndex={isActive ? 0 : -1}>
            Account
          </Button>
        </li> */}
        <li className={classes.menu_item}>
          <Button
            className={classes.menu_link}
            tabIndex={isActive ? 0 : -1}
            isMain={true}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default HeaderUser;
