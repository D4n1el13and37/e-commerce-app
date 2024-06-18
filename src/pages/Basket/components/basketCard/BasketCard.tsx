import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Attribute,
  DiscountedLineItemPriceForQuantity,
  Image,
  Price,
} from '@commercetools/platform-sdk';
import { CSSTransition } from 'react-transition-group';
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
    setErrorMessage(null);
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
      setErrorMessage("Sorry but we can't take your plants");
    }
  };

  const handleRemoveProduct = () => {
    handleChangeQuantity(0);
  };

  const discountPrice = Math.max(
    price.discounted?.value.centAmount || 0,
    discount![0]?.discountedPrice?.value.centAmount || 0
  );

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/catalog/product/${productId}`);
  };

  return (
    <div className={cl.card__wrapper}>
      <div onClick={handleNavigate} className={cl.left_side__wrapper}>
        <img src={image[0].url} alt={image[0].label} />
      </div>
      <div className={cl.right_side__wrapper}>
        <div className={cl.right_side__headline}>
          <h4 onClick={handleNavigate} className={cl.right_side__title}>
            {name}
          </h4>
          <Button onClick={handleRemoveProduct}>
            <svg
              fill="#758963"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <polygon points="24 1.414 22.586 0 12 10.586 1.414 0 0 1.414 10.586 12 0 22.586 1.414 24 12 13.414 22.586 24 24 22.586 13.414 12 24 1.414" />
            </svg>
          </Button>
        </div>
        <PriceBlock price={price} />

        <div className={cl.right_side__attributes}>
          <AttributesBlock attributes={attributes} id={productId} />
        </div>
        <div className={cl.right_side__goods_controller}>
          <div className={cl.right_side__goods_controller__block}>
            <Button onClick={handleDecreaseProduct}>
              <svg
                width="15"
                height="3"
                viewBox="0 0 15 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.5H15" stroke="#758963" strokeWidth="1.5" />
              </svg>
            </Button>
            <div className={cl.right_side__goods_controller__total_count}>
              {quantity}
            </div>
            <Button onClick={handleAddProduct}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 7.5H15" stroke="#758963" strokeWidth="1.5" />
                <path d="M7.5 0L7.5 15" stroke="#758963" strokeWidth="1.5" />
              </svg>
            </Button>
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
        <CSSTransition
          in={!!errorMessage}
          classNames="clear"
          timeout={300}
          unmountOnExit
        >
          <div className={cl.right_side__goods_controller__error}>
            {errorMessage}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default BasketCard;
