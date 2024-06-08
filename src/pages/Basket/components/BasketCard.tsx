import { useState } from 'react';
import Button from '../../../components/ui/button/Button';

import cl from './BasketCard.module.scss';

const BasketCard = () => {
  const [count, setCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const increment = () => {
    if (count < 99) {
      setCount(count + 1);
    } else {
      setErrorMessage('We dont have enought plant in stock');
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setErrorMessage('Sorry but we cant take your plants L_L');
    }
  };

  return (
    <div className={cl.card__wrapper}>
      <div className={cl.left_side__wrapper}>
        <img src="img" alt="card image" />
      </div>
      <div className={cl.right_side__wrapper}>
        <h4 className={cl.right_side__title}>Philodendron</h4>
        <span className={cl.right_side__price}>Price 39.99 $</span>
        <div className={cl.right_side__attributes}>
          Here should be some attributes
        </div>
        <div className={cl.right_side__goods_controller}>
          <Button onClick={decrement}>-</Button>
          <div className={cl.right_side__goods_controller__total}>{count}</div>
          <Button onClick={increment}>+</Button>
        </div>
        <div className={cl.right_side__goods_controller__error}>
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
