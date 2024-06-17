import React from 'react';
import { Attribute, Image, Price } from '@commercetools/platform-sdk';
import cl from './BasketCard.module.scss';
import AttributesBlock from '../attributes/AttributesBlock';
import PriceBlock from '../price/PriceBlock';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';

export interface BasketItem {
  id: string;
  productId: string;
  name: string;
  price: Price;
  image: Image[];
  attributes: Attribute[];
  totalPrice: number;
}
const BasketCard: React.FC<BasketItem> = ({
  productId,
  name,
  price,
  image,
  attributes,
  totalPrice,
}: BasketItem) => (
  <div className={cl.card__wrapper}>
    <div className={cl.left_side__wrapper}>
      <img src={image[0].url} alt={image[0].label} />
    </div>
    <div className={cl.right_side__wrapper}>
      <h4 className={cl.right_side__title}>{name}</h4>
      <PriceBlock price={price} />
      <span className={cl.price__total_by_product}>
        Total Price: {madeCorrectOutputPrice(totalPrice)}
      </span>
      <div className={cl.right_side__attributes}>
        <AttributesBlock attributes={attributes} id={productId} />
      </div>
    </div>
  </div>
);

export default BasketCard;
