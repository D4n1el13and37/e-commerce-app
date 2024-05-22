import React from 'react';
import cn from 'classnames';
import s from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer className={s.footer}>
    <div className={cn('container')}>
      <div className={cn(s.footer__top, s.footer__wrapper)}>
        <div className={s.footer__column}>
          <h2 className={s.footer__site_title}>YesToPlants</h2>
          <p className={s.footer__descr}>
            YesToPlants is a plant sales web application whose creation was
            fueled by several key motivations and identified needs of the online
            plant sales market.
          </p>
        </div>
        <div className={s.footer__column}>
          <h2 className={s.footer__title}>Developers</h2>
          <ul className={s.footer__list}>
            <li className={s.footer__item}>
              <a
                href="https://github.com/d4n1el13and37"
                className={s.footer__link}
              >
                Daniel
              </a>
            </li>
            <li className={s.footer__item}>
              <a
                href="https://github.com/Mineclinee"
                className={s.footer__link}
              >
                Vasily
              </a>
            </li>
            <li className={s.footer__item}>
              <a
                href="https://github.com/annkainova"
                className={s.footer__link}
              >
                Anna
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className={s.footer__bottom}>
      <small className={s.footer__school}>RS-School 2024</small>
    </div>
  </footer>
);

export default Footer;
