import { Price } from '@commercetools/platform-sdk';
import React from 'react';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
import cl from './PriceBlock.module.scss';

interface PriceProps {
  price: Price;
}

const PriceBlock: React.FC<PriceProps> = ({ price }) => {
  const discountPrice = price.discounted?.value.centAmount;
  const PRICE = price.value.centAmount;

  return (
    <div className={cl.price__wrapper}>
      <div className={cl.price__single_product}>
        {discountPrice ? (
          <>
            <div className={cl.price__action}>
              <div>
                <span className={cl.price__new}>
                  {madeCorrectOutputPrice(discountPrice)}
                </span>
                <span className={cl.price__old}>
                  {madeCorrectOutputPrice(PRICE)}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className={cl.price__action}>
            <span className={cl.price__new}>
              {madeCorrectOutputPrice(PRICE)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceBlock;
