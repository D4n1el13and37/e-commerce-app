// import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/ui/button/Button';

import emptyImage from './empty.svg';

import cl from './EmptyCart.module.scss';

const EmptyCart = () => {
  const navigate = useNavigate();
  const handleNavigation = () => navigate('/catalog');

  return (
    <div className={cl.wrapper}>
      <div className={cl.left_side__wrapper}>
        <h4 className={cl.left_side__title}>
          Oh snap! <br /> Our basket needs some blooming buddies!
        </h4>
        <Button onClick={handleNavigation} isMain={true}>
          Go to shop
        </Button>
      </div>
      <div className={cl.right_side__wrapper}>
        <img src={emptyImage} alt="funny plants at shopping cart" />
      </div>
    </div>
  );
};

export default EmptyCart;
