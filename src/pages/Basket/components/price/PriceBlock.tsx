import { Price } from '@commercetools/platform-sdk';
import React from 'react';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
import cl from './PriceBlock.module.scss';

interface PriceProps {
  price: Price;
}

const PriceBlock: React.FC<PriceProps> = ({ price }) => {
  const discountPrice = price.discounted?.value.centAmount;
  const currentPrice = price.value.centAmount;

  return (
    <div className={cl.price__wrapper}>
      <div className={cl.price__single_product}>
        {discountPrice ? (
          <div className={cl.price__action}>
            <span className={cl.price__new}>
              {madeCorrectOutputPrice(discountPrice)}
            </span>
            <span className={cl.price__old}>
              {madeCorrectOutputPrice(currentPrice)}
            </span>
          </div>
        ) : (
          <span className={cl.right_side__price}>
            {madeCorrectOutputPrice(currentPrice)}
          </span>
        )}
      </div>
    </div>
  );
};

export default PriceBlock;
