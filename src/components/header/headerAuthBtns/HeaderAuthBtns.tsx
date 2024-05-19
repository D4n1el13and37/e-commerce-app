import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/Button';
import classes from '../Header.module.scss';

const HeaderAuthBtns: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('login');
  };

  const handleRegistartionClick = () => {
    navigate('registration');
  };

  return (
    <ul className={classes.shop_nav__list}>
      <li>
        <Button type="submit" isMain={true} onClick={handleLoginClick}>
          Log In
        </Button>
      </li>
      <li>
        <Button
          type="submit"
          isMain={true}
          isFilled={true}
          onClick={handleRegistartionClick}
        >
          Sign Up
        </Button>
      </li>
    </ul>
  );
};

export default HeaderAuthBtns;
