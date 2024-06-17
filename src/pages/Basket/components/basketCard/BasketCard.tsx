import React, { useState } from 'react';
import { Attribute, Image, Price } from '@commercetools/platform-sdk';

import Button from '../../../../components/ui/button/Button';
import cl from './BasketCard.module.scss';
import AttributesBlock from '../attributes/AttributesBlock';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { getChangeQuantity } from '../../../../store/cartSlice';
import PriceBlock from '../price/PriceBlock';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
// import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';

export interface BasketItem {
  id: string;
  productId: string;
  name: string;
  price: Price;
  image: Image[];
  attributes: Attribute[];
  quantity: number;
  totalPrice: number;
}
const BasketCard: React.FC<BasketItem> = ({
  id,
  productId,
  name,
  price,
  image,
  attributes,
  quantity,
  // totalPrice,
}: BasketItem) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(quantity);
  // const [totalProductPrice, setTotalProductPrice] = useState(totalPrice);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeQuantity = (productQuantity: number) => {
    dispatch(getChangeQuantity({ productId: id, quantity: productQuantity }));
  };

  const increment = () => {
    if (count < 99) {
      handleChangeQuantity(count + 1);
      setCount(count + 1);
    } else {
      setErrorMessage('We dont have enought plant in stock');
    }
  };
  const decrement = () => {
    if (count > 1) {
      handleChangeQuantity(count - 1);
      setCount(count - 1);
    } else {
      setErrorMessage('Sorry but we cant take your plants L_L');
    }
  };

  const DISCOUNT = price.discounted?.value.centAmount;

  return (
    <div className={cl.card__wrapper}>
      <div className={cl.left_side__wrapper}>
        <img src={image[0].url} alt={image[0].label} />
      </div>
      <div className={cl.right_side__wrapper}>
        <div className={cl.right_side__headline}>
          <h4 className={cl.right_side__title}>{name}</h4>
        </div>
        <PriceBlock price={price} />

        <div className={cl.right_side__attributes}>
          <AttributesBlock attributes={attributes} id={productId} />
        </div>
        <div className={cl.right_side__goods_controller}>
          <div className={cl.right_side__goods_controller__block}>
            <Button onClick={decrement}>-</Button>
            <div className={cl.right_side__goods_controller__total_count}>
              {count}
            </div>
            <Button onClick={increment}>+</Button>
          </div>
          <div className={cl.right_side__total_wrapper}>
            <strong className={cl.right_side__total}>Total Price:</strong>
            <div className={cl.price__total_by_product}>
              {DISCOUNT ? (
                <>
                  <span className={cl.price__old}>
                    {madeCorrectOutputPrice(count * price.value.centAmount!)}
                  </span>
                  <span>
                    {madeCorrectOutputPrice(
                      count * Number(price.discounted?.value.centAmount) || 0
                    )}
                  </span>
                </>
              ) : (
                <span>
                  {madeCorrectOutputPrice(
                    count * Number(price.discounted?.value.centAmount) || 0
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className={cl.right_side__goods_controller__error}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasketCard;
