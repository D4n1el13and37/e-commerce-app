import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.scss';
import Button from '../ui/button/Button';
import useAppDispatch from '../../hooks/useAppDispatch';
import { getAddToCart } from '../../store/cartSlice';
import useAppSelector from '../../hooks/useAppSelector';

export interface Card {
  title: string;
  description: string;
  frontImage: {
    label?: string;
    url?: string;
    dimensions?: { h: number; w: number };
  };
  price: number;
  onAddToCart?: () => void;
  salePrice?: number | undefined;
  linkPath: string;
  id: string | undefined;
}

const ProductCard: React.FC<Card> = ({
  title,
  description,
  frontImage,
  price,
  salePrice,
  linkPath,
  id,
}) => {
  const [sale, setSale] = useState(false); // to made all price with discount
  const boundingCardRef = useRef<DOMRect | null>(null);
  const currentPrice = (price / 100).toFixed(2);
  const salePriceOutput = ((salePrice || +currentPrice) / 100)?.toFixed(2);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (salePrice) {
      setSale(true);
    }
  }, [salePrice]);

  const handleAddToCart = (cardId: string = ''): void => {
    dispatch(getAddToCart(cardId));
  };

  const isCart = useAppSelector((state) => state.cart.cart);

  const idCartProduct = Boolean(
    isCart.lineItems && isCart.lineItems.find((item) => item.productId === id)
  );

  return (
    <article className={classes.card__wrapper}>
      <div
        onMouseEnter={(ev) => {
          boundingCardRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseLeave={() => {
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
          <h3 className={classes.title}>
            <Link to={linkPath} className={classes.card__link}>
              {title}
            </Link>
          </h3>
          <p className={classes.description}>{description}</p>
          <div className={classes.card__info}>
            <div className={classes.price__actions}>
              {sale ? (
                <div>
                  <span className={classes.price__new}>
                    {salePriceOutput} €
                  </span>
                  <span className={classes.price__old}>{currentPrice} €</span>
                </div>
              ) : (
                <span>{currentPrice} €</span>
              )}
            </div>
            <Button
              className={classes.cart__btn}
              onClick={() => {
                handleAddToCart(id);
              }}
              aria-label="Add to shopping cart"
              isDisabled={idCartProduct}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 7.5H15" strokeWidth="1.5" />
                <path d="M7.5 0L7.5 15" strokeWidth="1.5" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
