import React, { useState } from 'react';
import Button from '../ui/button/Button';
import classes from './ProductCard.module.scss';

interface Card {
  title: string;
  description: string;
  frontImage: {
    label?: string;
    url?: string;
    dimensions?: { h: number; w: number };
  };
  price: number;
}

const ProductCard: React.FC<Card> = ({
  title,
  description,
  frontImage,
  price,
}) => {
  const [sale, setSale] = useState(false);

  function updatePrice() {
    setSale(!sale);
  }

  return (
    <article className={classes.card__wrapper}>
      <div className={classes.image__wrapper}>
        {frontImage && <img src={frontImage.url} alt={frontImage.label} />}
      </div>
      <div className={classes.text__wrapper}>
        <h3>{title}</h3>
        <span>{description}</span>
        <div className="price">
          {sale ? (
            <div>
              <span>New price && </span>
              <span>{price}</span>
            </div>
          ) : (
            <span>{price}</span>
          )}
          <Button onClick={updatePrice}>+</Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
