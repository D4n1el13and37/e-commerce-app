import React, { useEffect, useRef, useState } from 'react';
// import Button from '../ui/button/Button';
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
  // toProductPage: () => void;
  onAddToCart?: () => void;
  salePrice?: number | undefined;
}

const ProductCard: React.FC<Card> = ({
  title,
  description,
  frontImage,
  price,
  salePrice,
  // toProductPage,
}) => {
  const [sale, setSale] = useState(false); // to made all price with discount
  const boundingCardRef = useRef<DOMRect | null>(null);
  const currentPrice = (price / 100).toFixed(2); // think about display
  const salePriceOutput = ((salePrice || +currentPrice) / 100)?.toFixed(2); // i think we should refactor it

  useEffect(() => {
    if (salePrice) {
      setSale(true);
    }
  }, [salePrice]);

  return (
    <article className={classes.card__wrapper}>
      <div
        // onClick={toProductPage}
        onMouseEnter={(ev) => {
          // get reference to current card
          boundingCardRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseLeave={() => {
          // for clear Ref
          boundingCardRef.current = null;
        }}
        onMouseMove={(ev) => {
          if (!boundingCardRef.current) return;
          const x = ev.clientX - boundingCardRef.current.left;
          const y = ev.clientY - boundingCardRef.current.top;
          const xPercentage = x / boundingCardRef.current.width;
          const yPercentage = y / boundingCardRef.current.height;

          const xRotation = (yPercentage - 0.5) * 15;
          const yRotation = (0.5 - xPercentage) * 15;

          ev.currentTarget.style.setProperty('--x-rotation', `${xRotation}deg`);
          ev.currentTarget.style.setProperty('--y-rotation', `${yRotation}deg`);
        }}
        className={classes.card}
      >
        <div className={classes.image__wrapper}>
          {frontImage && <img src={frontImage.url} alt={frontImage.label} />}
        </div>
        <div className={classes.text__wrapper}>
          <h3 className={classes.title}>{title}</h3>
          <p className={classes.description}>{description}</p>
          <div className={classes.price__actions}>
            {sale ? (
              <div>
                <span className={classes.price__new}>{salePriceOutput} €</span>
                <span className={classes.price__old}>{currentPrice} €</span>
              </div>
            ) : (
              <span>{currentPrice} €</span>
            )}
            {/* <Button onClick={toProductPage}>+</Button> */}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
