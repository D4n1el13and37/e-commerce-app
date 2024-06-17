import React, { useState } from 'react';
import {
  Attribute,
  DiscountedLineItemPriceForQuantity,
  Image,
  Price,
} from '@commercetools/platform-sdk';

import Button from '../../../../components/ui/button/Button';
import cl from './BasketCard.module.scss';
import AttributesBlock from '../attributes/AttributesBlock';
import useAppDispatch from '../../../../hooks/useAppDispatch';
import { getChangeQuantity } from '../../../../store/cartSlice';
import PriceBlock from '../price/PriceBlock';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';

export interface BasketItem {
  id: string;
  productId: string;
  name: string;
  price: Price;
  image: Image[];
  attributes: Attribute[];
  quantity: number;
  discount?: DiscountedLineItemPriceForQuantity[];
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
  discount,
  totalPrice,
}: BasketItem) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeQuantity = (productQuantity: number) => {
    dispatch(getChangeQuantity({ productId: id, quantity: productQuantity }));
  };

  const handleAddProduct = () => {
    if (quantity < 50) {
      handleChangeQuantity(quantity + 1);
    } else {
      setErrorMessage('We dont have enought plant in stock');
    }
  };

  const handleDecreaseProduct = () => {
    if (quantity > 1) {
      handleChangeQuantity(quantity - 1);
    } else {
      setErrorMessage('Sorry but we cant take your plants L_L');
    }
  };

  const handleRemoveProduct = () => {
    handleChangeQuantity(0);
  };

  const discountPrice = Math.max(
    price.discounted?.value.centAmount || 0,
    discount![0]?.discountedPrice?.value.centAmount || 0
  );

  return (
    <div className={cl.card__wrapper}>
      <div className={cl.left_side__wrapper}>
        <img src={image[0].url} alt={image[0].label} />
      </div>
      <div className={cl.right_side__wrapper}>
        <div className={cl.right_side__headline}>
          <h4 className={cl.right_side__title}>{name}</h4>
          <Button onClick={handleRemoveProduct}>x</Button>
        </div>
        <PriceBlock price={price} />

        <div className={cl.right_side__attributes}>
          <AttributesBlock attributes={attributes} id={productId} />
        </div>
        <div className={cl.right_side__goods_controller}>
          <div className={cl.right_side__goods_controller__block}>
            <Button onClick={handleDecreaseProduct}>-</Button>
            <div className={cl.right_side__goods_controller__total_count}>
              {quantity}
            </div>
            <Button onClick={handleAddProduct}>+</Button>
          </div>
          <div className={cl.right_side__total_wrapper}>
            <strong className={cl.right_side__total}>Total Price:</strong>
            <div className={cl.price__total_by_product}>
              {discountPrice ? (
                <>
                  <span className={cl.price__old}>
                    {madeCorrectOutputPrice(quantity * price.value.centAmount)}
                  </span>
                  <span>{madeCorrectOutputPrice(totalPrice)}</span>
                </>
              ) : (
                <span>
                  {madeCorrectOutputPrice(
                    quantity * Number(price.value.centAmount)
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
