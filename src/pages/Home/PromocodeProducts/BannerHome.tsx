import React, { useState } from 'react';
import classes from './promocodeProducts.module.scss';

interface BannerHomeProps {
  header: string;
  subheader: string;
  text: string;
  promocode: string;
}

const BannerHome: React.FC<BannerHomeProps> = ({
  header,
  subheader,
  text,
  promocode,
}) => {
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
    <div className="grid">
      <div className={classes.banner}>
        <div className={classes.banner__textBlock}>
          <p className={classes.banner__header}>{header}</p>
          <p className={classes.banner__subheader}>{subheader}</p>

          <p className={classes.banner__text}>{text}</p>
          <div className={classes.banner__promocodeWrapper}>
            <span onClick={savePromocode} className={classes.banner__promocode}>
              {promocode}
            </span>

            {copySuccsess && (
              <p className={classes.banner__meassage}>Copy Sucsess!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerHome;
