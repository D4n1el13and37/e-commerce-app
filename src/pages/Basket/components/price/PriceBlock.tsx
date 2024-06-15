import { Price } from '@commercetools/platform-sdk';
import React from 'react';
import madeCorrectOutputPrice from '../../../../utils/madeCorrectOutputPrice';
import cl from './PriceBlock.module.scss';

interface PriceProps {
  price: Price;
}

const PriceBlock: React.FC<PriceProps> = ({ price }) => {
  const DISCOUNT_PRICE = price.discounted?.value.centAmount;
  const PRICE = price.value.centAmount;

  return (
    <div className={cl.price__wrapper}>
      <div className={cl.price__single_product}>
        {DISCOUNT_PRICE ? (
          <>
            <div className={cl.price__action}>
              <div>
                <span className={cl.price__new}>
                  {madeCorrectOutputPrice(DISCOUNT_PRICE)}
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
