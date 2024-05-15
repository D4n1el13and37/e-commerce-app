import React from 'react';
import Button from '../../ui/button/Button';
import classes from '../Header.module.scss';

const HeaderAuthBtns: React.FC = () => (
  <ul className={classes.shop_nav__list}>
    <li>
      <Button type="submit" isMain={true}>
        Log In
      </Button>
    </li>
    <li>
      <Button type="submit" isMain={true} isFilled={true}>
        Sig In
      </Button>
    </li>
  </ul>
);

export default HeaderAuthBtns;
