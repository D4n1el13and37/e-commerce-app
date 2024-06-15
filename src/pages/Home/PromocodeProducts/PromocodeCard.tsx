import React, { useRef, useState } from 'react';
import classes from './promocodeProducts.module.scss';

interface PromocodeCardProps {
  name: string;
  text: string;
  promocode: string;
}

const PromocodeCard: React.FC<PromocodeCardProps> = ({
  name,
  text,
  promocode,
}) => {
  const boundingCardRef = useRef<DOMRect | null>(null);
  const [copySuccsess, iscopySuccsess] = useState(false);

  function removeError() {
    setTimeout(() => iscopySuccsess(false), 3000);
  }

  function savePromocode() {
    navigator.clipboard
      .writeText(promocode)
      .then(() => {
        iscopySuccsess(true);
        removeError();
      })
      .catch(() => {
        iscopySuccsess(false);
      });
  }

  return (
    <article className={classes.promocodeCard}>
      <div
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
        className={classes.promocodeCard__card}
      >
        <p className={classes.promocodeCard__name}>{name}</p>
        <p className={classes.promocodeCard__text}>{text}</p>
        <div className={classes.promocodeCard__promocodeWrapper}>
          <span
            onClick={savePromocode}
            className={classes.promocodeCard__promocode}
          >
            {promocode}
          </span>

          {copySuccsess && (
            <p className={classes.promocodeCard__meassage}>Copy Sucsess!</p>
          )}
        </div>
      </div>
    </article>
  );
};

export default PromocodeCard;
